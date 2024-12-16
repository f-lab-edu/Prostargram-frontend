import { useMutation } from '@tanstack/react-query';
import {
  createCommonFeed,
  createDebateFeed,
  deleteFeed,
  dislikeFeed,
  likeFeed,
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

export const useCreateDebateFeed = (
  data: Feed.DebatePostRequestBody,
  options = {},
) => {
  return useMutation({
    mutationFn: () => createDebateFeed(data),
    ...options,
  });
};

export const useBatchImageUpload = (options = {}) => {
  return useMutation({
    mutationFn: async ({
      preSignedImageUrls,
      images,
    }: {
      preSignedImageUrls: string[];
      images: File[];
    }) => {
      console.log('batch image upload', images);
      const results = await Promise.all(
        preSignedImageUrls.map((url, index) =>
          fetch(`/ncloud/${url}`, {
            method: 'PUT',
            headers: {
              'Content-Type': images[index].type,
            },
            body: images[index],
          }),
        ),
      );

      return results.map((_, index) => preSignedImageUrls[index]);
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
