import { memo } from 'react';
import {
  useClipboard,
  Button,
  Input,
  Flex,
  Heading,
  Text,
  Box,
  Link,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import LayoutRoot from '@components/layouts/LayoutRoot';
import fetchConfig from '@utils/fetchConfig';
import { TCategory, TConfig, TTag } from '@/types';
import fetchCategories from '@/utils/fetchCategories';
import fetchTags from '@/utils/fetchTags';

type Props = {
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const Donation = ({ categories, tags, config }: Props) => {
  const { donations } = config;
  const { hasCopied, onCopy } = useClipboard(donations.crypto);

  return (
    <LayoutRoot categories={categories} tags={tags} config={config}>
      <div className="l-content--donation">
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="lg" mb={8}>
            お恵みください
          </Heading>
          <Text align="left">
            趣味でOSSや無料ツールを公開しています。
            <br />
            利用してみて便利だなと感じるものがありましたら、お気持ち寄付をいただけると今後の活動の励みになります。
            <br />
            <br />
            寄付は暗号通貨もしくはアマゾンほしいものリストで受け付けております。
          </Text>
        </Box>

        <Box textAlign="left" mb={8}>
          <Heading as="h2" size="sm" mb={2}>
            Amazon ほしい物リスト
          </Heading>
          <Text align="left">
            <Link href={donations.amazon} isExternal>
              {donations.amazon}
              <ExternalLinkIcon ml={4} mx="3px" />
            </Link>
          </Text>
        </Box>
        <Box textAlign="left">
          <Heading as="h2" size="sm" mb={2}>
            暗号通貨
          </Heading>
          <Text align="left" mb={2}>
            次の通貨・トークンの寄付を受け付けております。
            <br />
            ETH (erc20) / BNB (bep20) / USDT (erc20 or bep20) / JPYC (erc20) /
            AVAX (C-Chain)
          </Text>
          <Heading as="h3" size="xs" mb={2}>
            送信先アドレス
          </Heading>
          <Flex mb={2}>
            <Input value={donations.crypto} isReadOnly />
            <Button onClick={onCopy} ml={2}>
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </Box>
      </div>
    </LayoutRoot>
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

export default memo(Donation);
