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

export const getMyFeeds = async (userId: number) => {
  const result = await authInstance({
    method: 'GET',
    url: `/users/${userId}/profile-feeds`,
  });

  return result;
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

export const updateProfileImage = async (data: { formData: FormData }) => {
  const userId = getUserId();

  const result = await authInstance({
    method: 'PATCH',
    url: `/users/${userId}/profile-image`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return result;
};
