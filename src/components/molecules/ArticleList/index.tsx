import Link from 'next/link';
import getExcerpt from '@utils/getExcerpt';
import { TArticle } from '@/types';
import { Heading, Flex, Box, Square, Center } from '@chakra-ui/react';

type Props = {
  articles: TArticle[];
};

export const ArticleList = ({ articles }: Props) => {
  return (
    <ul style={{ marginBottom: 36 }}>
      {articles.map((article) => (
        <li key={article.id} style={{ marginBottom: 24 }}>
          <Link href={`/articles/${article.id}`}>
            <Flex style={{ cursor: 'pointer' }}>
              <Center
                w="160px"
                style={{ alignItems: 'baseline', marginRight: 24 }}
              >
                <img
                  src={article?.image?.url || '/logo480.png'}
                  alt={article.title}
                />
              </Center>
              <Box style={{ wordBreak: 'break-all' }}>
                <Heading as="h2" size="lg">
                  {article.title}
                </Heading>
                <p>{getExcerpt(article.body)}</p>
              </Box>
            </Flex>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
