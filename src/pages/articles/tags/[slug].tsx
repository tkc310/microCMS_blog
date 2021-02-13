import { Heading, Divider } from '@chakra-ui/react';
import ErrorPage from '@pages/404';
import ArticleList from '@components/molecules/ArticleList';
import LayoutBase from '@components/layouts/LayoutBase';
import getStaticPathsFactory from '@utils/getStaticPathsFactory/tagCategory';
import getStaticPropsFactory from '@utils/getStaticPropsFactory/tagCategory';
import { TArticle, TConfig, TTag } from '@/types';

type Props = {
  articles: Array<TArticle>;
  tag: TTag | null;
  config: TConfig;
};

export const ArticleTags = ({ articles, tag, config }: Props) => {
  return !tag || !articles.length ? (
    <ErrorPage config={config} />
  ) : (
    <LayoutBase
      url={`${config.host}articles/tags/${tag.slug}`}
      title={tag.name}
      description={`${tag.name}の記事一覧`}
      keywords={[tag.name]}
      config={config}
    >
      <Heading
        as="h1"
        size="md"
        style={{
          marginBottom: '16px',
        }}
      >
        「{tag.name}」の記事一覧
      </Heading>
      <Divider style={{ marginBottom: '16px' }} />
      <ArticleList articles={articles} />
    </LayoutBase>
  );
};

export const getStaticPaths = getStaticPathsFactory('tag');
export const getStaticProps = getStaticPropsFactory('tag');

export default ArticleTags;
