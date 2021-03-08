import cheerio from 'cheerio';
import { MdxRemote } from 'next-mdx-remote/types';

export const optimizeImage = (body: string | MdxRemote.Source) => {
  const $ = cheerio.load(body);

  $('img').each((_, elm) => {
    const src = $(elm).attr('src');
    $(elm).attr('decoding', 'async');
    $(elm).attr('loading', 'lazy');
    $(elm).attr('data-src', src);
    $(elm).attr('class', 'lazy');

    // const seoNode = `<noscript>${$(elm)}</noscript>`;
    // $(seoNode).insertAfter(elm);

    $(elm).removeAttr('src');
  });

  return $.html();
};

export default optimizeImage;
