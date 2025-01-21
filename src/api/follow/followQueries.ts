import { useQuery } from '@tanstack/react-query';
import { getFollowerList, getFollowingList } from './apis';

export const FOLLOWINGS_QUERY_KEYS = {
  followings: ['followings'] as const,
  followers: ['followers'] as const,
};

export const useGetFollowingList = (userId: number, options = {}) => {
  return useQuery({
    queryKey: FOLLOWINGS_QUERY_KEYS.followings,
    queryFn: () => getFollowingList(userId),
    ...options,
  });
};

export const useGetFollowerListByUserId = (userId: number, options = {}) => {
  return useQuery({
    queryKey: FOLLOWINGS_QUERY_KEYS.followings,
    queryFn: () => getFollowerList(userId),
    ...options,
  });
};

export const useGetFollowerList = (userId: number, options = {}) => {
  return useQuery({
    queryKey: FOLLOWINGS_QUERY_KEYS.followings,
    queryFn: () => getFollowerList(userId),
    ...options,
  });
};
