'use client';

import clsx from 'clsx';
import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { RECOMMANED_INTERESTS } from '@/data/mock';
import Logo from '@/components/common/Logo';
import Field from '@/components/common/Field';
import Button from '@/components/common/Button';
import { getUserId } from '@/utils/manageToken';
import { useToastContext } from '@/components/common/Toast/ToastProvider';
import useInterestsServerRequests from '@/hooks/useInterestsServerRequests';
import useSocialAccountsServerRequest from '@/hooks/useSocialAccountsServerRequests';

import PlusIcon from '@/assets/icons/plus.svg';
import AdditionalLink from './components/AdditionalLink';
import MyInterestField from './components/MyInterestField';
import InterestCheckbox from './components/InterestCheckbox';

import styles from './page.module.scss';

const LINK_FIELDS_LIMIT = 3;
const MY_INTERESTS_FIELDS_LIMIT = 10;

const generateId = () => Date.now().toLocaleString();

type UserInterestType = { id: string; interestName: string };
type UserSocialAccountType = { id: string; socialAccount: string };
type UserInterestsType = {
  recommended: UserInterestType[];
  user: UserInterestType[];
};

const AdditionalInfoPage = () => {
  const router = useRouter();
  const { addToast } = useToastContext();
  const { requestSaveSocialAccounts } = useSocialAccountsServerRequest();
  const { requestSaveInterest } = useInterestsServerRequests();

  const [userSocialAccounts, setUserSocialAccounts] = useState<
    UserSocialAccountType[]
  >([{ id: generateId(), socialAccount: '' }]);
  const [userInterests, setUserInterests] = useState<UserInterestsType>({
    recommended: [],
    user: [],
  });
  const [isError, setIsError] = useState<boolean>(false);

  const currentInterestList = useMemo(
    () => [...userInterests.user, ...userInterests.recommended],
    [userInterests],
  );

  const currentInterestStringList = useMemo(
    () => [
      ...userInterests.user.map(({ interestName }) => interestName),
      ...userInterests.recommended.map(({ interestName }) => interestName),
    ],
    [userInterests],
  );

  const isMax = currentInterestStringList.length >= MY_INTERESTS_FIELDS_LIMIT;

  const addUserSocialAccount = () => {
    setUserSocialAccounts((prev) => [
      ...prev,
      { id: generateId(), socialAccount: '' },
    ]);
  };

  const removeUserSocialAccount = (removeTargetId: string) => {
    setUserSocialAccounts((prev) =>
      prev.filter(({ id }) => id !== removeTargetId),
    );
  };

  const addInterest = (type: 'user' | 'recommended', interestName?: string) => {
    if (isMax) return;
    setUserInterests(({ user, recommended }) => {
      const newInterest = {
        id: generateId(),
        interestName: interestName ?? '',
      };

      const nextUser = type === 'user' ? [...user, newInterest] : user;
      const nextRecommended =
        type === 'recommended' ? [...recommended, newInterest] : recommended;

      return {
        user: nextUser,
        recommended: nextRecommended,
      };
    });
  };

  const updateUserInterest = (field: UserInterestType) => {
    setUserInterests(({ recommended, user }) => ({
      recommended,
      user: user.map((interest) =>
        interest.id === field.id ? field : interest,
      ),
    }));
  };

  const removeUserInterest = (removeTargetId: string) => {
    setUserInterests(({ recommended, user }) => ({
      recommended: recommended.filter(({ id }) => id !== removeTargetId),
      user: user.filter(({ id }) => id !== removeTargetId),
    }));
  };

  const changeError = (bool: boolean) => {
    setIsError(bool);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = getUserId();
    console.log(userId);

    const uniqueSocialAccounts = userSocialAccounts
      .map(({ socialAccount }) => socialAccount)
      .filter((socialAccount) => !!socialAccount);

    if (uniqueSocialAccounts.length) {
      requestSaveSocialAccounts({
        targetSocialAccounts: uniqueSocialAccounts,
      });
    }

    const interestNamesWithUserId = currentInterestList.map(
      ({ interestName }) => ({
        userId,
        interestName,
      }),
    );

    requestSaveInterest({
      targetInterests: interestNamesWithUserId,
      onSuccess: () => {
        addToast({
          type: 'success',
          message: '회원가입이 정상적으로 완료되었습니다.',
        });

        router.push('/');
      },
    });
  };

  console.log(userInterests);

  return (
    <div className={styles.container}>
      <Logo isGoHome={false} />

      <form onSubmit={submitHandler}>
        <h1 className={styles.sub_title}>추가 정보</h1>
        <Field>
          <Field.Label htmlFor="links">링크 (최대 3개)</Field.Label>
          <Field.Box className={styles.link_field}>
            {userSocialAccounts.map((field, index) => (
              <AdditionalLink
                key={field.id}
                id={field.id}
                index={index}
                removeHandler={removeUserSocialAccount}
              />
            ))}
            {userSocialAccounts.length !== LINK_FIELDS_LIMIT && (
              <Button
                type="button"
                fill="white"
                className={styles.link_button}
                onClick={addUserSocialAccount}
              >
                <PlusIcon width="20" />
              </Button>
            )}
          </Field.Box>
        </Field>
        <Field>
          <Field.Label>추천 관심사</Field.Label>
          <Field.Box
            className={clsx(styles.field_box, styles.interest_field_box)}
          >
            {RECOMMANED_INTERESTS.map((interest) => {
              const findedInterestId = currentInterestList.find(
                ({ interestName }) => interestName === interest,
              )?.id;

              const removeInterestIfinterestIsMatched = () => {
                if (findedInterestId) {
                  removeUserInterest(findedInterestId);
                }
              };

              return (
                <InterestCheckbox
                  key={interest}
                  value={interest}
                  isMax={isMax}
                  isCheckedInterest={Boolean(findedInterestId)}
                  onClickWithChecked={removeInterestIfinterestIsMatched}
                  onClickWithUnchecked={() =>
                    addInterest('recommended', interest)
                  }
                />
              );
            })}
          </Field.Box>
        </Field>

        <Field>
          <Field.Label>나만의 관심사를 추가해보세요! (최대 10개)</Field.Label>
          {isError && (
            <p className={styles.interest_error}>중복된 관심사 입니다.</p>
          )}
          <Field.Box
            className={clsx(styles.field_box, styles.my_interest_field_box)}
          >
            {userInterests.user.map((field) => (
              <MyInterestField
                key={field.id}
                field={field}
                checkList={currentInterestStringList}
                onRemove={removeUserInterest}
                changeError={changeError}
                updateUserInterest={updateUserInterest}
              />
            ))}

            {isMax === false && (
              <Button
                type="button"
                fill="white"
                className={styles.interest_button}
                onClick={() => addInterest('user')}
              >
                <PlusIcon width="20" />
              </Button>
            )}
          </Field.Box>
        </Field>
        <Button>회원가입 완료</Button>
      </form>
    </div>
  );
};

export default AdditionalInfoPage;
