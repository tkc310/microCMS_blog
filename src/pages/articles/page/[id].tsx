import { TArticle, TCategory, TTag, TConfig } from '@/types';
import ArticleList from '@components/molecules/ArticleList';
import { Pagination } from '@components/molecules/Pagination';
import LayoutBase from '@components/layouts/LayoutBase';
import fetchConfig from '@utils/fetchConfig';
import fetchCategories from '@/utils/fetchCategories';
import fetchTags from '@/utils/fetchTags';

type Props = {
  articles: Array<TArticle>;
  totalCount: number;
  pageNum: number;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const config = {
  amp: 'hybrid',
};

export const ArticlePages = ({
  articles,
  totalCount,
  pageNum,
  categories,
  tags,
  config: appConfig,
}: Props) => {
  const { perPage } = appConfig;

  return (
    <LayoutBase
      url={`${appConfig.host}articles/page/${pageNum}`}
      config={appConfig}
      categories={categories}
      tags={tags}
    >
      <ArticleList articles={articles} />
      <Pagination totalCount={totalCount} perPage={perPage} pageNum={pageNum} />
    </LayoutBase>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const appConfig = await fetchConfig();
  const { perPage } = appConfig;

  const url = `${appConfig.apiHost}articles`;
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);
  const { totalCount } = data;

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(totalCount / perPage)).map(
    (pageNum) => `/articles/page/${pageNum}`
  );

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { id: pageNum } = context.params;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const appConfig = await fetchConfig();
  const { perPage } = appConfig;
  const categories = await fetchCategories();
  const tags = await fetchTags();

  const offset = (pageNum - 1) * perPage;
  const url = `${appConfig.apiHost}articles`;
  const params = [`offset=${offset}`, `&limit=${perPage}`].join('&');
  const data = await fetch(`${url}?${params}`, key)
    .then((res) => res.json())
    .catch(() => null);
  const { contents: articles, totalCount } = data;

  return {
    props: {
      articles,
      totalCount,
      pageNum,
      categories,
      tags,
      config: appConfig,
    },
  };
};

export default ArticlePages;
