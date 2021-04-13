import { Heading, Divider } from '@chakra-ui/react';
import ErrorPage from '@pages/404';
import ArticleList from '@components/molecules/ArticleList';
import LayoutBase from '@components/layouts/LayoutBase';
import getStaticPathsFactory from '@utils/getStaticPathsFactory/tagCategory';
import getStaticPropsFactory from '@utils/getStaticPropsFactory/tagCategory';
import { TArticle, TConfig, TCategory, TTag } from '@/types';

type Props = {
  contents: TArticle[];
  category: TCategory | null;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const ArticleCategories = ({
  contents: articles,
  category,
  categories,
  tags,
  config,
}: Props) => {
  return !category || !articles.length ? (
    <ErrorPage categories={categories} tags={tags} config={config} />
  ) : (
    <LayoutBase
      url={`${config.host}articles/categories/${category.slug}`}
      title={category.name}
      description={`カテゴリー「${category.name}」の記事一覧`}
      keywords={[category.name]}
      categories={categories}
      tags={tags}
      config={config}
    >
      <Heading
        as="h1"
        size="md"
        style={{
          marginBottom: '16px',
        }}
      >
        {`カテゴリー「${category.name}」の記事一覧`}
      </Heading>
      <Divider style={{ marginBottom: '16px' }} />
      <ArticleList articles={articles} />
    </LayoutBase>
  );
};

export const getStaticPaths = getStaticPathsFactory({
  type: 'category',
  resource: 'article',
});
export const getStaticProps = getStaticPropsFactory({
  type: 'category',
  resource: 'article',
});

export default ArticleCategories;
