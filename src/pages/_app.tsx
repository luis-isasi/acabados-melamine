import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ContextAuthProvider } from '@Context/contextAuth';

import '../../styles/global.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  enabledDark?: boolean;
  darkMode?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ContextAuthProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ContextAuthProvider>
  );
};

export default App;
