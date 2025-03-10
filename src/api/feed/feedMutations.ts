import { useMutation } from '@tanstack/react-query';
import {
  createCommonFeed,
  createDebateFeed,
  deleteFeed,
  dislikeFeed,
  likeFeed,
  postImageController,
  updateCommonFeed,
  voteDebateFeed,
} from './apis';

export const useCreateCommonFeed = (
  data: Feed.BasicPostRequestBody,
  options = {},
) => {
  return useMutation({
    mutationFn: () => createCommonFeed(data),
    ...options,
  });
};

export const useUpdateCommonFeed = (
  data: Feed.BasicPostRequestBody,
  options = {},
) => {
  return useMutation({
    mutationFn: () => updateCommonFeed(data),
    ...options,
  });
};

export const useCreateDebateFeed = (
  data: Feed.DebatePostRequestBody,
  options = {},
) => {
  return useMutation({
    mutationFn: () => createDebateFeed(data),
    ...options,
  });
};

export const useImageController = (
  {
    imageCount,
    fileType,
  }: {
    imageCount: number;
    fileType: string;
  },
  options = {},
) => {
  return useMutation({
    mutationFn: () => postImageController(imageCount, fileType),
    ...options,
  });
};

export const useBatchImageUpload = (options = {}) => {
  return useMutation({
    mutationFn: async ({
      preSignedUrls,
      images,
      callback,
    }: {
      preSignedUrls: string[];
      images: File[];
      callback?: () => void;
    }) => {
      console.log('batch image upload', preSignedUrls);
      const results = await Promise.all(
        preSignedUrls.map((url, index) =>
          fetch(`${url}`, {
            method: 'PUT',
            headers: {
              'Content-Type': images[index].type,
            },
            body: images[index],
          }),
        ),
      );

      if (callback) {
        callback();
      }

      return results.map((_, index) => preSignedUrls[index]);
    },
    ...options,
  });
};

export const useLikeFeed = (postId: number, options = {}) => {
  return useMutation({
    mutationFn: () => likeFeed(postId),
    ...options,
  });
};

export const useDislikeFeed = (postId: number, options = {}) => {
  return useMutation({
    mutationFn: () => dislikeFeed(postId),
    ...options,
  });
};

export const useDeleteFeed = (postId: number, options = {}) => {
  return useMutation({
    mutationFn: () => deleteFeed(postId),
    ...options,
  });
};

export const useVoteDebateFeed = (
  postId: number,
  optionId: number,
  userId: number,
  options = {},
) => {
  return useMutation({
    mutationFn: () => voteDebateFeed(postId, optionId, userId),
    ...options,
  });
};
