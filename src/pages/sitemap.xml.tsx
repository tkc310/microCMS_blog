import generateSitemap from '@/lib/sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;

  res.statusCode = 200;
  // 24時間キャッシュ
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  const sitemap = await generateSitemap(ctx);
  res.end(sitemap);

  return { props: {} };
};

const SitemapPage = () => null;
export default SitemapPage;
