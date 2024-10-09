'use client';

import { useState } from 'react';

import Button from '@/components/common/Button';

import CircleCloseIcon from '@/assets/icons/circle-close-gray.svg';
import styles from './MyEditInterest.module.scss';
import MyInterestFieldForMyPage from '../MyInterestFieldForMyPage';

interface MyEditInterestProps {
  interests: string[];
  submitHandler: (next: string[]) => void;
  toggleHandler: () => void;
}

const MyEditInterest = ({
  interests,
  submitHandler,
  toggleHandler,
}: MyEditInterestProps) => {
  const [nextInterests, setNextInterests] = useState<string[]>(interests);

  const removeInterest = (index: number) => {
    setNextInterests((prev) => prev.filter((_, i) => i !== index));
  };

  const addInterest = (interest: string) => {
    setNextInterests((prev) => [...prev, interest]);
  };

  const confirmNextInterests = () => {
    submitHandler(nextInterests);
  };

  return (
    <>
      {nextInterests.map((interest, index) => (
        <button
          key={interest}
          className={styles.my_interest}
          onClick={() => removeInterest(index)}
        >
          #{interest}
          <i>
            <CircleCloseIcon />
          </i>
        </button>
      ))}
      <MyInterestFieldForMyPage
        checkList={nextInterests}
        addInterestHandler={addInterest}
      />
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
