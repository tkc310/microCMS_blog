/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
import _Image from 'next/image';

type Props = typeof _Image & {
  src: string;
  width?: string;
  height?: string;
};

const defaultProps = {
  width: undefined,
  height: undefined,
};

export const Image = (props: Props) => {
  const { src, width, height } = props;
  const isJpg = !!src.match(/\.jp(e)?g/);
  let rest = props;
  if (!width || !height) {
    rest = {
      ...rest,
      ...{ layout: 'fill', width: undefined, height: undefined },
    };
  }
  if (isJpg) {
    rest = { ...rest, ...{ unoptimized: true } };
  }

  return <_Image {...rest} />;
};

Image.defaultProps = defaultProps;

export default Image;
