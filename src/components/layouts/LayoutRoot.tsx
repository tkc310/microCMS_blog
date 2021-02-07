import { ReactNode } from 'react';
import Head from 'next/head';
import MetaIcons from '@components/atoms/meta/MetaIcons';
import Navigation from '@components/organisms/Navigation';
import Footer from '@components/organisms/Footer';
import { TConfig } from '@/types';

type Props = {
  children: ReactNode;
  config: TConfig;
};

export const LayoutRoot = ({ children, config }: Props) => {
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <MetaIcons />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Navigation />
      <main>{children}</main>
      <Footer profile={config.profile} />
    </div>
  );
};

export default LayoutRoot;
