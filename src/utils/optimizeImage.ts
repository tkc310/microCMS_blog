import cheerio from 'cheerio';

export const optimizeImage = (body: string) => {
  const $ = cheerio.load(body);

  $('img').each((_, elm) => {
    const $elm = $(elm);
    const src = $elm.attr('src');
    $elm.attr('decoding', 'async');
    $elm.attr('loading', 'lazy');
    $elm.attr('data-src', src);
    $elm.attr('class', 'lazy');

    // const seoNode = `<noscript>${$elm}</noscript>`;
    // $(seoNode).insertAfter(elm);

    $elm.removeAttr('src');
  });

  return $.html();
};

export default optimizeImage;
