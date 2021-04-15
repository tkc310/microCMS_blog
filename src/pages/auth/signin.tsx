import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';
import { TCategory, TTag, TConfig } from '@/types';
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import LayoutAuth from '@components/layouts/LayoutAuth';
import MetaNoIndex from '@components/atoms/meta/MetaNoIndex';
import fetchConfig from '@utils/fetchConfig';
import fetchCategories from '@/utils/fetchCategories';
import fetchTags from '@/utils/fetchTags';

type Props = {
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

const FAIL_COUNT_KEY = 'failCount' as const;

export const SignIn = ({ categories, tags, config }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const failCount = JSON.parse(localStorage.getItem(FAIL_COUNT_KEY) || '0');
    if (failCount >= 5) {
      toast({
        title: 'サインインの試行上限を超えています',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      localStorage.setItem(FAIL_COUNT_KEY, '0');

      const { callback } = router.query;
      if (callback) {
        router.push(String(callback));
      } else {
        router.push('/');
      }
    } catch (error) {
      localStorage.setItem(FAIL_COUNT_KEY, String(failCount + 1));
      await auth.signOut();

      toast({
        title: 'サインインに失敗しました',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  return (
    <LayoutAuth categories={categories} tags={tags} config={config}>
      <MetaNoIndex />

      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          SignIn
        </Button>
      </form>
    </LayoutAuth>
  );
};

export const getStaticProps = async () => {
  const config = await fetchConfig();
  const categories = await fetchCategories();
  const tags = await fetchTags();

  return {
    props: {
      categories,
      tags,
      config,
    },
  };
};

export default SignIn;
