import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFieldArray,
} from 'react-hook-form';

import { RECOMMANED_INTERESTS } from 'src/data/mock';
import Logo from '@components/common/Logo';
import Field from '@components/common/Field';
import Button from '@components/common/Button';

import Plus from '@assets/icons/plus.svg?react';
import AdditionalLink from './components/AdditionalLink';
import MyInterestField from './components/MyInterestField';
import InterestCheckbox from './components/InterestCheckbox';
import { IAddionalInfoType } from './types/AdditionalInfoTypes';

import * as Styles from './AdditionalInfoPage.css';

const LINK_FIELDS_LIMIT = 3;
const MY_INTERESTS_FIELDS_LIMIT = 10;

const AdditionalInfoPage = () => {
  const methods = useForm<IAddionalInfoType>({
    defaultValues: { links: [{ link: '' }], interests: [], myInterests: [] },
  });
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = methods;

  const {
    fields: linkfields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    name: 'links',
    control,
  });

  const {
    fields: myInterestsFields,
    append: appendMyInterest,
    remove: removeMyInterest,
  } = useFieldArray({
    name: 'myInterests',
    control,
  });

  const submitHander: SubmitHandler<IAddionalInfoType> = (values) => {
    const { links, interests, myInterests } = values;
    const additionalInfo = {
      interests,
      links: links.map(({ link }) => link).filter((v) => !!v),
      myInterests: myInterests.map(({ myInterest }) => myInterest),
    };

    console.log(additionalInfo);
  };

  const appendLinks = () => {
    if (linkfields.length < LINK_FIELDS_LIMIT) {
      appendLink({ link: '' });
    }
  };

  const appendMyInterests = () => {
    if (myInterestsFields.length < MY_INTERESTS_FIELDS_LIMIT) {
      appendMyInterest({ myInterest: '' });
    }
  };

  const removeLinks = (index: number) => removeLink(index);
  const removeMyInterests = (index: number) => removeMyInterest(index);

  const currentInterestList = [
    ...getValues('interests'),
    ...getValues('myInterests').map(({ myInterest }) => myInterest),
  ];

  return (
    <div className={Styles.container}>
      <Logo />

      <form onSubmit={handleSubmit(submitHander)}>
        <FormProvider {...methods}>
          <h1 className={Styles.subTitle}>추가 정보</h1>
          <Field>
            <Field.FieldLabel htmlFor="links">링크 (최대 3개)</Field.FieldLabel>
            <Field.FieldBox className={Styles.linkField}>
              {linkfields.map((field, index) => (
                <AdditionalLink
                  key={field.id}
                  index={index}
                  removeHandler={removeLinks}
                />
              ))}
              {linkfields.length !== LINK_FIELDS_LIMIT && (
                <Button
                  type="button"
                  fill="white"
                  className={Styles.addLinkButton}
                  onClick={appendLinks}
                >
                  <Plus />
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
                  onRemove={removeMyInterests}
                />
              ))}
              {myInterestsFields.length !== MY_INTERESTS_FIELDS_LIMIT && (
                <Button
                  type="button"
                  fill="white"
                  className={Styles.addInterestButton}
                  onClick={appendMyInterests}
                >
                  <Plus width="20px" />
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
