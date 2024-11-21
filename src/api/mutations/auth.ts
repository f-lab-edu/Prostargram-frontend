import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { postLogin } from '../auth';
import { HttpSuccessType, ResponseError } from '../httpRequest';

const useLogin = async (
  options: UseMutationOptions<
    HttpSuccessType<{ accessToken: string; refreshToken: string }>,
    ResponseError,
    { email: string; password: string }
  >,
) => {
  return useMutation({
    mutationFn: (loginInfo) => postLogin(loginInfo),
    ...options,
  });
};

export { useLogin };
