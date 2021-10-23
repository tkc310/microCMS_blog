/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useCallback, useEffect } from 'react';
import useSafeState from '@/hooks/useSafeState';
import { Skeleton } from '@chakra-ui/react';
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

export const CustomImage: FC<Props> = ({ ...rest }) => {
  const [loaded, setLoaded] = useSafeState(false);
  const [info, setInfo] = useSafeState({
    width: rest.width || 'auto',
    height: rest.height || 'auto',
  });

  const getInfo = useCallback(async () => {
    const res = await fetch(`/api/image?url=${rest.src}`);
    const data = await res.json();

    setInfo({
      width: data.width,
      height: data.height,
    });
    setLoaded(true);
  }, [rest.src]);

  useEffect(() => {
    if (rest.width === 'auto' || rest.height === 'auto') {
      getInfo();
    }
  }, [getInfo]);

  const props =
    rest.width && rest.height
      ? rest
      : ({
          ...rest,
          ...{
            width: info.width,
            height: info.height,
          },
        } as Props);
  return loaded ? (
    <div style={{ marginBottom: '24px' }}>
      <img
        src={props.src}
        style={{ display: props.src ? 'block' : 'none' }}
        loading="lazy"
        decoding="async"
        alt={props.alt}
      />
    </div>
  ) : (
    <Skeleton height="30vh" mb="24px" />
  );
};

CustomImage.defaultProps = defaultProps;
CustomImage.displayName = 'CustomImage';

// eslint-disable-next-line react/display-name
const ImageWrap: FC<Props> = memo((props) => (
  <LazyLoad height="30vh" once>
    <CustomImage {...props} />
  </LazyLoad>
));

ImageWrap.displayName = 'ImageWrap';

export default ImageWrap;
