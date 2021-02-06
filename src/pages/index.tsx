import Link from 'next/link';
import { TArticle, TConfig } from '@/types';
import Pagination from '@components/molecules/Pagination';
import fetchConfig from '@utils/fetchConfig';

type Props = {
  articles: Array<TArticle>;
  totalCount: number;
  config: TConfig;
};

export const Home = ({ articles, totalCount, config }: Props) => {
  const { perPage } = config;

  return (
    <>
      <div>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={`articles/${article.id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Pagination totalCount={totalCount} perPage={perPage} />
    </>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const config = await fetchConfig();
  const { perPage } = config;

  const endPoint = 'https://tkc310.microcms.io/api/v1/articles';
  const pagingParams = [`offset=${0}`, `limit=${perPage}`];
  const params = pagingParams.join('&');
  const url = `${endPoint}?${params}`;

  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);
  const { contents: articles, totalCount } = data;

  return {
    props: {
      articles,
      totalCount,
      config,
    },
  };
};

export default Home;
