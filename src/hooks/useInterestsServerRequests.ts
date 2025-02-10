import { getProfile } from '@/api/profile';
import { useAddInterest, useRemoveInterest } from '@/api/mutations/info';
import { getUserId } from '@/utils/manageToken';
import { requestPromiseAll } from '@/utils/asyncLogic';
import { useToastContext } from '@/components/common/Toast/ToastProvider';

type InterestWithUserIdType = {
  userId?: number;
  interestName: string;
};

type InterestWithUserIdAndHashTagIdType = {
  userId?: number;
  interestName: string;
  hashTagId?: number;
};

type RequestInterestType = {
  onSuccess?: () => void;
  onError?: () => void;
  successMessage?: string;
  errorMessage?: string;
};

type SaveInterestType = RequestInterestType & {
  targetInterests: InterestWithUserIdType[];
};

type RemoveInterestType = RequestInterestType & {
  targetInterests: InterestWithUserIdAndHashTagIdType[];
};

const useInterestsServerRequests = () => {
  const { mutate: saveInterest } = useAddInterest();
  const { mutate: removeInterest } = useRemoveInterest();
  const { addToast } = useToastContext();

  const requestSaveInterest = async ({
    targetInterests,
    onSuccess,
    onError,
    successMessage,
  }: SaveInterestType) => {
    const userId = getUserId();
    const successfulIntersetRequests: InterestWithUserIdType[] = [];

    try {
      await requestPromiseAll<InterestWithUserIdType>(
        targetInterests,
        ({ interestName }) =>
          saveInterest(
            { userId, interestName },
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
          ({ interestName }) => {
            const hashTagId = interests.find(
              ({ hashTagName }) => interestName === hashTagName,
            )?.hashTagId;

            if (hashTagId) {
              removeInterest({
                userId,
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

  const requestRemoveInterest = async ({
    targetInterests,
    onSuccess,
    onError,
    successMessage,
  }: RemoveInterestType) => {
    const userId = getUserId();
    const successfulIntersetRequests: InterestWithUserIdAndHashTagIdType[] = [];

    try {
      await requestPromiseAll<InterestWithUserIdAndHashTagIdType>(
        targetInterests,
        async ({ interestName, hashTagId }) => {
          if (hashTagId) {
            removeInterest({
              userId,
              hashTagId,
              name: interestName,
            });
          }
        },
      );

      if (onError) {
        onError();
      }

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
      await requestPromiseAll<InterestWithUserIdAndHashTagIdType>(
        successfulIntersetRequests,
        async ({ interestName }) =>
          saveInterest(
            { userId, interestName },
            {
              onSuccess: () => {
                successfulIntersetRequests.push({ userId, interestName });
              },
            },
          ),
      );
    }
  };

  return { requestSaveInterest, requestRemoveInterest };
};

export default useInterestsServerRequests;
