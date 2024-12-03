import { useMutation } from '@tanstack/react-query';
import { dislikeComment, likeComment } from './apis';

export const useLikeComment = (commentId: number, options = {}) => {
  return useMutation({
    mutationFn: () => likeComment(commentId),
    ...options,
  });
};

export const useDislikeComment = (commentId: number, options = {}) => {
  return useMutation({
    mutationFn: () => dislikeComment(commentId),
    ...options,
  });
};
