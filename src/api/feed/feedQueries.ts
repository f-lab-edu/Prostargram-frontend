import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getFeeds, getDetailCommonFeed } from './apis';

export const FEED_QUERY_KEYS = {
  feeds: ['feeds'] as const,
  id: (id: string) => [...FEED_QUERY_KEYS.feeds, id] as const,
};

export const useInfiniteFeeds = () => {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEYS.feeds,
    queryFn: ({ pageParam }) => getFeeds(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.result?.hasNextPage ? pages.length : null;
    },
  });
};

export const useGetDetailCommonFeed = (postId: string, options = {}) => {
  return useQuery({
    queryKey: FEED_QUERY_KEYS.id(postId),
    queryFn: () => getDetailCommonFeed(postId),
    ...options,
  });
};
