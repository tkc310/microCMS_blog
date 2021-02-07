import { ReactNode } from 'react';
import LayoutBase from '@/components/layouts/LayoutBase';
import TagButton from '@components/atoms/buttons/ButtonTag';
import TextDate from '@components/atoms/texts/TextDate';
import { TCategory, TTag, TConfig, TImage } from '@/types';

type Props = {
  children: ReactNode;
  url: string;
  image?: TImage;
  title: string;
  description: string;
  keywords: string[];
  date: Date;
  tags: TTag[];
  category: TCategory;
  config: TConfig;
};

const defaultProps = {
  image: {},
};

export const LayoutPost = ({
  children,
  url,
  image,
  title,
  description,
  keywords,
  date: _date,
  tags,
  category,
  config,
}: Props) => {
  // publishedAtが存在しないケースがあるための対策
  const date = Number.isNaN(_date.getTime()) ? new Date() : _date;

  return (
    <LayoutBase
      url={url}
      image={image}
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

LayoutPost.defaultProps = defaultProps;

export default LayoutPost;
