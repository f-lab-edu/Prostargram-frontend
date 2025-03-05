import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { updateProfileImage, updateProfileInfo } from './apis';
import {
  HttpResponseType,
  HttpSuccessType,
  ResponseError,
} from '../httpRequest';

const useProfileInfoMutation = (
  options?: UseMutationOptions<
    HttpSuccessType<unknown>,
    ResponseError,
    {
      username: string;
      departmentName: string;
      selfIntroduction: string;
    }
  >,
) => {
  return useMutation({
    mutationFn: updateProfileInfo,
    ...options,
  });
};

const useProfileImageMutation = (
  options?: UseMutationOptions<
    (HttpResponseType & {
      result?: unknown;
    })[],
    ResponseError,
    { imgFiles: File[] }
  >,
) => {
  return useMutation({
    mutationFn: updateProfileImage,
    ...options,
  });
};

export { useProfileInfoMutation, useProfileImageMutation };
