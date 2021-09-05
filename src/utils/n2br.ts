import cheerio from 'cheerio';

export const n2br = (body: string) => {
  const $ = cheerio.load(body);

  let ret = $.html();
  ret = ret.replace(/\n/g, '<br />');

  return ret;
};

export default n2br;
