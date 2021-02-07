import { TConfig } from '@/types';
import Head from 'next/head';

type Props = {
  url: string;
  title?: string;
  description?: string;
  config: TConfig;
};

const defaultProps = {
  title: '',
  description: '',
};

export const TwitterCardMeta = ({ url, title, description, config }: Props) => {
  const { profile, siteTitle, siteDescription } = config;

  return (
    <Head>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={profile.twitterAccountName} />
      <meta property="twitter:url" content={url} />
      <meta
        property="twitter:title"
        content={title ? [title, siteTitle].join(' | ') : ''}
      />
      <meta
        property="twitter:description"
        content={description || siteDescription}
      />
    </Head>
  );
};

TwitterCardMeta.defaultProps = defaultProps;

export default TwitterCardMeta;
