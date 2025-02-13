import { getUserId } from '@/utils/manageToken';
import { UserType } from '@/app/profile/types/profile';
import { authInstance } from '../httpRequest';

export const getProfile = async (userId: number) => {
  const result = await authInstance<UserType>({
    method: 'GET',
    url: `/users/${userId}/profile_page`,
  });

  return result;
};

export const getProfileFeeds = async ({
  userId,
  pageParam,
}: {
  userId: number;
  pageParam?: number;
}) => {
  const result = await authInstance<Feed.FeedsResponse>({
    method: 'GET',
    url: `/users/${userId}/profile-feeds`,
    params: {
      lastPostId: pageParam,
    },
  });

  return {
    data: result.result?.data ?? [],
    hasNextPage:
      result.result?.hasNextPage && result.result?.data.at(-1)?.post.postId,
  };
};

export const updateProfileInfo = async (data: {
  username: string;
  departmentName: string;
  selfIntroduction: string;
}) => {
  const userId = getUserId();

  const result = await authInstance({
    method: 'PATCH',
    url: `/users/${userId}/profile-info`,
    data,
  });

  return result;
};

type UploadImageUrlType = {
  contentUrls: string[];
  preSignedUrls: string[];
};

const requestProfileImageUrls = async (imageCount: number) => {
  const result = await authInstance<UploadImageUrlType>({
    method: 'POST',
    url: `/images`,
    data: { imageCount, fileType: 'PROFILE_IMAGE' },
  });

  return result;
};

const uploadImageWithPresignedUrl = async ({
  contentUrls,
  preSignedUrls,
  imgFiles,
}: {
  contentUrls: string[];
  preSignedUrls: string[];
  imgFiles: File[];
}) => {
  const response = await Promise.all(
    preSignedUrls.map((url, index) =>
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': imgFiles[index].type,
        },
        body: imgFiles[index],
      }),
    ),
  );

  if (response.some((res) => !res?.ok)) {
    throw new Error('이미지 업로드에 실패 했습니다. 다시 시도해주세요.');
  }

  return response.map((_, index) => ({
    contentUrl: contentUrls[index],
  }));
};

const uploadContentUrl = async (
  userId: number,
  urls: { contentUrl: string }[],
) => {
  return Promise.all(
    urls.map((imgUrl) =>
      authInstance({
        method: 'PATCH',
        url: `/users/${userId}/profile-image`,
        data: imgUrl,
      }),
    ),
  );
};

export const updateProfileImage = async ({
  imgFiles,
}: {
  imgFiles: File[];
}) => {
  const userId = getUserId();

  const { isSuccess, result: urls } = await requestProfileImageUrls(
    imgFiles.length,
  );

  if (isSuccess && urls) {
    const { contentUrls, preSignedUrls } = urls;
    const imageContentUrls = await uploadImageWithPresignedUrl({
      contentUrls,
      preSignedUrls,
      imgFiles,
    });

    const response = await uploadContentUrl(userId, imageContentUrls);

    return response;
  }

  return [];
};
