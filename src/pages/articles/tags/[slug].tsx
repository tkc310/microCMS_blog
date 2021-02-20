import { Heading, Divider } from '@chakra-ui/react';
import ErrorPage from '@pages/404';
import ArticleList from '@components/molecules/ArticleList';
import LayoutBase from '@components/layouts/LayoutBase';
import getStaticPathsFactory from '@utils/getStaticPathsFactory/tagCategory';
import getStaticPropsFactory from '@utils/getStaticPropsFactory/tagCategory';
import { TArticle, TConfig, TTag, TCategory } from '@/types';

type Props = {
  articles: Array<TArticle>;
  tag: TTag | null;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const config = {
  amp: 'hybrid',
};

export const ArticleTags = ({
  articles,
  tag,
  categories,
  tags,
  config: appConfig,
}: Props) => {
  return !tag || !articles.length ? (
    <ErrorPage categories={categories} tags={tags} config={appConfig} />
  ) : (
    <LayoutBase
      url={`${appConfig.host}articles/tags/${tag.slug}`}
      title={tag.name}
      description={`${tag.name}の記事一覧`}
      keywords={[tag.name]}
      categories={categories}
      tags={tags}
      config={appConfig}
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
