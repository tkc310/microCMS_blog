import { Link } from '@chakra-ui/react';

type Props = {
  totalCount: number;
  perPage: number;
  pageNum?: number;
  resource?: 'articles' | 'notes';
};

const defaultProps = {
  pageNum: undefined,
  resource: 'articles',
};

export const Pagination = ({
  totalCount,
  perPage,
  pageNum: _pageNum = 0,
  resource,
}: Props) => {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const pageNum = Number(_pageNum);
  const totalPage = Math.ceil(totalCount / perPage);
  const hasPrev = pageNum > 1;
  const hasNext = totalPage > pageNum;

  return totalPage > 1 ? (
    <div
      style={{ display: 'flex', justifyContent: 'center', fontSize: '1.3rem' }}
    >
      {hasPrev && (
        <Link
          href={`/${resource}/page/${pageNum - 1}`}
          style={{ marginRight: 16 }}
          data-testid="pagerPrev"
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
              <Link href={`/${resource}/page/${number}`}>
                <span style={{ fontSize: '1.3rem' }}>{number}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
      {hasNext && (
        <Link
          href={`/${resource}/page/${pageNum > 1 ? pageNum + 1 : 2}`}
          data-testid="pagerNext"
        >
          <span>Next</span>
        </Link>
      )}
    </div>
  ) : null;
};

Pagination.defaultProps = defaultProps;

export default Pagination;
