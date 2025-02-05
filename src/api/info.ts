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
  name,
}: {
  userId: number;
  hashTagId: number;
  name: string;
}) => {
  console.log(name);
  const url = `/users/${userId}/interests?hashTagId=${hashTagId}&name=${encodeURIComponent(name)}`;

  const result = await authInstance({
    method: 'DELETE',
    url,
  });

  return result;
};

export { postSocialAccount, removeSocialAccount, postInterest, removeInterest };
