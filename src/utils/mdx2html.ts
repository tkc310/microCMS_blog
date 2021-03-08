import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { MdxRemote } from 'next-mdx-remote/types';
import { PhoneIcon } from '@chakra-ui/icons';

// MDXで利用可能なcomponent
export const components: MdxRemote.Components = { PhoneIcon };

export const mdx2html = async (source: string) => {
  const { renderedOutput } = await renderToString(source, { components });
  // const renderedOutput = await renderToString(source);
  return renderedOutput;
};

export default mdx2html;

// クライアント処理用
export const mdx2htmlClient = (source: MdxRemote.Source) => {
  return hydrate(source, { components });
};
