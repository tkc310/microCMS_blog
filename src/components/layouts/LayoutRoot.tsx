import { ReactNode, useState } from 'react';
import Head from 'next/head';
import MetaIcons from '@components/atoms/meta/MetaIcons';
import Navigation from '@components/organisms/Navigation';
import SideMenu from '@components/organisms/SideMenu';
import Footer from '@components/organisms/Footer';
import { TCategory, TConfig, TTag } from '@/types';

type Props = {
  children: ReactNode;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const LayoutRoot = ({ children, categories, tags, config }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <MetaIcons />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="l-container">
        <Navigation onSideMenuOpen={handleOpen} isSideMenuOpen={isOpen} />
        <SideMenu
          onClose={handleClose}
          isOpen={isOpen}
          categories={categories}
          tags={tags}
        />
        <main>{children}</main>
        <Footer profile={config.profile} />
      </div>
    </div>
  );
};

export default LayoutRoot;
