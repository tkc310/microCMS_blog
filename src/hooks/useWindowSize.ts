import { useEffect, useCallback, useState } from 'react';

export const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getWindowSize = useCallback(() => {
    return {
      width: isClient ? window?.innerWidth : 0,
      height: isClient ? window?.innerHeight : 0,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const onResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getWindowSize]);

  return windowSize;
};

export default useWindowSize;
