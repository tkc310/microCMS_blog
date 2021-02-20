import ErrorPage from '@pages/404';
import LayoutPost from '@/components/layouts/LayoutPost';
import { TArticle, TCategory, TTag, TConfig } from '@/types';
import fetchConfig from '@utils/fetchConfig';
import fetchTags from '@/utils/fetchTags';
import fetchCategories from '@/utils/fetchCategories';
import getExcerpt from '@utils/getExcerpt';
import mdx2html from '@utils/mdx2html';
import toHighlight from '@utils/toHighlight';
import addHeadingId from '@utils/addHeadingId';
import addAnchorExternal from '@/utils/addAnchorExternal';
import { MdxRemote } from 'next-mdx-remote/types';
import 'highlight.js/styles/stackoverflow-dark.css';

export type Props = {
  article: TArticle;
  mdxSource: MdxRemote.Source;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
  isPreview?: boolean;
};

export const config = {
  amp: 'hybrid',
};

export const ArticleDetail = ({
  article,
  mdxSource,
  categories: categoriesAtMenu,
  tags: tagsAtMenu,
  config: appConfig,
  isPreview,
}: Props) => {
  const {
    id,
    image,
    imageOption,
    title,
    category,
    tags,
    publishedAt,
  } = article;

  return id ? (
    <LayoutPost
      url={`${appConfig.host}articles/${id}`}
      image={image}
      imageOption={imageOption || undefined}
      title={title}
      description={getExcerpt(
        article.excerpt || String(mdxSource.renderedOutput)
      )}
      keywords={tags.map((item) => item.name)}
      date={isPreview ? new Date() : new Date(publishedAt)}
      tags={tags || []}
      category={category}
      categoriesAtMenu={categoriesAtMenu}
      tagsAtMenu={tagsAtMenu}
      config={appConfig}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: `${mdxSource}`,
        }}
      />
    </LayoutPost>
  ) : (
    <ErrorPage
      config={appConfig}
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
    const appConfig = await fetchConfig();
    if (isPreview) {
      key.headers = {
        ...key.headers,
        ...{ 'X-GLOBAL-DRAFT-KEY': process.env.GLOBAL_DRAFT_KEY },
      };
    }

    const data = await fetch(`${appConfig.apiHost}articles`, key)
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

    const appConfig = await fetchConfig();
    const tags = await fetchTags();
    const categories = await fetchCategories();
    let url = `${appConfig.apiHost}articles/${id}`;

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

    let mdxSource = await mdx2html(article.body);
    // シンタックスハイライトの付与
    mdxSource = toHighlight(mdxSource);
    // Heading要素にID付与
    mdxSource = addHeadingId(mdxSource, id);
    // anchorにtarget=_blank付与
    mdxSource = addAnchorExternal(mdxSource);

    return {
      props: {
        article,
        mdxSource,
        tags,
        categories,
        config: appConfig,
      },
    };
  };
};

export const getStaticProps = getStaticPropsFactory();

export default ArticleDetail;
