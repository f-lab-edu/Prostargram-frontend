import { useMutation } from '@tanstack/react-query';
import {
  dislikeComment,
  likeComment,
  writeComment,
  writeDebateComment,
  writeReplyComment,
} from './apis';

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

export const useWriteDebateComment = (
  postId: number,
  optionId: number,
  data: string,
  options = {},
) => {
  return useMutation({
    mutationFn: () => writeDebateComment(postId, optionId, data),
    ...options,
  });
};

export const useWriteReplyComment = (
  postId: string,
  parentId: string,
  data: string,
  options = {},
) => {
  return useMutation({
    mutationFn: () => writeReplyComment(postId, parentId, data),
    ...options,
  });
};
