import { ReactNode } from 'react';
import LayoutBase from '@/components/layouts/LayoutBase';
import ButtonTag from '@components/atoms/buttons/ButtonTag';
import ButtonCategory from '@components/atoms/buttons/ButtonCategory';
import TextDate from '@components/atoms/texts/TextDate';
import { TCategory, TTag, TConfig, TImage, TimageOption } from '@/types';
import styles from '@styles/components/ArticleDetail.module.scss';

type Props = {
  children: ReactNode;
  url: string;
  image?: TImage;
  imageOption?: TimageOption;
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
  imageOption: {},
};

export const LayoutPost = ({
  children,
  url,
  image,
  imageOption,
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
  const imgParams = [
    `txt=${title}`,
    `txt-size=${100}`,
    `txt-color=${imageOption.fontColor || '292929'}`,
    `txt-align=bottom,left`,
    `txt-pad=56`,
    `txt-fit=max`,
    `txt-font=Futura%20Condensed%20Medium`,
    `w=1360`,
  ].join('&');

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
      <div className={styles.article}>
        <section style={{ marginBottom: 24 }}>
          <div className={styles.capture}>
            <img src={`${image.url}?${imgParams}`} alt={title} />
            <h1 className={styles.title}>{title}</h1>
          </div>

          <div style={{ marginBottom: 8 }}>
            <div>
              <TextDate date={date} />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: '.9rem', margin: '0 24px 8px 0' }}>
              <span style={{ marginRight: 8 }}>Category:</span>
              <ButtonCategory category={category} />
            </div>
            {tags.length && (
              <div style={{ display: 'flex', fontSize: '.9rem' }}>
                <div style={{ marginRight: 8 }}>Tags:</div>
                <ul className={styles.tag_list}>
                  {tags.map((tag) => (
                    <li className={styles.tag_list} key={tag.id}>
                      <ButtonTag tag={tag} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <section className="article-contents">{children}</section>
      </div>
    </LayoutBase>
  );
};

LayoutPost.defaultProps = defaultProps;

export default LayoutPost;
