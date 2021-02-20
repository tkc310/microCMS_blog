import ArticleDetail, {
  getStaticPathsFactory,
  getStaticPropsFactory,
} from '@pages/articles/[id]';
import MetaNoIndex from '@components/atoms/meta/MetaNoIndex';
import { TArticle, TCategory, TTag, TConfig } from '@/types';
import { MdxRemote } from 'next-mdx-remote/types';

export type Props = {
  article: TArticle;
  mdxSource: MdxRemote.Source;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

const ArticlePreview = (props: Props) => {
  return (
    <>
      <MetaNoIndex />

      <ArticleDetail {...props} isPreview />
    </>
  );
};

export const getStaticPaths = getStaticPathsFactory(true);
export const getStaticProps = getStaticPropsFactory();

export default ArticlePreview;
