import { Heading, Divider } from '@chakra-ui/react';
import ErrorPage from '@pages/404';
import ArticleList from '@components/molecules/ArticleList';
import LayoutBase from '@components/layouts/LayoutBase';
import getStaticPathsFactory from '@utils/getStaticPathsFactory/tagCategory';
import getStaticPropsFactory from '@utils/getStaticPropsFactory/tagCategory';
import { TArticle, TConfig, TTag, TCategory } from '@/types';

type Props = {
  contents: TArticle[];
  tag: TTag | null;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const ArticleTags = ({
  contents: articles,
  tag,
  categories,
  tags,
  config,
}: Props) => {
  return !tag || !articles.length ? (
    <ErrorPage categories={categories} tags={tags} config={config} />
  ) : (
    <LayoutBase
      url={`${config.host}articles/tags/${tag.slug}`}
      title={tag.name}
      description={`タグ「${tag.name}」の記事一覧`}
      keywords={[tag.name]}
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
        {`タグ「${tag.name}」の記事一覧`}
      </Heading>
      <Divider style={{ marginBottom: '16px' }} />
      <ArticleList articles={articles} />
    </LayoutBase>
  );
};

export const getStaticPaths = getStaticPathsFactory({
  type: 'tag',
  resource: 'article',
});
export const getStaticProps = getStaticPropsFactory({
  type: 'tag',
  resource: 'article',
});

export default ArticleTags;
