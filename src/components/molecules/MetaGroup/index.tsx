import MetaBasic from '@components/atoms/meta/MetaBasic';
import MetaJsonLd from '@components/atoms/meta/MetaJsonLd';
import MetaOpenGraph from '@components/atoms/meta/MetaOpenGraph';
import MetaTwitterCard from '@components/atoms/meta/MetaTwitterCard';
import { TImage, TConfig } from '@/types';
import getSafeDate from '@/utils/getSafeDate';

type Props = {
  url: string;
  image?: TImage;
  title: string;
  description: string;
  keywords: string[];
  date: Date;
  config: TConfig;
};

const defaultProps = {
  image: {},
};

export const MetaGroup = ({
  url,
  image,
  title,
  keywords,
  description,
  date,
  config,
}: Props) => {
  const safeDate = getSafeDate(date);

  return (
    <>
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
        date={safeDate}
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
    </>
  );
};

MetaGroup.defaultProps = defaultProps;

export default MetaGroup;
