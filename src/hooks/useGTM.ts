import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '@utils/gtm';

export const useGTM = () => {
  const router = useRouter();
  const handleRouteChange = useCallback((path) => {
    gtag.pv(path);
  }, []);

  useEffect(() => {
    if (!gtag.ENABLE_GTM) return;
    handleRouteChange(router.asPath);

    // CSR用
    // router.events.on('routeChangeComplete', handleRouteChange);
    // return () => {
    //   router.events.off('routeChangeComplete', handleRouteChange);
    // };
  });
};

export default useGTM;
