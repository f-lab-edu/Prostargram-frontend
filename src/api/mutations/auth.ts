import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AuthInfoType, postLogin } from '../auth';
import { HttpSuccessType, ResponseError } from '../httpRequest';

const useLogin = (
  options: UseMutationOptions<
    HttpSuccessType<AuthInfoType>,
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
