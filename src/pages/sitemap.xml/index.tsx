import generateSitemap from '@/lib/sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;
  const sitemap = generateSitemap(ctx);

  res.statusCode = 200;
  // 24時間キャッシュ
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.end(await sitemap);

  return sitemap;
};

const SitemapPage = () => null;
export default SitemapPage;
