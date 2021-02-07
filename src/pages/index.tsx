import ArticleList from '@components/molecules/ArticleList';
import { TArticle, TConfig } from '@/types';
import Pagination from '@components/molecules/Pagination';
import LayoutBase from '@components/layouts/LayoutBase';
import fetchConfig from '@utils/fetchConfig';

type Props = {
  articles: Array<TArticle>;
  totalCount: number;
  config: TConfig;
};

export const Home = ({ articles, totalCount, config }: Props) => {
  const { perPage } = config;

  return (
    <LayoutBase config={config}>
      <ArticleList articles={articles} />
      <Pagination totalCount={totalCount} perPage={perPage} />
    </LayoutBase>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const config = await fetchConfig();
  const { perPage, apiHost } = config;

  const endPoint = `${apiHost}articles`;
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
