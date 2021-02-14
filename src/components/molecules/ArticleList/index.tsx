import {
  Heading,
  Text,
  VStack,
  StackDivider,
  Flex,
  Box,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import ButtonTag from '@components/atoms/buttons/ButtonTag';
import ButtonCategory from '@components/atoms/buttons/ButtonCategory';
import TextDate from '@components/atoms/texts/TextDate';
import getExcerpt from '@utils/getExcerpt';
import multiLineTextStyle from '@utils/multiLineTextStyle';
import getSafeDate from '@utils/getSafeDate';
import { TArticle } from '@/types';
import styles from '@styles/components/ArticleList.module.scss';

type Props = {
  articles: TArticle[];
};

const dynamicStyles = {
  elipsisLine2: multiLineTextStyle(2),
  elipsisLine4: multiLineTextStyle(4),
};

export const ArticleList = ({ articles }: Props) => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      mb="5"
      align="stretch"
    >
      {articles.map((article, idx) => (
        <Box key={article.id}>
          <LinkBox mb="3">
            <LinkOverlay href={`/articles/${article.id}`}>
              <Text mb="1" px={{ base: '0', md: '3' }}>
                <TextDate date={getSafeDate(article?.publishedAt)} />
              </Text>
              <Flex
                px={{ base: '0', md: '3' }}
                direction={{ base: 'column-reverse', md: 'row' }}
                className={styles.inner_link}
              >
                <Box
                  flex="1"
                  mr={{ base: '0', md: '3' }}
                  style={{ wordBreak: 'break-all' }}
                >
                  <Heading
                    as="h2"
                    size="md"
                    mb="1"
                    style={dynamicStyles.elipsisLine2}
                  >
                    {article.title}
                  </Heading>
                  <Text style={dynamicStyles.elipsisLine4}>
                    {getExcerpt(article.excerpt || article.body)}
                  </Text>
                </Box>
                <Box className={styles.image}>
                  <img
                    src={
                      `${article?.image?.url}?w=861&q=60` ||
                      `/neko_${(idx % 2) + 1}.png`
                    }
                    alt={article.title}
                  />
                </Box>
              </Flex>
            </LinkOverlay>
          </LinkBox>

          <Box px={{ base: '0', md: '3' }} className={styles.meta}>
            <div className={styles.category}>
              <span className={styles.category_label}>Category:</span>
              <ButtonCategory category={article.category} />
            </div>

            {article.tags.length && (
              <div className={styles.tag}>
                <div className={styles.tag_label}>Tags:</div>
                <ul className={styles.tag_list}>
                  {article.tags.map((tag) => (
                    <li className={styles.tag_item} key={tag.id}>
                      <ButtonTag tag={tag} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default ArticleList;
