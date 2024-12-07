import { defaultInstance } from './httpRequest';

type UserSignUpType = {
  email: string;
  password: string;
  username: string;
  emailToken: string;
  usernameToken: string;
};

const postConfirmCodeByEamil = async (email: string) => {
  const url = `/verification/email?email=${email}`;

  const result = await defaultInstance({
    method: 'POST',
    url,
  });

  return result;
};

const postConfirmCode = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const url = `/verification/email/${email}?code=${code}`;

  const result = await defaultInstance<{ emailToken: string }>({
    method: 'POST',
    url,
  });

  return result;
};

const postConfirmUsernameDuplicate = async (username: string) => {
  const url = `/verification/username?username=${username}`;

  const result = await defaultInstance<{ usernameToken: string }>({
    method: 'POST',
    url,
  });

  return result;
};

const postSignupUser = async (userInfo: UserSignUpType) => {
  const url = `/users`;

  const result = await defaultInstance({
    method: 'POST',
    url,
    data: userInfo,
  });

  return result;
};

export {
  postConfirmCodeByEamil,
  postConfirmCode,
  postConfirmUsernameDuplicate,
  postSignupUser,
};

export type { UserSignUpType };
