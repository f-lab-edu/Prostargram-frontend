import { useQuery } from '@tanstack/react-query';
import { GetFollowListParamType, getFollowList } from './apis';

export const FOLLOWINGS_QUERY_KEYS = {
  FOLLOW: (keys: (string | number)[]) => ['follow', ...keys],
};

export const useGetFollowList = (
  { userId, type }: GetFollowListParamType,
  options = {},
) => {
  return useQuery({
    queryKey: FOLLOWINGS_QUERY_KEYS.FOLLOW([userId, type]),
    queryFn: () => getFollowList({ userId, type }),
    ...options,
  });
};
