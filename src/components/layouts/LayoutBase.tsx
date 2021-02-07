import { ReactNode } from 'react';
import LayoutRoot from '@/components/layouts/LayoutRoot';
import MetaBasic from '@/components/atoms/meta/MetaBasic';
import MetaJsonLd from '@/components/atoms/meta/MetaJsonLd';
import MetaOpenGraph from '@components/atoms/meta/MetaOpenGraph';
import MetaTwitterCard from '@components/atoms/meta/MetaTwitterCard';
import { TConfig, TImage } from '@/types';

type Props = {
  url?: string;
  image?: TImage;
  title?: string;
  description?: string;
  keywords?: string[];
  date?: Date;
  config: TConfig;
  children: ReactNode;
};

const defaultProps = {
  url: '',
  image: undefined,
  title: '',
  description: '',
  keywords: [],
  date: new Date(),
};

export const LayoutBase = ({
  children,
  url,
  image,
  title,
  description,
  keywords,
  date,
  config,
}: Props) => {
  return (
    <LayoutRoot config={config}>
      <MetaBasic
        url={url}
        title={title}
        keywords={keywords}
        description={description}
        config={config}
      />
      <MetaJsonLd
        url={url}
        image={image}
        title={title}
        keywords={keywords}
        description={description}
        date={date}
        config={config}
      />
      <MetaOpenGraph
        url={url}
        image={image}
        title={title}
        description={description}
        config={config}
      />
      <MetaTwitterCard
        url={url}
        title={title}
        description={description}
        config={config}
      />

      <div className="container">
        <article>{children}</article>
      </div>
    </LayoutRoot>
  );
};

LayoutBase.defaultProps = defaultProps;

export default LayoutBase;
