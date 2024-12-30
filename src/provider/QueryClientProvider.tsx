'use client';

import { useState, PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider as Provider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, throwOnError: true },
        },
        queryCache: new QueryCache({
          onError: (err, query) => {
            console.log(err, query);
          },
        }),
        mutationCache: new MutationCache({
          onError: (err, vars, ctx, mutation) => {
            console.log(err);
            console.log(vars);
            console.log(ctx);
            console.log(mutation);
          },
        }),
      }),
  );

  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
