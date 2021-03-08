import cheerio from 'cheerio';
import { MdxRemote } from 'next-mdx-remote/types';

export const n2br = (body: string | MdxRemote.Source) => {
  const $ = cheerio.load(body);

  let ret = $.html();
  ret = ret.replace(/\n/g, '<br />');

  return ret;
};

export default n2br;
