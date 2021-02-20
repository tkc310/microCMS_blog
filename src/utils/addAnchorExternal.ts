import cheerio from 'cheerio';
import { MdxRemote } from 'next-mdx-remote/types';

export const addAnchorExternal = (body: string | MdxRemote.Source) => {
  const $ = cheerio.load(body);

  $("a[href^='http']").each((_, elm) => {
    $(elm).attr('target', '_blank');
    $(elm).attr('rel', 'nofollow');
  });

  return $.html();
};

export default addAnchorExternal;
