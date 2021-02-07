import Head from 'next/head';
import { BlogPosting } from 'schema-dts';
import { jsonLdScriptProps } from 'react-schemaorg';
import { formatISO } from 'date-fns';
import { TConfig } from '@/types';

type Props = {
  url?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  date?: Date;
  image?: string;
  config: TConfig;
};

const defaultProps = {
  url: '',
  title: '',
  description: '',
  keywords: [],
  date: '',
  image: '',
};

export const JsonLdMeta = ({
  url,
  title,
  description: _description,
  keywords: _keywords,
  date,
  image: _image,
  config,
}: Props) => {
  const {
    siteTitle,
    siteDescription,
    siteKeywords,
    siteImageUrl,
    host,
    profile,
  } = config;
  const author = profile.name;
  const mainEntityOfPage = host || url;
  const headline = title || siteTitle;
  const description = _description || siteDescription;
  const keywords = _keywords ? _keywords.join(',') : siteKeywords.join(',');
  const image = _image || siteImageUrl;

  // let settingJson = {
  //   '@context': 'https://schema.org',
  //   '@type': 'BlogPosting',
  //   mainEntityOfPage,
  //   headline,
  //   keywords,
  //   author,
  //   image,
  //   description,
  // };

  // if (date) {
  //   settingJson = {
  //     ...settingJson,
  //     ...{ datePublished: formatISO(date) },
  //   };
  // }

  // console.log('JsonLdMeta--------------');

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
        })}
      />
    </Head>
  );
};

JsonLdMeta.defaultProps = defaultProps;

export default JsonLdMeta;
