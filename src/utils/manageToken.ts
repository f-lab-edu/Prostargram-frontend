const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export const saveAccessToken = (token: string) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return true;
  }

  throw new Error('Token string is empty!');
};

export const saveRefreshToken = (token: string) => {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN, token);
    return true;
  }

  throw new Error('Token string is empty!');
};

export const getAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    return token;
  }

  throw new Error('Access token is not erolled!');
};

export const getRefreshToken = () => {
  const token = localStorage.getItem(REFRESH_TOKEN);

  if (token) {
    return token;
  }

  throw new Error('Refresh token is not erolled!');
};
