import { ReactNode } from 'react';
import { Text } from '@chakra-ui/react';
import LayoutRoot from '@/components/layouts/LayoutRoot';
import MetaNoIndex from '@components/atoms/meta/MetaNoIndex';
import ButtonTag from '@components/atoms/buttons/ButtonTag';
import TextDate from '@components/atoms/texts/TextDate';
import { TCategory, TTag, TConfig } from '@/types';
import styles from '@styles/components/ArticleDetail.module.scss';
import getSafeDate from '@utils/getSafeDate';
import TOC from '@components/molecules/TOC';

type Props = {
  children: ReactNode;
  title: string;
  date: Date;
  tags: TTag[];
  tagsAtMenu: TTag[];
  categoriesAtMenu: TCategory[];
  config: TConfig;
};

const defaultProps = {};

export const LayoutNote = ({
  children,
  title,
  date,
  tags,
  tagsAtMenu,
  categoriesAtMenu,
  config,
}: Props) => {
  const safeDate = getSafeDate(date);

  return (
    <LayoutRoot categories={categoriesAtMenu} tags={tagsAtMenu} config={config}>
      <MetaNoIndex />

      <article className="l-content--note">
        <div className={styles.article_bg}>
          <div className={styles.article_bg_inner}>
            <div className={styles.article_main}>
              <section className={styles.note_header}>
                <h1 className={styles.title}>{title}</h1>
                <Text className={styles.date}>
                  <TextDate date={safeDate} />
                </Text>
              </section>

              <section className={styles.article_meta}>
                {tags.length ? (
                  <div className={styles.tag}>
                    <div className={styles.tag_label}>Tags:</div>
                    <ul className={styles.tag_list}>
                      {tags.map((tag) => (
                        <li className={styles.tag_item} key={tag.id}>
                          <ButtonTag tag={tag} resource="note" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>

              <section className={styles.article_body}>{children}</section>
            </div>

            <TOC isSide />
          </div>
        </div>
      </article>
    </LayoutRoot>
  );
};

LayoutNote.defaultProps = defaultProps;

export default LayoutNote;
