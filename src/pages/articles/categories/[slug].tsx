import { Heading, Divider } from '@chakra-ui/react';
import ErrorPage from '@pages/404';
import ArticleList from '@components/molecules/ArticleList';
import LayoutBase from '@components/layouts/LayoutBase';
import getStaticPathsFactory from '@utils/getStaticPathsFactory/tagCategory';
import getStaticPropsFactory from '@utils/getStaticPropsFactory/tagCategory';
import { TArticle, TConfig, TCategory } from '@/types';

type Props = {
  articles: Array<TArticle>;
  category: TCategory | null;
  config: TConfig;
};

export const ArticleCategories = ({ articles, category, config }: Props) => {
  return !category || !articles.length ? (
    <ErrorPage config={config} />
  ) : (
    <LayoutBase
      url={`${config.host}articles/categories/${category.slug}`}
      title={category.name}
      description={`${category.name}の記事一覧`}
      keywords={[category.name]}
      config={config}
    >
      <Heading
        as="h1"
        size="md"
        style={{
          marginBottom: '16px',
        }}
      >
        「{category.name}」の記事一覧
      </Heading>
      <Divider style={{ marginBottom: '16px' }} />
      <ArticleList articles={articles} />
    </LayoutBase>
  );
};

export const getStaticPaths = getStaticPathsFactory('category');
export const getStaticProps = getStaticPropsFactory('category');

export default ArticleCategories;
