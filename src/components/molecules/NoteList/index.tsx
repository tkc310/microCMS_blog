import { TNote } from '@/types';
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import ButtonTag from '@components/atoms/buttons/ButtonTag';
import TextDate from '@components/atoms/texts/TextDate';
import styles from '@styles/components/ArticleList.module.scss';
import getSafeDate from '@utils/getSafeDate';
import multiLineTextStyle from '@utils/multiLineTextStyle';
import LazyLoad from 'react-lazyload';

type Props = {
  notes: TNote[];
  itemHeight?: number;
};

const defaultProps = {
  itemHeight: 250,
};

const dynamicStyles = {
  ellipsisLine2: multiLineTextStyle(2),
  ellipsisLine4: multiLineTextStyle(4),
};

export const NoteList = ({ notes, itemHeight }: Props) => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      mb="5"
      align="stretch"
    >
      {notes.map((note) => (
        <LazyLoad height={itemHeight} key={note.id} once>
          <Box>
            <LinkBox mb="3">
              <LinkOverlay href={`/notes/${note.id}`}>
                <Text mb="1" px={{ base: '0', md: '3' }}>
                  <TextDate date={getSafeDate(note?.publishedAt)} />
                </Text>
                <Flex
                  px={{ base: '0', md: '3' }}
                  direction={{ base: 'column-reverse', md: 'row' }}
                  className={styles.inner_link}
                >
                  <Box
                    mr={{ base: '0', md: '3' }}
                    style={{ wordBreak: 'break-all' }}
                  >
                    <Heading
                      as="h2"
                      size="md"
                      mb="1"
                      style={dynamicStyles.ellipsisLine2}
                    >
                      {note.title}
                    </Heading>
                  </Box>
                </Flex>
              </LinkOverlay>
            </LinkBox>

            <Box px={{ base: '0', md: '3' }} className={styles.meta}>
              {note.tags.length ? (
                <div className={styles.tag}>
                  <div className={styles.tag_label}>Tags:</div>
                  <ul className={styles.tag_list}>
                    {note.tags.map((tag) => (
                      <li className={styles.tag_item} key={tag.id}>
                        <ButtonTag tag={tag} resource="note" />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Box>
          </Box>
        </LazyLoad>
      ))}
    </VStack>
  );
};

NoteList.defaultProps = defaultProps;

export default NoteList;
