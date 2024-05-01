'use client';

import { FormProvider, SubmitHandler } from 'react-hook-form';

import { RECOMMANED_INTERESTS } from '@/data/mock';
import Logo from '@/components/common/Logo';
import Field from '@/components/common/Field';
import Button from '@/components/common/Button';

import PlusIcon from '@/assets/icons/plus.svg';
import AdditionalLink from './components/AdditionalLink';
import MyInterestField from './components/MyInterestField';
import InterestCheckbox from './components/InterestCheckbox';
import { IAddionalInfoType } from './types/AdditionalInfoTypes';
import useAdditionalInfoForm from './hooks/useAdditionalInfoForm';
import useAdditionalInfoFieldArray from './hooks/useAdditionalInfoFieldArray';

import * as Styles from './AdditionalInfoPage.css';

const LINK_FIELDS_LIMIT = 3;
const MY_INTERESTS_FIELDS_LIMIT = 10;

const AdditionalInfoPage = () => {
  const { methods, getValues, handleSubmit, errors } =
    useAdditionalInfoForm<IAddionalInfoType>({
      defaultValues: { links: [{ link: '' }], interests: [], myInterests: [] },
    });

  const {
    fields: linkFields,
    appendField: appendLink,
    removeField: removeLink,
  } = useAdditionalInfoFieldArray<IAddionalInfoType>({
    name: 'links',
    control: methods.control,
    fieldLimit: LINK_FIELDS_LIMIT,
  });

  const {
    fields: myInterestsFields,
    appendField: appendMyInterest,
    removeField: removeMyInterest,
  } = useAdditionalInfoFieldArray<IAddionalInfoType>({
    name: 'myInterests',
    control: methods.control,
    fieldLimit: MY_INTERESTS_FIELDS_LIMIT,
  });

  const submitHandler: SubmitHandler<IAddionalInfoType> = (values) => {
    const { links, interests, myInterests } = values;
    const additionalInfo = {
      interests,
      links: links.map(({ link }) => link).filter((v) => !!v),
      myInterests: myInterests.map(({ myInterest }) => myInterest),
    };

    console.log(additionalInfo);
  };

  const currentInterestList = [
    ...getValues('interests'),
    ...getValues('myInterests').map(({ myInterest }) => myInterest),
  ];

  return (
    <div className={Styles.container}>
      <Logo />

      <form onSubmit={handleSubmit(submitHandler)}>
        <FormProvider {...methods}>
          <h1 className={Styles.subTitle}>추가 정보</h1>
          <Field>
            <Field.FieldLabel htmlFor="links">링크 (최대 3개)</Field.FieldLabel>
            <Field.FieldBox className={Styles.linkField}>
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
                  className={Styles.addLinkButton}
                  onClick={() => appendLink({ link: '' })}
                >
                  <PlusIcon width="20" />
                </Button>
              )}
            </Field.FieldBox>
          </Field>

          <Field>
            <Field.FieldLabel>추천 관심사</Field.FieldLabel>
            <Field.FieldBox className={Styles.interestsFieldBox}>
              {RECOMMANED_INTERESTS.map((interest) => (
                <InterestCheckbox key={interest} value={interest} />
              ))}
            </Field.FieldBox>
          </Field>

          <Field>
            <Field.FieldLabel>
              나만의 관심사를 추가해보세요! (최대 10개)
            </Field.FieldLabel>
            {errors.myInterests && (
              <p className={Styles.myInterestErrorMessage}>
                {errors.myInterests.message}
              </p>
            )}
            <Field.FieldBox className={Styles.myInterestFieldBox}>
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
                  className={Styles.addInterestButton}
                  onClick={() => appendMyInterest({ myInterest: '' })}
                >
                  <PlusIcon width="20" />
                </Button>
              )}
            </Field.FieldBox>
          </Field>
          <Button>회원가입 완료</Button>
        </FormProvider>
      </form>
    </div>
  );
};

export default AdditionalInfoPage;
