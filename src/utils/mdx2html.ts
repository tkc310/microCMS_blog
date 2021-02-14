import renderToString from 'next-mdx-remote/render-to-string';
import { MdxRemote } from 'next-mdx-remote/types';
import { PhoneIcon } from '@chakra-ui/icons';

// MDXで利用可能なcomponent
const components: MdxRemote.Components = { PhoneIcon };

export const mdx2html = async (source: string) => {
  const { renderedOutput } = await renderToString(source, { components });
  return renderedOutput;
};

export default mdx2html;
