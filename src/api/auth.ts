import { defaultInstance } from './httpRequest';

const postLogin = async (loginInfo: { email: string; password: string }) => {
  console.log('In postLogin', loginInfo);

  const result = await defaultInstance<{
    accessToken: string;
    refreshToken: string;
  }>({
    method: 'POST',
    data: loginInfo,
  });

  return result;
};

export { postLogin };
