import { ReactNode } from 'react';
import LayoutRoot from '@/components/layouts/LayoutRoot';
import MetaNoIndex from '@components/atoms/meta/MetaNoIndex';
import { TCategory, TConfig, TTag } from '@/types';

type Props = {
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
  children: ReactNode;
};

export const LayoutAuth = ({ children, categories, tags, config }: Props) => {
  return (
    <LayoutRoot categories={categories} tags={tags} config={config}>
      <MetaNoIndex />

      <div className="l-content--auth">{children}</div>
    </LayoutRoot>
  );
};

export default LayoutAuth;
