import { TCategory, TTag } from '@/types';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import ButtonCategory from '@components/atoms/buttons/ButtonCategory';
import ButtonTag from '@components/atoms/buttons/ButtonTag';
import styles from '@styles/components/SideMenu.module.scss';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  categories: TCategory[];
  tags: TTag[];
};

export const SideMenu = ({ onClose, isOpen, tags, categories }: Props) => {
  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <section className={styles.category}>
              <h3 className={styles.category_title}>Categories</h3>
              <ul className={styles.category_list}>
                {categories.map((category) => (
                  <li key={category.id} className={styles.category_item}>
                    <ButtonCategory category={category} />
                  </li>
                ))}
              </ul>
            </section>
            <section className={styles.tag}>
              <h3 className={styles.tag_title}>Tags</h3>

              <ul className={styles.tag_list}>
                {tags.map((tag) => (
                  <li key={tag.id} className={styles.tag_item}>
                    <ButtonTag tag={tag} />
                  </li>
                ))}
              </ul>
            </section>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default SideMenu;
