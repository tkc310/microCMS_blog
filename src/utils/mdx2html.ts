import renderToString from 'next-mdx-remote/render-to-string';
import imageSize from 'rehype-img-size';
import mdxComponents from '@utils/mdxComponents';
import rehypePrism from '@mapbox/rehype-prism';

export const mdx2html = async (mdxText: string) => {
  const mdxSource = await renderToString(mdxText, {
    components: mdxComponents,
    mdxOptions: {
      rehypePlugins: [
        [rehypePrism, {}],
        [imageSize, { dir: 'public' }],
      ],
    },
  });
  return mdxSource;
};

export default mdx2html;
