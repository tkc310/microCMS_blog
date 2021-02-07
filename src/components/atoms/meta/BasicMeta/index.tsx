import { TConfig } from '@/types';
import Head from 'next/head';

type Props = {
  url?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  config: TConfig;
};

const defaultProps = {
  url: '',
  title: '',
  description: '',
  keywords: [],
};

export const BasicMeta = ({
  title: _title,
  description: _description,
  keywords: _keywords,
  url,
  config,
}: Props) => {
  const { siteTitle, siteDescription, siteKeywords, host, profile } = config;
  const title = _title ? [_title, siteTitle].join(' | ') : siteTitle;
  const description = _description || siteDescription;
  const keywords = _keywords ? _keywords.join(',') : siteKeywords.join(',');

  console.log('BasicMeta--------------');

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={profile.name} />
      <link rel="canonical" href={url || host} />
    </Head>
  );
};

BasicMeta.defaultProps = defaultProps;

export default BasicMeta;
