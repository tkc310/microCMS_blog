import { TArticle, TCategory, TConfig, TTag } from '@/types';
import fetchCategories from '@/utils/fetchCategories';
import fetchTags from '@/utils/fetchTags';
import LayoutBase from '@components/layouts/LayoutBase';
import ArticleList from '@components/molecules/ArticleList';
import { Pagination } from '@components/molecules/Pagination';
import fetchConfig from '@utils/fetchConfig';

type Props = {
  articles: Array<TArticle>;
  totalCount: number;
  pageNum: number;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const ArticlePages = ({
  articles,
  totalCount,
  pageNum,
  categories,
  tags,
  config,
}: Props) => {
  const { perPage } = config;

  return (
    <LayoutBase
      url={`${config.host}articles/page/${pageNum}`}
      config={config}
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
  const config = await fetchConfig();
  const { perPage } = config;

  const query = [
    // デフォルト10件
    // totalCountのみ参照したいためコンテンツは不要
    'limit=0',
  ].join('&');
  const url = `${config.apiHost}articles?${query}`;

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

  const config = await fetchConfig();
  const { perPage } = config;
  const categories = await fetchCategories();
  const tags = await fetchTags();

  const offset = (pageNum - 1) * perPage;
  const url = `${config.apiHost}articles`;
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
      config,
    },
  };
};

export default ArticlePages;
