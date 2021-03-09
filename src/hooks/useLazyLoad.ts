import { useEffect } from 'react';
import LazyLoad from 'vanilla-lazyload';

// @see https://github.com/verlok/vanilla-lazyload
export const useLazyLoad = () => {
  useEffect(() => {
    const ll = new LazyLoad();

    return () => {
      ll.destroy();
    };
  }, []);
};

export default useLazyLoad;
