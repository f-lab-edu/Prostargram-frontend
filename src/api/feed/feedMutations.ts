import { useMutation } from '@tanstack/react-query';
import { createCommonFeed } from './apis';

export const useCreateCommonFeed = (
  data: Feed.BasicPostRequestBody,
  options = {},
) => {
  return useMutation({
    mutationFn: () => createCommonFeed(data),
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
