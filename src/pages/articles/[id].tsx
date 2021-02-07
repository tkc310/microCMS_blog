import ErrorPage from 'next/error';
import LayoutPost from '@/components/layouts/LayoutPost';
import fetchConfig from '@utils/fetchConfig';
import getExcerpt from '@utils/getExcerpt';
import styles from '@styles/Home.module.scss';
import { TArticle, TConfig } from '@/types';

export type Props = {
  article: TArticle;
  config: TConfig;
  isPreview?: boolean;
};

export const ArticleDetail = ({ article, config, isPreview }: Props) => {
  const { id, title, body, category, tags, publishedAt } = article;

  return id ? (
    <LayoutPost
      url={`${config.host}/articles/${id}`}
      title={title}
      description={getExcerpt(body)}
      keywords={tags.map((item) => item.name)}
      date={isPreview ? new Date() : new Date(publishedAt)}
      tags={tags || []}
      category={category}
      config={config}
    >
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.publishedAt}>{publishedAt}</p>
        <p className={styles.category}>{category && category.name}</p>
        <div
          className={styles.post}
          dangerouslySetInnerHTML={{
            __html: `${body}`,
          }}
        />
      </main>
    </LayoutPost>
  ) : (
    <ErrorPage statusCode={404} />
  );
};

export const getStaticPathsFactory = (isPreview?: boolean) => {
  return async () => {
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY },
    };
    const config = await fetchConfig();
    if (isPreview) {
      key.headers = {
        ...key.headers,
        ...{ 'X-GLOBAL-DRAFT-KEY': process.env.GLOBAL_DRAFT_KEY },
      };
    }

    const data = await fetch(`${config.apiHost}articles`, key)
      .then((res) => res.json())
      .catch(() => null);
    const pageName = isPreview ? 'preview' : 'articles';
    const paths = data.contents.map((article) => `/${pageName}/${article.id}`);

    return { paths, fallback: false };
  };
};

export const getStaticPaths = getStaticPathsFactory();

export const getStaticPropsFactory = () => {
  return async ({ params, preview, previewData }) => {
    const id = params?.id || params?.slug;
    const key = {
      headers: {
        'X-API-KEY': process.env.API_KEY,
      },
    };
    const config = await fetchConfig();
    let url = `${config.apiHost}articles/${id}`;

    if (preview) {
      url += `?draftKey=${previewData.draftKey}`;
      key.headers = {
        ...key.headers,
        ...{ 'X-GLOBAL-DRAFT-KEY': process.env.GLOBAL_DRAFT_KEY },
      };
    }

    const article = await fetch(url, key)
      .then((res) => res.json())
      .catch(() => null);

    return {
      props: {
        article,
        config,
      },
    };
  };
};

export const getStaticProps = getStaticPropsFactory();

export default ArticleDetail;
