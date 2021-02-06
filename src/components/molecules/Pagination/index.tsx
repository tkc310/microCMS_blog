import Link from 'next/link';

type Props = {
  totalCount: number;
  perPage: number;
};

export const Pagination = ({ totalCount, perPage }: Props) => {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul>
      {range(1, Math.ceil(totalCount / perPage)).map((number) => (
        <li key={number}>
          <Link href={`/articles/page/${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
