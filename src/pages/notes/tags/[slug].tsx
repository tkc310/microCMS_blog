import { Heading, Divider } from '@chakra-ui/react';
import ErrorPage from '@pages/404';
import NoteList from '@components/molecules/NoteList';
import LayoutBase from '@components/layouts/LayoutBase';
import MetaNoIndex from '@components/atoms/meta/MetaNoIndex';
import getStaticPathsFactory from '@utils/getStaticPathsFactory/tagCategory';
import getStaticPropsFactory from '@utils/getStaticPropsFactory/tagCategory';
import { TNote, TConfig, TTag, TCategory } from '@/types';
import useAuth from '@/hooks/useAuth';
import Spinner from '@components/atoms/Spinner';

type Props = {
  contents: TNote[];
  tag: TTag | null;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const NoteTags = ({
  contents: notes,
  tag,
  categories,
  tags,
  config,
}: Props) => {
  const currentUser = useAuth();

  return !tag || !notes.length ? (
    <ErrorPage categories={categories} tags={tags} config={config} />
  ) : (
    <LayoutBase categories={categories} tags={tags} config={config}>
      <MetaNoIndex />
      {currentUser ? (
        <>
          <Heading
            as="h1"
            size="md"
            style={{
              marginBottom: '16px',
            }}
          >
            {`タグ「${tag.name}」のノート一覧`}
          </Heading>
          <Divider style={{ marginBottom: '16px' }} />
          <NoteList notes={notes} />
        </>
      ) : (
        <Spinner />
      )}
    </LayoutBase>
  );
};

export const getStaticPaths = getStaticPathsFactory({
  type: 'tag',
  resource: 'note',
});
export const getStaticProps = getStaticPropsFactory({
  type: 'tag',
  resource: 'note',
});

export default NoteTags;
