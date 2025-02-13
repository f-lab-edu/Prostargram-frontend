import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import { UserType } from '@/app/profile/types/profile';
import { getProfileFeeds, getProfile } from './apis';
import { HttpSuccessType, ResponseError } from '../httpRequest';

export const PROPFILE_QUERY_KEYS = {
  DEFAULT: 'default_profile',
  PROFILE: (keys: number[]) => [
    'my_profile',
    PROPFILE_QUERY_KEYS.DEFAULT,
    ...keys,
  ],
  FEEDS: (keys: (string | number)[]) => [
    'feeds',
    PROPFILE_QUERY_KEYS.DEFAULT,
    ...keys,
  ],
};

const useGetProfileInformation = (
  userId: number,
  options?: UseQueryOptions<HttpSuccessType<UserType>, ResponseError>,
) => {
  return useQuery({
    queryFn: () => getProfile(userId),
    queryKey: PROPFILE_QUERY_KEYS.PROFILE([userId]),
    ...options,
  });
};

type ProfileFeedType = {
  data: Feed.FeedData[];
  hasNextPage: number | false | undefined;
};

const useGetProfileFeeds = (
  userId: number,
  options?: UseInfiniteQueryOptions<
    ProfileFeedType,
    ResponseError,
    Feed.FeedData[],
    ProfileFeedType,
    ReturnType<typeof PROPFILE_QUERY_KEYS.FEEDS>,
    number | undefined
  >,
) => {
  return useInfiniteQuery({
    queryKey: PROPFILE_QUERY_KEYS.FEEDS([userId]),
    queryFn: async ({ pageParam }) => getProfileFeeds({ userId, pageParam }),
    select: (data) => data.pages[0].data,
    getNextPageParam: (lastPage) => lastPage.hasNextPage || undefined,
    initialPageParam: undefined,
    ...options,
  });
};

export { useGetProfileInformation, useGetProfileFeeds };
