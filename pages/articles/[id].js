import styles from '../../styles/Home.module.scss'

export default function ArticleId({ article }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        {article.title}
      </h1>
      <p className={styles.publishedAt}>
        {article.publishedAt}
      </p>
      <div
        className={styles.post}
        dangerouslySetInnerHTML={{
          __html: `${article.body}`,
        }}
      />
    </main>
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

export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(
    'https://tkc310.microcms.io/api/v1/articles/' + id,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      article: data,
    },
  };
};
