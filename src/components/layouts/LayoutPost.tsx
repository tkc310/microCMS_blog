import { ReactNode } from 'react';
import { Text } from '@chakra-ui/react';
import LayoutRoot from '@/components/layouts/LayoutRoot';
import MetaGroup from '@components/molecules/MetaGroup';
import ButtonTag from '@components/atoms/buttons/ButtonTag';
import ButtonCategory from '@components/atoms/buttons/ButtonCategory';
import TextDate from '@components/atoms/texts/TextDate';
import { TCategory, TTag, TConfig, TImage, TimageOption } from '@/types';
import styles from '@styles/components/ArticleDetail.module.scss';
import getSafeDate from '@utils/getSafeDate';
import getImageParam from '@utils/getImageParam';
import defaultImage from '@assets/neko_2.png';

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
  tagsAtMenu: TTag[];
  categoriesAtMenu: TCategory[];
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
  tagsAtMenu,
  categoriesAtMenu,
  config,
}: Props) => {
  const safeDate = getSafeDate(date);
  const imgParams = getImageParam({});

  const black = '#292929';
  const white = '#ffffff';
  const color = imageOption.fontColor || white;
  const isDark = color === black;

  return (
    <LayoutRoot categories={categoriesAtMenu} tags={tagsAtMenu} config={config}>
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
              backgroundImage: `url(${image.url || defaultImage}?${imgParams})`,
            }}
          />
          <div className={styles.title_wrap}>
            <h1
              className={isDark ? styles.title_dark : styles.title_light}
              style={{ color }}
            >
              {title}
            </h1>
            <Text
              color={color}
              className={isDark ? styles.date_dark : styles.date_light}
            >
              <TextDate date={safeDate} />
            </Text>
          </div>
        </section>

        <div className={styles.article_bg}>
          <section className={styles.article_meta}>
            <div className={styles.category}>
              <span className={styles.category_label}>Category:</span>
              <ButtonCategory category={category} />
            </div>
            {tags.length ? (
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
            ) : null}
          </section>

          <section className={styles.article_body}>{children}</section>
        </div>
      </article>
    </LayoutRoot>
  );
};

LayoutPost.defaultProps = defaultProps;

export default LayoutPost;
