import { auth } from '@/lib/firebase';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSafeState from '@/hooks/useSafeState';

export const useAuth = () => {
  const [user, setUser] = useSafeState(null);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let listnner = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
        router.push({
          pathname: '/auth/signin',
          query: { callback: router.pathname },
        });
      }
    });

    return () => {
      // eslint-disable-next-line no-unused-vars
      listnner = null;
    };
  });

  return user;
};

export default useAuth;
