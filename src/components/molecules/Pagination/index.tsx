import { Link } from '@chakra-ui/react';

type Props = {
  totalCount: number;
  perPage: number;
  pageNum?: number;
};

const defaultProps = {
  pageNum: undefined,
};

export const Pagination = ({ totalCount, perPage, pageNum }: Props) => {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const totalPage = Math.ceil(totalCount / perPage);
  const isPrev = pageNum && pageNum > 1;
  const isNext = !pageNum || totalPage > pageNum;

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', fontSize: '1.3rem' }}
    >
      {isPrev && (
        <Link
          href={`/articles/page/${pageNum - 1}`}
          style={{ marginRight: 16 }}
        >
          <span>Prev</span>
        </Link>
      )}
      <ul
        style={{ listStyle: 'none', display: 'flex', justifyContent: 'center' }}
      >
        {range(1, totalPage).map((number) => (
          <li key={number} style={{ marginRight: 16 }}>
            {(!pageNum && String(number) === '1') ||
            String(pageNum) === String(number) ? (
              <span style={{ fontSize: '1.3rem', color: 'gray' }}>
                {number}
              </span>
            ) : (
              <Link href={`/articles/page/${number}`}>
                <span style={{ fontSize: '1.3rem' }}>{number}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
      {isNext && (
        <Link href={`/articles/page/${pageNum > 1 ? pageNum + 1 : 2}`}>
          <span>Next</span>
        </Link>
      )}
    </div>
  );
};

Pagination.defaultProps = defaultProps;

export default Pagination;
