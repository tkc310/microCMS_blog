import { ReactNode } from 'react';
import useSafeState from '@/hooks/useSafeState';
import Head from 'next/head';
import MetaIcons from '@components/atoms/meta/MetaIcons';
import Navigation from '@components/organisms/Navigation';
import { TCategory, TConfig, TTag } from '@/types';
import dynamic from 'next/dynamic';
import GTM from '@/components/atoms/GTM';

type Props = {
  children: ReactNode;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
};

export const LayoutRoot = ({ children, categories, tags, config }: Props) => {
  const [isOpen, setIsOpen] = useSafeState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const SideMenu = dynamic(import('@components/organisms/SideMenu'));
  const Footer = dynamic(import('@components/organisms/Footer'));

  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <MetaIcons />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap&subset=japanese&text=tkc310_log"
          rel="stylesheet"
        />
        <GTM />
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
