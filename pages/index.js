import Link from 'next/link';

export default function Home({ articles }) {
  return (
    <div>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <Link href={`articles/${article.id}`}>
              <a>{article.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async ({
  preview,
  previewData
}) => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://tkc310.microcms.io/api/v1/articles', key)
    .then(res => res.json())
    .catch(() => null);

  // プレビュー時は draft のコンテンツを追加
  if (preview) {
    const draftUrl =  `${process.env.END_POINT}blogs/${previewData.id}?draftKey=${previewData.draftKey}`;
    const draftRes = await axios.get(draftUrl, key)
    data.unshift(await draftRes.data)
  }

  return {
    props: {
      articles: data.contents,
    },
  };
};
