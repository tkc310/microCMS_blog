import { memo } from 'react';
import ErrorPage from '@pages/404';
import LayoutPost from '@/components/layouts/LayoutPost';
import { TArticle, TCategory, TTag, TConfig } from '@/types';
import fetchConfig from '@utils/fetchConfig';
import fetchTags from '@/utils/fetchTags';
import fetchCategories from '@/utils/fetchCategories';
import getExcerpt from '@utils/getExcerpt';
import 'highlight.js/styles/github-gist.css';
import TOC from '@components/molecules/TOC';
import mdx2html from '@utils/mdx2html';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import mdxComponents from '@utils/mdxComponents';

export type Props = {
  article: TArticle;
  mdxSource: MDXRemoteSerializeResult;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
  isPreview?: boolean;
};

export const ArticleDetail = ({
  article,
  mdxSource,
  categories: categoriesAtMenu,
  tags: tagsAtMenu,
  config,
  isPreview,
}: Props) => {
  const { id, image, imageOption, title, category, tags, publishedAt } =
    article;

  return id ? (
    <LayoutPost
      url={`${config.host}articles/${id}`}
      image={image}
      imageOption={imageOption || undefined}
      title={title}
      description={getExcerpt(
        article.excerpt || String(mdxSource.compiledSource)
      )}
      keywords={tags.map((item) => item.name)}
      date={isPreview ? new Date() : new Date(publishedAt)}
      tags={tags || []}
      category={category}
      categoriesAtMenu={categoriesAtMenu}
      tagsAtMenu={tagsAtMenu}
      config={config}
    >
      <TOC />
      <div id="js-toc-content">
        <MDXRemote {...mdxSource} components={mdxComponents} />
      </div>
    </LayoutPost>
  ) : (
    <ErrorPage
      config={config}
      categories={categoriesAtMenu}
      tags={tagsAtMenu}
    />
  );
};

export const getStaticPathsFactory = (isPreview?: boolean) => {
  return async () => {
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY },
    };
    const config = await fetchConfig();
    if (isPreview) {
      key.headers = {
        ...key.headers,
        ...{ 'X-GLOBAL-DRAFT-KEY': process.env.GLOBAL_DRAFT_KEY },
      };
    }

    const data = await fetch(`${config.apiHost}articles`, key)
      .then((res) => res.json())
      .catch(() => null);
    const pageName = isPreview ? 'preview' : 'articles';
    const paths = data.contents.map((article) => `/${pageName}/${article.id}`);

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
    let url = `${config.apiHost}articles/${id}`;

    if (preview) {
      url += `?draftKey=${previewData.draftKey}`;
      key.headers = {
        ...key.headers,
        ...{ 'X-GLOBAL-DRAFT-KEY': process.env.GLOBAL_DRAFT_KEY },
      };
    }

    const article = await fetch(url, key)
      .then((res) => res.json())
      .catch(() => null);

    const mdxSource = await mdx2html(article.body);

    // Heading要素にID付与
    // mdxSource = addHeadingId(mdxSource, id);

    // 段落調整
    // mdxSource = n2br(mdxSource);

    // 目次作成 -> hydrateエラーが出るためcsrする
    // mdxSource = createTOC(mdxSource);

    return {
      props: {
        article,
        mdxSource,
        tags,
        categories,
        config,
      },
    };
  };
};

export const getStaticProps = getStaticPropsFactory();

export default memo(ArticleDetail);
