import { authInstance } from './httpRequest';

const postSocialAccount = async (account: { socialAccountUrl: string }) => {
  const url = `/social-accounts`;

  const result = await authInstance({
    method: 'POST',
    url,
    data: account,
  });

  return result;
};

const removeSocialAccount = async (account: { socialAccountUrl: string }) => {
  const url = `/social-accounts`;

  const result = await authInstance({
    method: 'DELETE',
    url,
    data: account,
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
}: {
  userId: number;
  hashTagId: number;
}) => {
  const url = `/users/${userId}/interests?hashTagId=${hashTagId}`;

  const result = await authInstance({
    method: 'DELETE',
    url,
  });

  return result;
};

export { postSocialAccount, removeSocialAccount, postInterest, removeInterest };
