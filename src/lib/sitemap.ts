import { TArticle } from '@/types';
import fetchConfig from '@/utils/fetchConfig';
import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

const generateSitemap: GetServerSideProps = async (ctx) => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const config = await fetchConfig();
  const url = `${config.apiHost}articles`;
  const res = await fetch(url, key);
  const data = await res.json();
  const { contents: articles } = data;

  const fields = articles.map((item: TArticle) => ({
    loc: `${config.host}articles/${item.id}`,
    lastmod: new Date(item.updatedAt).toISOString(),
  }));

  const sitemap = getServerSideSitemap(ctx, fields);

  return sitemap;
};

export default generateSitemap;
