import { ReactNode } from 'react';
import LayoutRoot from '@/components/layouts/LayoutRoot';
import MetaGroup from '@components/molecules/MetaGroup';
import ButtonTag from '@components/atoms/buttons/ButtonTag';
import ButtonCategory from '@components/atoms/buttons/ButtonCategory';
import TextDate from '@components/atoms/texts/TextDate';
import { TCategory, TTag, TConfig, TImage, TimageOption } from '@/types';
import styles from '@styles/components/ArticleDetail.module.scss';
import getSafeDate from '@utils/getSafeDate';
import getImageParam from '@utils/getImageParam';

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
  date,
  tags,
  category,
  config,
}: Props) => {
  const safeDate = getSafeDate(date);
  const imgParams = getImageParam({
    txt: '',
    color: imageOption.fontColor,
  });

  return (
    <LayoutRoot config={config}>
      <MetaGroup
        url={url}
        image={image}
        title={title}
        description={description}
        keywords={keywords}
        date={date}
        config={config}
      />

      <article className="l-content--article">
        <section className={styles.article_header}>
          <div
            className={styles.capture}
            style={{
              backgroundImage: `url(${
                image.url || config.siteImage.url
              }?${imgParams})`,
            }}
          />
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.date}>
            <TextDate date={safeDate} />
          </div>
        </section>

        <section className={styles.article_meta}>
          <div className={styles.category}>
            <span className={styles.category_label}>Category:</span>
            <ButtonCategory category={category} />
          </div>
          {tags.length && (
            <div className={styles.tag}>
              <div className={styles.tag_label}>Tags:</div>
              <ul className={styles.tag_list}>
                {tags.map((tag) => (
                  <li className={styles.tag_item} key={tag.id}>
                    <ButtonTag tag={tag} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className={styles.article_body}>{children}</section>
      </article>
    </LayoutRoot>
  );
};

LayoutPost.defaultProps = defaultProps;

export default LayoutPost;
