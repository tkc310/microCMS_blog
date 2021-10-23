import { FC, ReactNode, memo } from 'react';
import styles from '@styles/components/ArticleDetail.module.scss';
import classNames from 'classnames/bind';

type Props = {
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
};

export const CustomHeading: FC<Props> = ({ as, children }) => {
  const uuid = encodeURI(String(children));
  const cn = classNames.bind(styles);
  const CustomTag = as;

  return (
    <CustomTag
      className={cn({
        customHeading: true,
        h2: as === 'h2',
      })}
      id={uuid}
    >
      <div className={styles.padding} />
      <a href={`#${uuid}`} className={styles.link}>
        <Icon />
        <span className={styles.text}>{children}</span>
      </a>
    </CustomTag>
  );
};

const Icon: FC = () => {
  const size = 16;
  return (
    <svg
      className="octicon octicon-link"
      viewBox={`0 0 ${size} ${size}`}
      version="1.1"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
      />
    </svg>
  );
};

export default memo(CustomHeading);
