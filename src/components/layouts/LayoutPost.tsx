import { ReactNode } from 'react';
import LayoutBase from '@/components/layouts/LayoutBase';
import TagButton from '@components/atoms/buttons/ButtonTag';
import TextDate from '@components/atoms/texts/TextDate';
import { TCategory, TTag, TConfig } from '@/types';

type Props = {
  children: ReactNode;
  url: string;
  title: string;
  description: string;
  keywords: string[];
  date: Date;
  tags: TTag[] | [];
  category: TCategory;
  config: TConfig;
};

export const LayoutPost = ({
  children,
  url,
  title,
  description,
  keywords,
  date,
  tags,
  category,
  config,
}: Props) => {
  return (
    <LayoutBase
      url={url}
      title={title}
      description={description}
      keywords={keywords}
      date={date}
      config={config}
    >
      <div>
        <section>
          <h1>{title}</h1>
          <div>
            <TextDate date={date} />
          </div>
          <div>{category?.name}</div>
        </section>

        <section>{children}</section>

        {tags.length && (
          <section>
            <ul className="tag-list">
              {tags.map((tag) => (
                <li key={tag.id}>
                  <TagButton tag={tag} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </LayoutBase>
  );
};

export default LayoutPost;
