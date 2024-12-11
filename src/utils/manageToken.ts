const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER_ID = 'user_id';

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

export const saveUserId = (userId: number) => {
  if (userId) {
    localStorage.setItem(USER_ID, userId.toString());
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

export const getUserId = () => {
  const userId = localStorage.getItem(USER_ID);

  if (userId) {
    return Number(userId);
  }

  throw new Error('User ID is not erolled!');
};
