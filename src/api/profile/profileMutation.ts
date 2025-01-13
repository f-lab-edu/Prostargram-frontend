import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { updateProfileInfo } from './apis';
import { HttpSuccessType, ResponseError } from '../httpRequest';

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

export { useProfileInfoMutation };
