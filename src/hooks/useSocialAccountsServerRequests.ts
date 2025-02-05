import {
  useAddSocialAccountMutation,
  useRemoveSocialAccountMutation,
} from '@/api/mutations/info';
import { requestPromiseAll } from '@/utils/asyncLogic';
import { useToastContext } from '@/components/common/Toast/ToastProvider';

type RequestSaveInterestType = {
  targetSocialAccounts: string[];
  onSuccess?: () => void;
  onError?: () => void;
  successMessage?: string;
  errorMessage?: string;
};

const useSocialAccountsServerRequest = () => {
  const { mutate: saveSocialAccount } = useAddSocialAccountMutation({});
  const { mutate: removeSocialAccount } = useRemoveSocialAccountMutation({});
  const { addToast } = useToastContext();

  const requestSaveSocialAccounts = async ({
    targetSocialAccounts,
    onSuccess,
    onError,
    successMessage,
  }: RequestSaveInterestType) => {
    const successfulSocialRequests: string[] = [];

    try {
      await requestPromiseAll<string>(
        targetSocialAccounts,
        async (socialAccount: string) =>
          saveSocialAccount(socialAccount, {
            onSuccess: () => {
              successfulSocialRequests.push(socialAccount);
            },
          }),
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
      await requestPromiseAll<string>(
        successfulSocialRequests,
        async (socialAccount) => {
          removeSocialAccount(socialAccount);
        },
      );

      if (onError) {
        onError();
      }
    }
  };

  return { requestSaveSocialAccounts };
};

export default useSocialAccountsServerRequest;
