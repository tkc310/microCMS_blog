import { useEffect, useCallback } from 'react';
import useSafeState from '@/hooks/useSafeState';

export const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getWindowSize = useCallback(() => {
    return {
      width: isClient ? window?.innerWidth : 0,
      height: isClient ? window?.innerHeight : 0,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useSafeState(getWindowSize());

  useEffect(() => {
    const onResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getWindowSize, setWindowSize]);

  return windowSize;
};

export default useWindowSize;
