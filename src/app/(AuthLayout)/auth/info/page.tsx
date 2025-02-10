'use client';

import clsx from 'clsx';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

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
import RecommandedInterests from './components/RecommededInterests';
import useUserInterest from './hooks/useUserInterest';
import useUserSocialAccount from './hooks/useUserSocialAccount';

import styles from './page.module.scss';

const LINK_FIELDS_LIMIT = 3;

const AdditionalInfoPage = () => {
  const router = useRouter();
  const { addToast } = useToastContext();
  const { requestSaveSocialAccounts } = useSocialAccountsServerRequest();
  const { requestSaveInterest } = useInterestsServerRequests();

  const {
    userInterests,
    currentInterestList,
    isMaxInterestCount,
    addInterest,
    removeUserInterest,
    updateUserInterest,
  } = useUserInterest();

  const { userSocialAccounts, addUserSocialAccount, removeUserSocialAccount } =
    useUserSocialAccount();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = getUserId();

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
            <RecommandedInterests
              isMax={isMaxInterestCount}
              interests={currentInterestList}
              addInterest={addInterest}
              removeInterest={removeUserInterest}
            />
          </Field.Box>
        </Field>

        <Field>
          <Field.Label>나만의 관심사를 추가해보세요! (최대 10개)</Field.Label>
          <Field.Box
            className={clsx(styles.field_box, styles.my_interest_field_box)}
          >
            {userInterests.user.map((field) => (
              <MyInterestField
                key={field.id}
                field={field}
                onRemove={removeUserInterest}
                updateUserInterest={updateUserInterest}
              />
            ))}

            {isMaxInterestCount === false && (
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
