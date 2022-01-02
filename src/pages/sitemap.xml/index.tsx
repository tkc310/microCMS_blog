import generateSitemap from '@/lib/sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = await generateSitemap();

  res.statusCode = 200;
  // 24時間キャッシュ
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.end(sitemap);

  return {
    props: {},
  };
};

const SitemapPage = () => null;
export default SitemapPage;
