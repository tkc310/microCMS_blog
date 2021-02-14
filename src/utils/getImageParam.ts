// @see https://document.microcms.io/image-api/text
type Props = {
  txt: string;
  size?: number;
  color?: string | null;
  alignX?: 'left' | 'center' | 'right';
  alignY?: 'top' | 'middle' | 'bottom';
  pad?: number;
  font?: string;
  fit?: string;
  w?: number;
  h?: number;
  q?: number;
};

export const getImageParam = ({
  txt,
  size,
  color,
  alignX,
  alignY,
  pad,
  font,
  fit,
  w,
  h,
  q,
}: Props) => {
  const options = [
    `txt=${txt}`,
    `txt-size=${size || 100}`,
    `txt-color=${color || '292929'}`,
    `txt-align=${alignY || 'middle'},${alignX || 'center'}`,
    `txt-pad=${pad || 8}`,
    `txt-fit=${fit || 'max'}`,
    `txt-font=${font || 'Futura%20Condensed%20Medium'}`,
    `w=${w || 1360}`,
    `q=${q || 60}`,
  ];

  if (h) {
    options.push(`h=${h}`);
  }

  return options.join('&');
};

export default getImageParam;
