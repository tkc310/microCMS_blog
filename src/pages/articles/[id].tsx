import styles from 'styles/Home.module.scss';
import ErrorPage from 'next/error';
import { TArticle } from 'src/types';

export type Props = {
  article: TArticle;
};

export const ArticleDetail = ({ article }: Props) => {
  const { id, title, body, category, publishedAt } = article;

  return id ? (
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

  return {
    props: {
      article: data || {},
    },
  };
};

export default ArticleDetail;
