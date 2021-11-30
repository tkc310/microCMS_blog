import { FC, memo } from 'react';
import LazyLoad from 'react-lazyload';

type Props = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
};

const defaultProps = {
  width: 'auto',
  height: 'auto',
};

const Image: FC<Props> = ({ alt, ...rest }) => {
  return <img {...rest} alt={alt} loading="lazy" decoding="async" />;
};

Image.defaultProps = defaultProps;
Image.displayName = 'Image';

// eslint-disable-next-line react/display-name
const ImageWrap: FC<Props> = memo((props) => (
  <LazyLoad height="30vh" offset={300} once>
    <Image {...props} />
  </LazyLoad>
));

ImageWrap.displayName = 'ImageWrap';

export default ImageWrap;
