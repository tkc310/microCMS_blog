import ErrorPage from 'next/error';
import LayoutPost from '@/components/layouts/LayoutPost';
import fetchConfig from '@utils/fetchConfig';
import getExcerpt from '@utils/getExcerpt';
import styles from '@styles/Home.module.scss';
import { TArticle, TConfig } from '@/types';

export type Props = {
  article: TArticle;
  config: TConfig;
};

export const ArticleDetail = ({ article, config }: Props) => {
  const { id, title, body, category, tags, publishedAt } = article;

  return id ? (
    <LayoutPost
      url={`${config.host}/articles/${id}`}
      title={title}
      description={getExcerpt(body)}
      keywords={tags}
      date={new Date(publishedAt)}
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

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://tkc310.microcms.io/api/v1/articles', key)
    .then((res) => res.json())
    .catch(() => null);
  const paths = data.contents.map((content) => `/articles/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params, preview, previewData }) => {
  const id = params?.id;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  let url = `https://tkc310.microcms.io/api/v1/articles/${id}`;
  if (preview) {
    url += `?draftKey=${previewData.draftKey}`;
  }
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);
  const config = await fetchConfig();

  return {
    props: {
      article: data || {},
      config,
    },
  };
};

export default ArticleDetail;
