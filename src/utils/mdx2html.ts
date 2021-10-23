import renderToString from 'next-mdx-remote/render-to-string';
import imageSize from 'rehype-img-size';
import mdxComponents from '@utils/mdxComponents';
import rehypePrism from '@mapbox/rehype-prism';

export const mdx2html = async (mdxText: string) => {
  const formatted = mdxText.replace(/\n\n/g, '\n\n<br />\n\n');
  const mdxSource = await renderToString(formatted, {
    components: mdxComponents,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        [rehypePrism, {}],
        [imageSize, { dir: 'public' }],
      ],
    },
  });
  return mdxSource;
};

export default mdx2html;
