import { CSSProperties } from 'react';

type TReturn = CSSProperties;

export const multiLineTextStyle = (num: number): TReturn => {
  return num === 1
    ? {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }
    : {
        display: '-webkit-box',
        WebkitLineClamp: num,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      };
};

export default multiLineTextStyle;
