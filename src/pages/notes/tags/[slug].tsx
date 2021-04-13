import { Heading, Divider } from '@chakra-ui/react';
import ErrorPage from '@pages/404';
import NoteList from '@components/molecules/NoteList';
import LayoutBase from '@components/layouts/LayoutBase';
import MetaNoIndex from '@components/atoms/meta/MetaNoIndex';
import getStaticPathsFactory from '@utils/getStaticPathsFactory/tagCategory';
import getStaticPropsFactory from '@utils/getStaticPropsFactory/tagCategory';
import { TNote, TConfig, TTag, TCategory } from '@/types';

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
  return !tag || !notes.length ? (
    <ErrorPage categories={categories} tags={tags} config={config} />
  ) : (
    <LayoutBase
      url={`${config.host}notes/tags/${tag.slug}`}
      title={tag.name}
      description={`タグ「${tag.name}」のノート一覧`}
      keywords={[tag.name]}
      categories={categories}
      tags={tags}
      config={config}
    >
      <MetaNoIndex />
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
