import renderToString from 'next-mdx-remote/render-to-string';
import imageSize from 'rehype-img-size';
import mdxComponents from '@utils/mdxComponents';
import rehypePrism from '@mapbox/rehype-prism';

export const mdx2html = async (mdxText: string) => {
  const formatted = mdxText
    .replace(/\[.+\]\(http.+\)/g, (str) => {
      const result = str.match(/\[(.+)\]\((.+)\)/);
      const url = result[2];
      const text = result[1];
      return `<a href="${url}" target="_blank" data_origin data_inline>${text}</a>`;
    })
    .replace(/<http.+>/g, (str) => {
      const result = str.match(/<(.+)>/);
      const url = result[1];
      return `<a href="${url}" target="_blank" data_origin data_block>${url}</a>`;
    });

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
