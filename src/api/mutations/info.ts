import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { HttpSuccessType, ResponseError } from '../httpRequest';
import { postInterest, postSocialAccount } from '../info';

const useAddSocialAccountMutation = (
  options: UseMutationOptions<
    HttpSuccessType<unknown>,
    ResponseError,
    { socialAccountUrl: string }
  >,
) => {
  return useMutation({
    mutationFn: postSocialAccount,
    ...options,
  });
};

const useAddInterest = (
  options: UseMutationOptions<
    HttpSuccessType<unknown>,
    ResponseError,
    { userId: number; interestName: string }
  >,
) => {
  return useMutation({
    mutationFn: postInterest,
    ...options,
  });
};

export { useAddSocialAccountMutation, useAddInterest };
