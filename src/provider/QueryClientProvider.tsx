'use client';

import { useState, PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider as Provider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { useToastContext } from '@/components/common/Toast/ToastProvider';

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const { addToast } = useToastContext();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, throwOnError: true },
        },
        queryCache: new QueryCache({
          onError: () => {},
        }),
        mutationCache: new MutationCache({
          onSuccess: (p) => {
            console.log(p);
          },
          onError: (err) => {
            addToast({ type: 'error', message: err.message });
          },
        }),
      }),
  );

  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
