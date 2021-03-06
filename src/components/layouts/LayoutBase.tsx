import { ReactNode } from 'react';
import LayoutRoot from '@/components/layouts/LayoutRoot';
import MetaGroup from '@components/molecules/MetaGroup';
import { TCategory, TConfig, TTag, TImage } from '@/types';

type Props = {
  url?: string;
  image?: TImage;
  title?: string;
  description?: string;
  keywords?: string[];
  date?: Date;
  categories: TCategory[];
  tags: TTag[];
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
  categories,
  tags,
  config,
}: Props) => {
  return (
    <LayoutRoot categories={categories} tags={tags} config={config}>
      <MetaGroup
        url={url}
        image={image}
        title={title}
        description={description}
        keywords={keywords}
        date={date}
        config={config}
      />

      <div className="l-content">{children}</div>
    </LayoutRoot>
  );
};

LayoutBase.defaultProps = defaultProps;

export default LayoutBase;
