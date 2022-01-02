import { TArticle } from '@/types';
import fetchConfig from '@/utils/fetchConfig';

const generateSitemap = async (): Promise<string> => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const config = await fetchConfig();
  const url = `${config.apiHost}articles`;
  const res = await fetch(url, key);
  const data = await res.json();
  const { contents: articles } = data;

  let rows = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ];
  const urls = articles.map(
    (item: TArticle) => `
    <url>
      <loc>${config.host}${item.id}</loc>
      <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
    </url>
  `
  );
  rows = rows.concat(urls);
  rows.push(`</urlset>`);
  const xml = rows.join('');

  return xml;
};

export default generateSitemap;
