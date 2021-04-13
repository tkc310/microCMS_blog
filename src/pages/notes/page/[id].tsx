import { TNote, TCategory, TTag, TConfig } from '@/types';
import NoteList from '@components/molecules/NoteList';
import { Pagination } from '@components/molecules/Pagination';
import LayoutBase from '@components/layouts/LayoutBase';
import MetaNoIndex from '@components/atoms/meta/MetaNoIndex';
import fetchConfig from '@utils/fetchConfig';
import fetchCategories from '@/utils/fetchCategories';
import fetchTags from '@/utils/fetchTags';

type Props = {
  notes: TNote[];
  totalCount: number;
  pageNum: number;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const ArticlePages = ({
  notes,
  totalCount,
  pageNum,
  categories,
  tags,
  config,
}: Props) => {
  const { perPage } = config;

  return (
    <LayoutBase
      url={`${config.host}notes/page/${pageNum}`}
      config={config}
      categories={categories}
      tags={tags}
    >
      <MetaNoIndex />
      <NoteList notes={notes} />
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

  const url = `${config.apiHost}notes`;
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);
  const { totalCount } = data;

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(totalCount / perPage)).map(
    (pageNum) => `/notes/page/${pageNum}`
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
  const url = `${config.apiHost}notes`;
  const params = [`offset=${offset}`, `&limit=${perPage}`].join('&');
  const data = await fetch(`${url}?${params}`, key)
    .then((res) => res.json())
    .catch(() => null);
  const { contents: notes, totalCount } = data;

  return {
    props: {
      notes,
      totalCount,
      pageNum,
      categories,
      tags,
      config,
    },
  };
};

export default ArticlePages;
