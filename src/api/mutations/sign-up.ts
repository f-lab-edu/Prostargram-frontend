import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  UserSignUpType,
  postConfirmCode,
  postConfirmCodeByEamil,
  postConfirmUsernameDuplicate,
  postSignupUser,
} from '../sign-up';
import { HttpSuccessType, ResponseError } from '../httpRequest';

export const useSelfSignUpMutation = (
  options: UseMutationOptions<HttpSuccessType<unknown>, ResponseError, string>,
) =>
  useMutation({
    mutationFn: postConfirmCodeByEamil,
    ...options,
  });

export const useEamilConfirmMutation = (
  options: UseMutationOptions<
    HttpSuccessType<{ emailToken: string }>,
    ResponseError,
    { email: string; code: string }
  > = {},
) => {
  return useMutation({
    mutationFn: postConfirmCode,
    ...options,
  });
};

export const useConfirmUsernameDuplicate = (
  options: UseMutationOptions<
    HttpSuccessType<{ usernameToken: string }>,
    ResponseError,
    string
  > = {},
) => {
  return useMutation({
    mutationFn: postConfirmUsernameDuplicate,
    ...options,
  });
};

export const useSignupUser = (
  options: UseMutationOptions<
    HttpSuccessType<unknown>,
    ResponseError,
    UserSignUpType
  > = {},
) => {
  return useMutation({
    mutationFn: postSignupUser,
    ...options,
  });
};
