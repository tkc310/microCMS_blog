import { memo } from 'react';
import ErrorPage from '@pages/404';
import LayoutNote from '@/components/layouts/LayoutNote';
import { TNote, TCategory, TTag, TConfig } from '@/types';
import fetchConfig from '@utils/fetchConfig';
import fetchTags from '@/utils/fetchTags';
import fetchCategories from '@/utils/fetchCategories';
import mdx2html from '@utils/mdx2html';
import { MdxRemote } from 'next-mdx-remote/types';
import 'highlight.js/styles/github-gist.css';
import TOC from '@components/molecules/TOC';
import mdxComponents from '@utils/mdxComponents';
import hydrate from 'next-mdx-remote/hydrate';

export type Props = {
  note: TNote;
  mdxSource: MdxRemote.Source;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const NoteDetail = ({
  note,
  mdxSource,
  categories: categoriesAtMenu,
  tags: tagsAtMenu,
  config,
}: Props) => {
  const { id, title, tags, publishedAt } = note;

  const content = hydrate(mdxSource, { components: mdxComponents });

  return id ? (
    <LayoutNote
      title={title}
      date={new Date(publishedAt)}
      tags={tags || []}
      categoriesAtMenu={categoriesAtMenu}
      tagsAtMenu={tagsAtMenu}
      config={config}
    >
      <TOC />
      <div id="js-toc-content">{content}</div>
    </LayoutNote>
  ) : (
    <ErrorPage
      config={config}
      categories={categoriesAtMenu}
      tags={tagsAtMenu}
    />
  );
};

export const getStaticPathsFactory = () => {
  return async () => {
    const key = {
      headers: {
        'X-API-KEY': process.env.API_KEY,
        'X-GLOBAL-DRAFT-KEY': process.env.GLOBAL_DRAFT_KEY,
      },
    };
    const config = await fetchConfig();

    const data = await fetch(`${config.apiHost}notes`, key)
      .then((res) => res.json())
      .catch(() => null);
    const paths = data.contents.map((note) => `/notes/${note.id}`);

    return { paths, fallback: false };
  };
};

export const getStaticPaths = getStaticPathsFactory();

export const getStaticPropsFactory = () => {
  return async ({ params, preview, previewData }) => {
    const id = params?.id || params?.slug;
    const key = {
      headers: {
        'X-API-KEY': process.env.API_KEY,
      },
    };

    const config = await fetchConfig();
    const tags = await fetchTags();
    const categories = await fetchCategories();
    let url = `${config.apiHost}notes/${id}`;

    if (preview) {
      url += `?draftKey=${previewData.draftKey}`;
      key.headers = {
        ...key.headers,
        ...{ 'X-GLOBAL-DRAFT-KEY': process.env.GLOBAL_DRAFT_KEY },
      };
    }

    const note = await fetch(url, key)
      .then((res) => res.json())
      .catch(() => null);

    const mdxSource = await mdx2html(note.body);

    return {
      props: {
        note,
        mdxSource,
        tags,
        categories,
        config,
      },
    };
  };
};

export const getStaticProps = getStaticPropsFactory();

export default memo(NoteDetail);
