import { authInstance } from './httpRequest';

const postSocialAccount = async (socialAccountUrl: string) => {
  const url = `/social-accounts`;

  const result = await authInstance({
    method: 'POST',
    url,
    data: { socialAccountUrl },
  });

  return result;
};

const removeSocialAccount = async (socialAccountUrl: string) => {
  const url = `/social-accounts`;

  const result = await authInstance({
    method: 'DELETE',
    url,
    data: { socialAccountUrl },
  });

  return result;
};

const postInterest = async ({
  userId,
  interestName,
}: {
  userId: number;
  interestName: string;
}) => {
  const url = `/users/${userId}/interests`;

  const result = await authInstance({
    method: 'POST',
    url,
    data: { userId, interestName },
  });

  return result;
};
const removeInterest = async ({
  userId,
  hashTagId,
  name,
}: {
  userId: number;
  hashTagId: number;
  name: string;
}) => {
  const url = `/users/${userId}/interests?hashTagId=${hashTagId}&name=${encodeURIComponent(name)}`;

  const result = await authInstance({
    method: 'DELETE',
    url,
  });

  return result;
};

export { postSocialAccount, removeSocialAccount, postInterest, removeInterest };
