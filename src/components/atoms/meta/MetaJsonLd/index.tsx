import Head from 'next/head';
import { BlogPosting } from 'schema-dts';
import { jsonLdScriptProps } from 'react-schemaorg';
import { formatISO } from 'date-fns';
import { TConfig, TImage } from '@/types';

type Props = {
  url?: string;
  image?: TImage;
  title?: string;
  description?: string;
  keywords?: string[];
  date?: Date;
  config: TConfig;
};

const defaultProps = {
  url: '',
  image: {},
  title: '',
  description: '',
  keywords: [],
  date: '',
};

export const MetaJsonLd = ({
  url,
  image: _image,
  title,
  description: _description,
  keywords: _keywords,
  date,
  config,
}: Props) => {
  const {
    siteTitle,
    siteDescription,
    siteKeywords,
    siteImage,
    host,
    profile,
  } = config;
  const author = profile.name;
  const mainEntityOfPage = host || url;
  const headline = title || siteTitle;
  const description = _description || siteDescription;
  const keywords = _keywords ? _keywords.join(',') : siteKeywords.join(',');
  const image = _image?.url || siteImage.url;
  const datePublished = formatISO(date);

  return (
    <Head>
      <script
        {...jsonLdScriptProps<BlogPosting>({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage,
          headline,
          keywords,
          author,
          image,
          description,
          datePublished,
        })}
      />
    </Head>
  );
};

MetaJsonLd.defaultProps = defaultProps;

export default MetaJsonLd;
