import { memo } from 'react';
import Head from 'next/head';

export const MetaPwa = () => (
  <Head>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
);

export default memo(MetaPwa);
