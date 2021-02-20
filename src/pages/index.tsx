import ArticleList from '@components/molecules/ArticleList';
import { TArticle, TCategory, TTag, TConfig } from '@/types';
import Pagination from '@components/molecules/Pagination';
import LayoutBase from '@components/layouts/LayoutBase';
import fetchConfig from '@utils/fetchConfig';
import fetchCategories from '@/utils/fetchCategories';
import fetchTags from '@/utils/fetchTags';

type Props = {
  articles: Array<TArticle>;
  totalCount: number;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const Home = ({
  articles,
  totalCount,
  categories,
  tags,
  config,
}: Props) => {
  const { perPage } = config;

  return (
    <LayoutBase categories={categories} tags={tags} config={config}>
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
  const categories = await fetchCategories();
  const tags = await fetchTags();

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
      categories,
      tags,
      config,
    },
  };
};

export default Home;
