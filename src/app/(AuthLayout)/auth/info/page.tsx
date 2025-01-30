'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler } from 'react-hook-form';

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
import { IAddionalInfoType } from './types/AdditionalInfoTypes';
import useAdditionalInfoForm from './hooks/useAdditionalInfoForm';
import useAdditionalInfoFieldArray from './hooks/useAdditionalInfoFieldArray';

import styles from './page.module.scss';

const LINK_FIELDS_LIMIT = 3;
const MY_INTERESTS_FIELDS_LIMIT = 10;

const AdditionalInfoPage = () => {
  const router = useRouter();
  const { addToast } = useToastContext();
  const methods = useAdditionalInfoForm<IAddionalInfoType>({
    defaultValues: { links: [{ link: '' }], interests: [], myInterests: [] },
  });

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;

  const {
    fields: linkFields,
    appendField: appendLink,
    removeField: removeLink,
  } = useAdditionalInfoFieldArray<IAddionalInfoType>({
    name: 'links',
    control,
    fieldLimit: LINK_FIELDS_LIMIT,
  });

  const {
    fields: myInterestsFields,
    appendField: appendMyInterest,
    removeField: removeMyInterest,
  } = useAdditionalInfoFieldArray<IAddionalInfoType>({
    name: 'myInterests',
    control,
    fieldLimit: MY_INTERESTS_FIELDS_LIMIT,
  });

  const { requestSocialAccountSaveSocialAccounts } =
    useSocialAccountsServerRequest();
  const { requestSaveInterest } = useInterestsServerRequests();

  const submitHandler: SubmitHandler<IAddionalInfoType> = async (values) => {
    const { links, interests, myInterests } = values;

    const userId = getUserId();
    const uniqueSocialAccounts = links.filter((v) => !!v.link);
    const myInterestsNames = myInterests.map(({ myInterest }) => ({
      userId,
      interestName: myInterest,
    }));
    const interestNames = interests.map((interestName) => ({
      userId,
      interestName,
    }));
    const wholeInterestName = [...myInterestsNames, ...interestNames];

    if (uniqueSocialAccounts.length) {
      requestSocialAccountSaveSocialAccounts({
        targetSocialAccounts: uniqueSocialAccounts,
      });
    }

    requestSaveInterest({
      targetInterests: wholeInterestName,
      onSuccess: () => {
        addToast({
          type: 'success',
          message: '회원가입이 정상적으로 완료되었습니다.',
        });

        router.push('/');
      },
    });
  };

  const currentInterestList = [
    ...getValues('interests'),
    ...getValues('myInterests').map(({ myInterest }) => myInterest),
  ];

  return (
    <div className={styles.container}>
      <Logo isGoHome={false} />

      <form onSubmit={handleSubmit(submitHandler)}>
        <FormProvider {...methods}>
          <h1 className={styles.sub_title}>추가 정보</h1>
          <Field>
            <Field.Label htmlFor="links">링크 (최대 3개)</Field.Label>
            <Field.Box className={styles.link_field}>
              {linkFields.map((field, index) => (
                <AdditionalLink
                  key={field.id}
                  index={index}
                  removeHandler={() => removeLink(index)}
                />
              ))}
              {linkFields.length !== LINK_FIELDS_LIMIT && (
                <Button
                  type="button"
                  fill="white"
                  className={styles.link_button}
                  onClick={() => appendLink({ link: '' })}
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
              {RECOMMANED_INTERESTS.map((interest) => (
                <InterestCheckbox key={interest} value={interest} />
              ))}
            </Field.Box>
          </Field>

          <Field>
            <Field.Label>나만의 관심사를 추가해보세요! (최대 10개)</Field.Label>
            {errors.myInterests && (
              <p className={styles.interest_error}>
                {errors.myInterests.message}
              </p>
            )}
            <Field.Box
              className={clsx(styles.field_box, styles.my_interest_field_box)}
            >
              {myInterestsFields.map((field, index) => (
                <MyInterestField
                  key={field.id}
                  index={index}
                  checkList={currentInterestList}
                  onRemove={removeMyInterest}
                />
              ))}

              {myInterestsFields.length !== MY_INTERESTS_FIELDS_LIMIT && (
                <Button
                  type="button"
                  fill="white"
                  className={styles.interest_button}
                  onClick={() => appendMyInterest({ myInterest: '' })}
                >
                  <PlusIcon width="20" />
                </Button>
              )}
            </Field.Box>
          </Field>
          <Button>회원가입 완료</Button>
        </FormProvider>
      </form>
    </div>
  );
};

export default AdditionalInfoPage;
