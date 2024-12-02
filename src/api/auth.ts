import { defaultInstance } from './httpRequest';

export interface AuthInfoType {
  accessToken: string;
  refreshToken: string;
  userId: number;
}

const postLogin = async (loginInfo: { email: string; password: string }) => {
  const result = await defaultInstance<AuthInfoType>({
    method: 'POST',
    url: '/login',
    data: loginInfo,
  });

  return result;
};

const requestLogout = async () => {
  const result = await defaultInstance<AuthInfoType>({
    method: 'GET',
    url: '/logout/success',
  });

  return result;
};

export { postLogin, requestLogout };
