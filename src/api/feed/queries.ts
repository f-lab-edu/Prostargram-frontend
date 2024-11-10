import { useQuery } from '@tanstack/react-query';
import { getFeeds } from './apis';
import { QUERY_KEYS } from './keys';

export const useFeeds = (query: { page: number }, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.feeds,
    queryFn: () => getFeeds(query),
    ...options,
  });
};
