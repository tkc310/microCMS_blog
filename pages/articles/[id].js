import styles from '../../styles/Home.module.scss'
import ErrorPage from 'next/error'

export default function ArticleDetail({ article }) {
  return article ? (
    <main className={styles.main}>
      <h1 className={styles.title}>
        {article.title}
      </h1>
      <p className={styles.publishedAt}>
        {article.publishedAt}
      </p>
      <p className={styles.category}>
        {article.category && article.category.name}
      </p>
      <div
        className={styles.post}
        dangerouslySetInnerHTML={{
          __html: `${article.body}`,
        }}
      />
    </main>
  ) : (
    <ErrorPage statusCode={404} />
  );
}

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://tkc310.microcms.io/api/v1/articles', key)
    .then(res => res.json())
    .catch(() => null);
  const paths = data.contents.map(content => `/articles/${content.id}`);
  return {paths, fallback: false};
};

export const getStaticProps = async ({
  params,
  preview,
  previewData
}) => {
  const id = params?.id;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  let url =  `https://tkc310.microcms.io/api/v1/articles/${id}`;
  if (preview) {
    url += `?draftKey=${previewData.draftKey}`
  }
  const data = await fetch(url, key)
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      article: data,
    },
  };
};
