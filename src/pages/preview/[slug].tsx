import Preview from '@pages/articles/[id]';

export default Preview;

export const getStaticPaths = async () => {
  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY,
      'X-GLOBAL-DRAFT-KEY': process.env.GLOBAL_DRAFT_KEY,
    },
  };
  const data = await fetch('https://tkc310.microcms.io/api/v1/articles', key)
    .then((res) => res.json())
    .catch(() => null);

  const paths = data.contents.map((article) => `/preview/${article.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const slug = context.params?.slug;
  const draftKey = context.previewData?.draftKey;
  const article = await fetch(
    `https://tkc310.microcms.io/api/v1/articles/${slug}${
      draftKey ? `?draftKey=${draftKey}` : ''
    }`,
    {
      headers: {
        'X-API-KEY': process.env.API_KEY,
        'X-GLOBAL-DRAFT-KEY': process.env.GLOBAL_DRAFT_KEY,
      },
    }
  ).then((res) => res.json());
  return {
    props: {
      article,
    },
  };
};
