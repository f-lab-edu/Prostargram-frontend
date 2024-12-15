import { defaultInstance } from './httpRequest';

interface AuthTokenType {
  accessToken: string;
  refreshToken: string;
  userId: number;
}

const postLogin = async (loginInfo: { email: string; password: string }) => {
  const result = await defaultInstance<AuthTokenType>({
    method: 'POST',
    url: '/login',
    data: loginInfo,
  });

  return result;
};

const requestLogout = async () => {
  const result = await defaultInstance<AuthTokenType>({
    method: 'GET',
    url: '/logout/success',
  });

  return result;
};

export { postLogin, requestLogout };
