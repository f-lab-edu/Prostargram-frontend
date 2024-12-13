import { useMutation } from '@tanstack/react-query';
import { dislikeComment, likeComment, writeComment } from './apis';

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

export const useWriteComment = (postId: number, data: string, options = {}) => {
  return useMutation({
    mutationFn: () => writeComment(postId, data),
    ...options,
  });
};
