import { TNote, TCategory, TTag, TConfig } from '@/types';
import NoteList from '@components/molecules/NoteList';
import { Pagination } from '@components/molecules/Pagination';
import LayoutBase from '@components/layouts/LayoutBase';
import MetaNoIndex from '@components/atoms/meta/MetaNoIndex';
import fetchConfig from '@utils/fetchConfig';
import fetchCategories from '@/utils/fetchCategories';
import fetchTags from '@/utils/fetchTags';
import useAuth from '@/hooks/useAuth';
import Spinner from '@components/atoms/Spinner';

type Props = {
  notes: TNote[];
  totalCount: number;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

const PER_PAGE = 10 as const;

export const NotePages = ({
  notes,
  totalCount,
  categories,
  tags,
  config,
}: Props) => {
  const currentUser = useAuth();

  return (
    <LayoutBase config={config} categories={categories} tags={tags}>
      <MetaNoIndex />

      {currentUser ? (
        <>
          <NoteList notes={notes} />
          <Pagination totalCount={totalCount} perPage={PER_PAGE} />
        </>
      ) : (
        <Spinner />
      )}
    </LayoutBase>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const config = await fetchConfig();

  const url = `${config.apiHost}notes`;
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);
  const { totalCount } = data;

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(totalCount / PER_PAGE)).map(
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
  const categories = await fetchCategories();
  const tags = await fetchTags();

  const offset = (pageNum - 1) * PER_PAGE;
  const url = `${config.apiHost}notes`;
  const params = [`offset=${offset}`, `&limit=${PER_PAGE}`].join('&');
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

export default NotePages;
