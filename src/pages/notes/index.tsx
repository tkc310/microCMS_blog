import NoteList from '@components/molecules/NoteList';
import { TCategory, TTag, TConfig, TNote } from '@/types';
import Pagination from '@components/molecules/Pagination';
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

export const NoteIndex = ({
  notes,
  totalCount,
  categories,
  tags,
  config,
}: Props) => {
  const currentUser = useAuth();

  return (
    <LayoutBase categories={categories} tags={tags} config={config}>
      <MetaNoIndex />

      {currentUser ? (
        <>
          <NoteList notes={notes} itemHeight={115} />
          <Pagination
            totalCount={totalCount}
            perPage={PER_PAGE}
            resource="notes"
          />
        </>
      ) : (
        <Spinner />
      )}
    </LayoutBase>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const config = await fetchConfig();
  const { apiHost } = config;
  const categories = await fetchCategories();
  const tags = await fetchTags();

  const endPoint = `${apiHost}notes`;
  const pagingParams = [`offset=${0}`, `limit=${PER_PAGE}`];
  const params = pagingParams.join('&');
  const url = `${endPoint}?${params}`;

  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);
  const { contents: notes, totalCount } = data;

  return {
    props: {
      notes,
      totalCount,
      categories,
      tags,
      config,
    },
  };
};

export default NoteIndex;
