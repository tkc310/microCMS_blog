import Link from 'next/link';
import { TArticle } from 'src/types';

type Props = {
  articles: Array<TArticle>;
};

export const Home = ({ articles }: Props) => {
  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`articles/${article.id}`}>
              <p>{article.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async ({ preview, previewData }) => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://tkc310.microcms.io/api/v1/articles', key)
    .then((res) => res.json())
    .catch(() => null);

  if (preview) {
    const draftUrl = `https://tkc310.microcms.io/api/v1/articles/${previewData.id}?draftKey=${previewData.draftKey}`;
    const draftRes = await fetch(draftUrl, key)
      .then((res) => res.json())
      .catch(() => null);
    data.unshift(await draftRes.data);
  }

  return {
    props: {
      articles: data.contents,
    },
  };
};

export default Home;
