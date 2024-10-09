'use client';

import { useState } from 'react';

import If from '@/components/common/If';
import MyReadOnlyInterest from './MyReadOnlyInterest';
import MyEditInterest from './MyEditInterest';

import styles from './MyInterest.module.scss';

interface MyInterestProps {
  interests: string[];
  isMine: boolean;
}

const MyInterest = ({ isMine, interests }: MyInterestProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [myInterests, setMyInterests] = useState<string[]>(interests);

  const toggleHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const submitHandler = (next: string[]) => {
    setMyInterests(next);
    toggleHandler();
  };

  return (
    <div className={styles.container}>
      <If condition={isEdit}>
        <If.True>
          <MyEditInterest
            interests={myInterests}
            submitHandler={submitHandler}
            toggleHandler={toggleHandler}
          />
        </If.True>
        <If.False>
          <MyReadOnlyInterest
            isMine={isMine}
            interests={myInterests}
            toggleHandler={toggleHandler}
          />
        </If.False>
      </If>
    </div>
  );
};

export default MyInterest;
