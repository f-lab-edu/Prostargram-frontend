import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeeds } from './apis';

export const FEED_QUERY_KEYS = {
  feeds: ['feeds'] as const,
};

// export const useFeeds = (query: { page: number }, options = {}) => {
//   return useQuery({
//     queryKey: FEED_QUERY_KEYS.feeds,
//     queryFn: () => getFeeds(query),
//     ...options,
//   });
// };

export const useInfiniteFeeds = (page: number) => {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEYS.feeds,
    queryFn: () => getFeeds(page),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage);
      console.log(pages);
      // TODO: 서버에서 hasNextPage 응답 데이터 추가되면 수정
      return null;
    },
  });
};
