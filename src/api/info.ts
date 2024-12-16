import { defaultInstance } from './httpRequest';

const postSocialAccount = async (account: { socialAccountUrl: string }) => {
  const url = `/social-accounts`;

  const result = await defaultInstance({
    method: 'POST',
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

  const result = await defaultInstance({
    method: 'POST',
    url,
    data: { userId, interestName },
  });

  return result;
};

export { postSocialAccount, postInterest };
