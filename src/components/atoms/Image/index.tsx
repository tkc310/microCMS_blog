/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useCallback, useEffect } from 'react';
import NextImage, { ImageProps } from 'next/image';
import useSafeState from '@/hooks/useSafeState';
import { Skeleton } from '@chakra-ui/react';
import LazyLoad from 'react-lazyload';

type Props = {
  alt: string;
} & ImageProps;

export const Image: FC<Props> = ({ ...rest }) => {
  const [loaded, setLoaded] = useSafeState(false);
  const [info, setInfo] = useSafeState({
    width: rest.width || 0,
    height: rest.height || 0,
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
    if (!rest.width || !rest.height) {
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
      <NextImage {...props} loading="lazy" decoding="async" />
    </div>
  ) : (
    <Skeleton height="30vh" mb="24px" />
  );
};

// eslint-disable-next-line react/display-name
const ImageWrap: FC<Props> = memo((props) => (
  <LazyLoad height="30vh" once>
    <Image {...props} />
  </LazyLoad>
));

export default ImageWrap;
