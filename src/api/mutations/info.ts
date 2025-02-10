import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { HttpSuccessType, ResponseError } from '../httpRequest';
import {
  postInterest,
  postSocialAccount,
  removeInterest,
  removeSocialAccount,
} from '../info';

type CustomMutationOptionType<T> =
  | UseMutationOptions<HttpSuccessType<unknown>, ResponseError, T>
  | undefined;

const useAddSocialAccountMutation = (
  options: CustomMutationOptionType<string> = {},
) => {
  return useMutation({
    mutationFn: postSocialAccount,
    ...options,
  });
};

const useRemoveSocialAccountMutation = (
  options: CustomMutationOptionType<string> = {},
) => {
  return useMutation({
    mutationFn: removeSocialAccount,
    ...options,
  });
};

const useAddInterest = (
  options: CustomMutationOptionType<{
    userId: number;
    interestName: string;
  }> = {},
) => {
  return useMutation({
    mutationFn: postInterest,
    ...options,
  });
};

const useRemoveInterest = (
  options: CustomMutationOptionType<{
    userId: number;
    hashTagId: number;
    name: string;
  }> = {},
) => {
  return useMutation({
    mutationFn: removeInterest,
    throwOnError: false,
    ...options,
  });
};

export {
  useAddSocialAccountMutation,
  useRemoveSocialAccountMutation,
  useAddInterest,
  useRemoveInterest,
};
