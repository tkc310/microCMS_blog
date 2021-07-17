import { TCategory, TTag } from '@/types';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Link,
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
            <section className={styles.section}>
              <h3 className={styles.title}>Categories</h3>
              <ul className={styles.list}>
                {categories.map((category) => (
                  <li key={category.id} className={styles.item}>
                    <ButtonCategory category={category} />
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h3 className={styles.title}>Tags</h3>

              <ul className={styles.list}>
                {tags.map((tag) => (
                  <li key={tag.id} className={styles.item}>
                    <ButtonTag tag={tag} />
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h3 className={styles.title}>Donation</h3>
              <Link color="teal.500" href="/donation">
                寄付のお願い
              </Link>
            </section>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default SideMenu;
