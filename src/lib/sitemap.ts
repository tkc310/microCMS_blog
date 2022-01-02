import { TArticle, TCategory, TTag } from '@/types';
import fetchCategories from '@/utils/fetchCategories';
import fetchConfig from '@/utils/fetchConfig';
import fetchTags from '@/utils/fetchTags';

const generateSitemap = async (): Promise<string> => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const config = await fetchConfig();
  const url = `${config.apiHost}articles`;
  const res = await fetch(url, key);
  const data = await res.json();
  const { contents: articles } = data;

  const categories = await fetchCategories();
  const tags = await fetchTags();

  let rows = [];
  const now = new Date().toISOString();
  const staticRows = [config.host, `${config.host}donation`].map(
    (item) => `
      <url>
        <loc>${item}</loc>
        <lastmod>${now}</lastmod>
      </url>,
    `
  );
  const articleRows = articles.map(
    (item: TArticle) => `
    <url>
      <loc>${config.host}${item.id}</loc>
      <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
    </url>
  `
  );
  const categoryRows = categories.map(
    (item: TCategory) => `
    <url>
      <loc>${config.host}articles/categories/${item.slug}</loc>
      <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
    </url>
  `
  );
  const tagRows = tags.map(
    (item: TTag) => `
    <url>
      <loc>${config.host}articles/tags/${item.slug}</loc>
      <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
    </url>
  `
  );
  rows.push(
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
  );
  rows = rows.concat(staticRows, articleRows, categoryRows, tagRows);
  rows.push(`</urlset>`);
  const xml = rows.join('');

  return xml;
};

export default generateSitemap;
