import cheerio from 'cheerio';
import hljs from 'highlight.js';
import { MdxRemote } from 'next-mdx-remote/types';

export const toHighlight = (body: string | MdxRemote.Source) => {
  const $ = cheerio.load(body);

  $('pre code').each((_, elm) => {
    // microcms上で特定の言語を選べないためAutoにしている
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return $.html();
};

export default toHighlight;
