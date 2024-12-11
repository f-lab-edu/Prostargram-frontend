import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { HttpSuccessType, ResponseError } from '../httpRequest';
import {
  postInterest,
  postSocialAccount,
  removeInterest,
  removeSocialAccount,
} from '../info';

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

const useRemoveSocialAccountMutation = (
  options: UseMutationOptions<
    HttpSuccessType<unknown>,
    ResponseError,
    { socialAccountUrl: string }
  >,
) => {
  return useMutation({
    mutationFn: removeSocialAccount,
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

const useRemoveInterest = (
  options: UseMutationOptions<
    HttpSuccessType<unknown>,
    ResponseError,
    { userId: number; hashTagId: number }
  >,
) => {
  return useMutation({
    mutationFn: removeInterest,
    ...options,
  });
};

export {
  useAddSocialAccountMutation,
  useRemoveSocialAccountMutation,
  useAddInterest,
  useRemoveInterest,
};
