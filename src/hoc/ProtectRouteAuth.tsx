import * as React from 'react';
import { useRouter } from 'next/router';

import { useContextAuth } from '@Context/contextAuth';
import LoadingScreen from '@Components/LoadingScreen';
import LayoutAuthenticated from '@Components/layouts/LayoutAuthenticated';

const ProtectRouteAuth = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useContextAuth();

  //get the current path
  const to = router.pathname;

  React.useEffect(() => {
    //pass the current
    if (!isLoading && !user && to !== '/login') {
      router.push(`/login/?nextPage=${to}`);
    }
  }, [user, isLoading]);

  if (isLoading) return <LoadingScreen />;

  //is logged
  if (router.pathname !== '/login' && user) {
    return <LayoutAuthenticated>{children}</LayoutAuthenticated>;
  }

  if (router.pathname === '/login' && user) {
    return <>{children}</>;
  }

  //is not logged
  if (router.pathname === '/login' && !user) {
    return <>{children}</>;
  }

  return <LoadingScreen />;
};

export default ProtectRouteAuth;
