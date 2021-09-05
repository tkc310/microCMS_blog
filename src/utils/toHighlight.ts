import cheerio from 'cheerio';
import hljs from '@/lib/highlight';

export const toHighlight = (body: string) => {
  const $ = cheerio.load(body);

  $('pre code').each((_, elm) => {
    const $elm = $(elm);
    const result = hljs.highlightAuto($elm.text());
    $elm.html(result.value);
    $elm.addClass('hljs');
  });

  return $.html();
};

export default toHighlight;
