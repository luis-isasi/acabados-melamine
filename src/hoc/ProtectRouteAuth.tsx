import * as React from 'react';
import { useRouter } from 'next/router';

import { useContextAuth } from '@Context/contextAuth';
import LoadingScreen from '@Components/LoadingScreen';

const ProtectRouteAuth = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useContextAuth();

  //get the current path
  const to = router.pathname;

  React.useEffect(() => {
    //pass the current
    if (!isLoading && !user) {
      router.push(`/login/?nextPage=${to}`);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <LoadingScreen />;

  if (user) return <>{children}</>;

  return null;
};

export default ProtectRouteAuth;
