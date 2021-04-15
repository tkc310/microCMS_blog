import { firebase } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let listnner = firebase.auth().onAuthStateChanged((u) => {
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
