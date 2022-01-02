import generateRssFeed from '@/lib/feed';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await generateRssFeed({
    type: 'atom',
  });

  res.statusCode = 200;
  // 24時間キャッシュ
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.end(feed);

  return { props: {} };
};

const FeedAtomPage = () => null;
export default FeedAtomPage;
