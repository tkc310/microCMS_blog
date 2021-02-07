import Head from 'next/head';
import ArticleDetail, {
  getStaticPathsFactory,
  getStaticPropsFactory,
} from '@pages/articles/[id]';
import { TArticle, TConfig } from '@/types';

export type Props = {
  article: TArticle;
  config: TConfig;
};

const ArticlePreview = (props: Props) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <ArticleDetail {...props} isPreview />
    </>
  );
};

export const getStaticPaths = getStaticPathsFactory(true);
export const getStaticProps = getStaticPropsFactory();

export default ArticlePreview;
