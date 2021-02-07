import { TConfig, TImage } from '@/types';
import Head from 'next/head';

type Props = {
  url: string;
  image?: TImage;
  title?: string;
  description?: string;
  config: TConfig;
};

const defaultProps = {
  title: '',
  image: {},
  description: '',
};

export const MetaOpenGraph = ({
  url,
  title,
  description,
  image,
  config,
}: Props) => {
  const { siteTitle, siteDescription, siteImage } = config;
  const imageUrl = `${image?.url || siteImage.url}?w=1200`;

  return (
    <Head>
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:url" content={url} />
      <meta
        property="og:title"
        content={title ? [title, siteTitle].join(' | ') : ''}
      />
      <meta
        property="og:description"
        content={description || siteDescription}
      />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="article" />
    </Head>
  );
};

MetaOpenGraph.defaultProps = defaultProps;

export default MetaOpenGraph;
