import Link from 'next/link';
import { TArticle, TConfig } from '@/types';
import { Pagination } from '@components/molecules/Pagination';
import fetchConfig from '@utils/fetchConfig';

type Props = {
  articles: Array<TArticle>;
  totalCount: number;
  config: TConfig;
};

export const ArticlePageId = ({ articles, totalCount, config }: Props) => {
  const { perPage } = config;

  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} perPage={perPage} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const config = await fetchConfig();
  const { perPage } = config;

  const url = 'https://tkc310.microcms.io/api/v1/articles';
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);
  const { totalCount } = data;

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(totalCount / perPage)).map(
    (pageNum) => `/articles/page/${pageNum}`
  );

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const config = await fetchConfig();
  const { perPage } = config;

  const url = 'https://tkc310.microcms.io/api/v1/articles';
  const params = [`offset=${(id - 1) * perPage}`, `&limit=${perPage}`].join(
    '&'
  );
  const data = await fetch(`${url}?${params}`, key)
    .then((res) => res.json())
    .catch(() => null);
  const { contents: articles, totalCount } = data;

  return {
    props: {
      articles,
      totalCount,
      config,
    },
  };
};

export default ArticlePageId;
