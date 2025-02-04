import { UserType } from '@/app/profile/types/my';
import { getUserId } from '@/utils/manageToken';
import { authInstance, defaultInstance } from './httpRequest';

export const updateMyLinks = async (myLinks: (File | string)[]) => {
  try {
    const result = await defaultInstance<string[]>({
      url: '/my/link',
      method: 'POST',
      data: JSON.stringify(myLinks),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const getProfile = async () => {
  const userId = getUserId();
  const result = await authInstance<UserType>({
    method: 'GET',
    url: `/users/${userId}/profile_page`,
  });

  return result;
};
