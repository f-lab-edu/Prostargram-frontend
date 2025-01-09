import { useQuery } from '@tanstack/react-query';
import { getFollowingList } from './apis';

export const FOLLOWINGS_QUERY_KEYS = {
  followings: ['followings'] as const,
};

export const useGetFollowingList = (userId: number, options = {}) => {
  return useQuery({
    queryKey: FOLLOWINGS_QUERY_KEYS.followings,
    queryFn: () => getFollowingList(userId),
    ...options,
  });
};
