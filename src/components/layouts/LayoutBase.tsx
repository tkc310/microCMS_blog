import { ReactNode } from 'react';
import Head from 'next/head';
import LayoutRoot from '@/components/layouts/LayoutRoot';
import BasicMeta from '@components/atoms/meta/BasicMeta';
import JsonLdMeta from '@components/atoms/meta/JsonLdMeta';
// import OpenGraphMeta from '../components/meta/OpenGraphMeta';
// import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { TConfig } from '@/types';

type Props = {
  url?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  date?: Date;
  config: TConfig;
  children: ReactNode;
};

const defaultProps = {
  url: '',
  title: '',
  description: '',
  keywords: [],
  date: '',
};

export const LayoutBase = ({
  children,
  url,
  title,
  description,
  keywords,
  date,
  config,
}: Props) => {
  console.log('LayoutBase--------------');

  return (
    <LayoutRoot config={config}>
      <Head>
        <BasicMeta
          url={url}
          title={title}
          keywords={keywords}
          description={description}
          config={config}
        />
        <JsonLdMeta
          url={url}
          title={title}
          keywords={keywords}
          description={description}
          date={date}
          config={config}
        />
        {/* <TwitterCardMeta
          urlPath={`/posts/${slug}`}
          title={title}
          description={description}
          config={config}
        />
        <OpenGraphMeta
          urlPath={`/posts/${slug}`}
          title={title}
          description={description}
        /> */}
      </Head>

      <div className="container">
        <article>{children}</article>
      </div>
    </LayoutRoot>
  );
};

LayoutBase.defaultProps = defaultProps;

export default LayoutBase;
