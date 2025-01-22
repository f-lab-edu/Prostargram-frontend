'use client';

import { useMemo, useState } from 'react';

import If from '@/components/common/If';
import Button from '@/components/common/Button';
import { UserInterestWithOptionalHashTagIdType } from '@/app/profile/types/profile';

import CircleCloseIcon from '@/assets/icons/circle-close-gray.svg';
import MyInterestFieldForMyPage from '../MyInterestFieldForMyPage';

import styles from './MyEditInterest.module.scss';

interface MyEditInterestProps {
  interests: UserInterestWithOptionalHashTagIdType[];
  submitHandler: (next: {
    nextInterestsState: UserInterestWithOptionalHashTagIdType[];
    add: UserInterestWithOptionalHashTagIdType[];
    remove: UserInterestWithOptionalHashTagIdType[];
  }) => void;
  toggleHandler: () => void;
}

const MyEditInterest = ({
  interests,
  submitHandler,
  toggleHandler,
}: MyEditInterestProps) => {
  const [nextInterests, setNextInterests] =
    useState<UserInterestWithOptionalHashTagIdType[]>(interests);
  const [mutatedInterests, setMutatedInterests] = useState<{
    add: UserInterestWithOptionalHashTagIdType[];
    remove: UserInterestWithOptionalHashTagIdType[];
  }>({ add: [], remove: [] });

  const stringNextInterests = useMemo(
    () => nextInterests.map(({ hashTagName }) => hashTagName),
    [nextInterests],
  );

  const removeInterest = (index: number) => {
    setNextInterests((prevInterest) =>
      prevInterest.filter((removePossibleInterest, i) => {
        if (i === index) {
          setMutatedInterests((prevMutatedInterests) => ({
            ...prevMutatedInterests,
            remove: [...prevMutatedInterests.remove, removePossibleInterest],
          }));
        }
        return i !== index;
      }),
    );
  };

  const addInterest = (interest: string) => {
    setNextInterests((prev) => [...prev, { hashTagName: interest }]);
    setMutatedInterests((prev) => ({
      ...prev,
      add: [...prev.add, { hashTagName: interest }],
    }));
  };

  const confirmNextInterests = () => {
    submitHandler({ nextInterestsState: nextInterests, ...mutatedInterests });
  };

  return (
    <>
      <ul className={styles.my_interest_list}>
        {nextInterests.map(({ hashTagName }, index) => (
          <button
            key={hashTagName}
            className={styles.my_interest}
            onClick={() => removeInterest(index)}
          >
            #{hashTagName}
            <i>
              <CircleCloseIcon />
            </i>
          </button>
        ))}
        <If condition={nextInterests.length < 10}>
          <If.True>
            <MyInterestFieldForMyPage
              checkList={stringNextInterests}
              addInterestHandler={addInterest}
            />
          </If.True>
        </If>
      </ul>
      <div className={styles.edit_button_wrapper}>
        <Button onClick={confirmNextInterests}>확인</Button>
        <Button fill="gray" onClick={toggleHandler}>
          취소
        </Button>
      </div>
    </>
  );
};

export default MyEditInterest;
