import cheerio from 'cheerio';

export const addAnchorExternal = (body: string) => {
  const $ = cheerio.load(body);

  $("a[href^='http']").each((_, elm) => {
    const $elm = $(elm);
    $elm.attr('target', '_blank');
    $elm.attr('rel', 'noopener');
    $elm.attr('rel', 'noreferrer');
  });

  return $.html();
};

export default addAnchorExternal;
