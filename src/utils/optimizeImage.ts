import cheerio from 'cheerio';

export const optimizeImage = (body: string) => {
  const $ = cheerio.load(body);

  $('img').each((_, elm) => {
    $(elm).attr('decoding', 'async');
    $(elm).attr('loading', 'lazy');
  });

  return $.html();
};

export default optimizeImage;
