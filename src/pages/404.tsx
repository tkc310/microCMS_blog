import { Heading, Text, Box } from '@chakra-ui/react';
import LayoutRoot from '@components/layouts/LayoutRoot';
import fetchConfig from '@utils/fetchConfig';
import { TCategory, TConfig, TTag } from '@/types';
import fetchCategories from '@/utils/fetchCategories';
import fetchTags from '@/utils/fetchTags';
import { MetaNoIndex } from '@/components/atoms/meta/MetaNoIndex';

type Props = {
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const Error404 = ({ categories, tags, config }: Props) => (
  <LayoutRoot categories={categories} tags={tags} config={config}>
    <MetaNoIndex />

    <div className="l-content">
      <Box textAlign="center" style={{ margin: '25% auto' }}>
        <Heading as="h1">404 - Not Found</Heading>
        <Text>ページが見つかりませんでした。</Text>
      </Box>
    </div>
  </LayoutRoot>
);

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

export default Error404;
