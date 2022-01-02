import generateRssFeed from '@/lib/feed';
import { GetServerSidePropsContext, GetStaticProps } from 'next';

export const getServerSideProps: GetStaticProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const feed = await generateRssFeed({
    type: 'xml',
  });

  res.statusCode = 200;
  // 24時間キャッシュ
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.end(feed);

  return { props: {} };
};

const FeedXmlPage = () => null;
export default FeedXmlPage;
