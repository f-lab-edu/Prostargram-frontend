import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeeds } from './apis';

export const FEED_QUERY_KEYS = {
  feeds: ['feeds'] as const,
};

export const useInfiniteFeeds = () => {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEYS.feeds,
    queryFn: ({ pageParam }) => getFeeds(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.result?.hasNext ? pages.length : null;
    },
  });
};
