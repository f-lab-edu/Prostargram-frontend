import {
  useAddSocialAccountMutation,
  useRemoveSocialAccountMutation,
} from '@/api/mutations/info';
import { requestPromiseAll } from '@/utils/asyncLogic';
import { useToastContext } from '@/components/common/Toast/ToastProvider';

type SocialAccountType = {
  link: string;
};

type RequestSocialAccountType = {
  targetSocialAccounts: SocialAccountType[];
  onSuccess?: () => void;
  onError?: () => void;
  successMessage?: string;
  errorMessage?: string;
};

const useSocialAccountsServerRequest = () => {
  const { mutate: saveSocialAccount } = useAddSocialAccountMutation({});
  const { mutate: removeSocialAccount } = useRemoveSocialAccountMutation({});
  const { addToast } = useToastContext();

  const requestSocialAccountSaveSocialAccounts = async ({
    targetSocialAccounts,
    onSuccess,
    onError,
    successMessage,
  }: RequestSocialAccountType) => {
    const successfulSocialRequests: SocialAccountType[] = [];

    try {
      await requestPromiseAll<SocialAccountType>(
        targetSocialAccounts,
        async ({ link: socialAccountUrl }) =>
          saveSocialAccount(
            { socialAccountUrl },
            {
              onSuccess: () => {
                successfulSocialRequests.push({ link: socialAccountUrl });
              },
            },
          ),
      );

      if (successMessage) {
        addToast({
          type: 'success',
          message: successMessage,
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      await requestPromiseAll<SocialAccountType>(
        successfulSocialRequests,
        async ({ link: socialAccountUrl }) => {
          removeSocialAccount({ socialAccountUrl });
        },
      );

      if (onError) {
        onError();
      }
    }
  };
  const requestSocialAccountRemoveSocialAccounts = async ({
    targetSocialAccounts,
    onSuccess,
    onError,
    successMessage,
  }: RequestSocialAccountType) => {
    const successfulSocialAccountRequests: SocialAccountType[] = [];

    try {
      await requestPromiseAll<SocialAccountType>(
        targetSocialAccounts,
        async ({ link: socialAccountUrl }) =>
          removeSocialAccount(
            { socialAccountUrl },
            {
              onSuccess: () => {
                successfulSocialAccountRequests.push({
                  link: socialAccountUrl,
                });
              },
            },
          ),
      );

      if (successMessage) {
        addToast({
          type: 'success',
          message: successMessage,
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      await requestPromiseAll<SocialAccountType>(
        successfulSocialAccountRequests,
        async ({ link: socialAccountUrl }) => {
          saveSocialAccount({ socialAccountUrl });
        },
      );

      if (onError) {
        onError();
      }
    }
  };

  return {
    requestSocialAccountSaveSocialAccounts,
    requestSocialAccountRemoveSocialAccounts,
  };
};

export default useSocialAccountsServerRequest;
