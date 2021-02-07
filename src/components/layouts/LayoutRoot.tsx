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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500&family=Sawarabi+Mincho&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="l-container">
        <Navigation />
        <main>{children}</main>
        <Footer profile={config.profile} />
      </div>
    </div>
  );
};

export default LayoutRoot;
