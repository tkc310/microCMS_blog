import cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';

type TscrapeReturn = {
  title: string;
  description: string;
  image: string;
};

const scrape = async (url: string): Promise<TscrapeReturn> => {
  const data = await fetch(url);
  const html = await data.text();
  const $ = cheerio.load(html);

  const title = $('title').text();
  const description = $('meta[name="description"]').attr('content');
  const image =
    $('meta[property="og:image"]').attr('content') ||
    $('img').first().attr('src');

  const result = {
    title,
    description,
    image,
  };

  return result;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url: _url } = req.query;
  const url = _url as string;
  const data = await scrape(url);

  res.status(200).json({ ...data });
};
