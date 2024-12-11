import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AuthTokenType, postLogin } from '../auth';
import { HttpSuccessType, ResponseError } from '../httpRequest';

const useLogin = (
  options: UseMutationOptions<
    HttpSuccessType<AuthTokenType>,
    ResponseError,
    { email: string; password: string }
  >,
) => {
  return useMutation({
    mutationFn: postLogin,
    ...options,
  });
};

export { useLogin };
