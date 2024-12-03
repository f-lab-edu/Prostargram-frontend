import { useMutation } from '@tanstack/react-query';
import { followUser, unfollowUser } from './apis';

export const useFollowUser = (userId: number, options = {}) => {
  return useMutation({
    mutationFn: () => followUser(userId),
    ...options,
  });
};

export const useUnfollowUser = (userId: number, options = {}) => {
  return useMutation({
    mutationFn: () => unfollowUser(userId),
    ...options,
  });
};
