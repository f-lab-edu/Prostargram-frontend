import { useMutation } from '@tanstack/react-query';
import { followUser, unfollowUser } from './apis';

export const useFollowUser = (
  data: {
    fromUserId: number;
    toUserId: number;
  },
  options = {},
) => {
  return useMutation({
    mutationFn: () => followUser(data),
    ...options,
  });
};

export const useUnfollowUser = (
  data: {
    fromUserId: number;
    toUserId: number;
  },
  options = {},
) => {
  return useMutation({
    mutationFn: () => unfollowUser(data),
    ...options,
  });
};
