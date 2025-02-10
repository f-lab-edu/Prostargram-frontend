import { getProfile } from '@/api/my';
import { useAddInterest, useRemoveInterest } from '@/api/mutations/info';
import { getUserId } from '@/utils/manageToken';
import { requestPromiseAll } from '@/utils/asyncLogic';
import { useToastContext } from '@/components/common/Toast/ToastProvider';

type InterestWithUserIdType = {
  userId: number;
  interestName: string;
};

type RequestSaveInterestType = {
  targetInterests: InterestWithUserIdType[];
  onSuccess?: () => void;
  onError?: () => void;
  successMessage?: string;
  errorMessage?: string;
};

const useInterestsServerRequests = () => {
  const { mutate: saveInterest } = useAddInterest({});
  const { mutate: removeInterest } = useRemoveInterest({});
  const { addToast } = useToastContext();

  const requestSaveInterest = async ({
    targetInterests,
    onSuccess,
    onError,
    successMessage,
  }: RequestSaveInterestType) => {
    const userId = getUserId();
    const successfulIntersetRequests: InterestWithUserIdType[] = [];

    try {
      await requestPromiseAll<InterestWithUserIdType>(
        targetInterests,
        ({ userId: interestUserId, interestName }) =>
          saveInterest(
            { userId: interestUserId, interestName },
            {
              onSuccess: () => {
                successfulIntersetRequests.push({ userId, interestName });
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
      const profileResponse = await getProfile();
      if (profileResponse.isSuccess && profileResponse.result) {
        const { interests } = profileResponse.result;

        await requestPromiseAll<InterestWithUserIdType>(
          successfulIntersetRequests,
          ({ userId: interestUserId, interestName }) => {
            const hashTagId = interests.find(
              ({ hashTagName }) => interestName === hashTagName,
            )?.hashTagId;

            if (hashTagId) {
              removeInterest({
                userId: interestUserId,
                hashTagId,
                name: interestName,
              });
            }
          },
        );

        if (onError) {
          onError();
        }
      }
    }
  };

  return { requestSaveInterest };
};

export default useInterestsServerRequests;
