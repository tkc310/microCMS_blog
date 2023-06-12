import cheerio from 'cheerio';

export const n2br = (body: string, plain?: boolean) => {
  if (plain) {
    const ret = body.replace(/\n/g, '<br />');
    return ret;
  }
  const $ = cheerio.load(body);

  let ret = $.html();
  ret = ret.replace(/\n/g, '<br />');
  return ret;
};

export default n2br;
