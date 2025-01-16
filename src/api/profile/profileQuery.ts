import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { UserType } from '@/app/profile/types/my';
import { getProfile } from './apis';
import { HttpSuccessType, ResponseError } from '../httpRequest';

const PROPFILE_QUERY_KEYS = {
  DEFAULT: 'default_profile',
  PROFILE: (keys: (string | number)[]) =>
    [PROPFILE_QUERY_KEYS.DEFAULT, ...keys] as const,
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

export { useGetProfileInformation };
