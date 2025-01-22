import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { UserType } from '@/app/profile/types/profile';
import { getMyFeeds, getProfile } from './apis';
import { HttpSuccessType, ResponseError } from '../httpRequest';

const PROPFILE_QUERY_KEYS = {
  DEFAULT: 'default_profile',
  PROFILE: (keys: (string | number)[]) =>
    ['my_profile', PROPFILE_QUERY_KEYS.DEFAULT, ...keys] as const,
  FEEDS: (keys: (string | number)[]) =>
    ['feeds', PROPFILE_QUERY_KEYS.FEEDS, ...keys] as const,
};

const useGetProfileInformation = (
  userId: number,
  queryKeys: (string | number)[],
  options?: UseQueryOptions<HttpSuccessType<UserType>, ResponseError>,
) => {
  return useQuery({
    queryFn: () => getProfile(userId),
    queryKey: PROPFILE_QUERY_KEYS.PROFILE(queryKeys),
    ...options,
  });
};

const useGetProfileFeeds = (
  userId: number,
  options?: UseQueryOptions<HttpSuccessType<unknown>, ResponseError>,
) => {
  return useQuery({
    queryFn: () => getMyFeeds(userId),
    queryKey: PROPFILE_QUERY_KEYS.FEEDS([userId]),
    ...options,
  });
};

export { useGetProfileInformation, useGetProfileFeeds };
