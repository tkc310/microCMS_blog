import { memo } from 'react';
import Head from 'next/head';

export const MetaNoIndex = () => (
  <Head>
    <meta name="robots" content="noindex" />
  </Head>
);

export default memo(MetaNoIndex);
