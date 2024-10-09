'use client';

import { useState } from 'react';

import If from '@/components/common/If';
import Button from '@/components/common/Button';

import styles from './MyInformation.module.scss';
import MyEditInformation from './MyEditInformation';

export interface MyInfoType {
  nickname: string;
  currentState: string;
  description: string;
}

interface MyInformationProps {
  nickname: string;
  currentState: string;
  description: string;
  isMine: boolean;
}

const MyInformation = ({
  nickname,
  currentState,
  description,
  isMine,
}: MyInformationProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [myInfo, setMyInfo] = useState<MyInfoType>({
    nickname,
    currentState,
    description,
  });

  const submitHandler = (nextInfo: MyInfoType) => {
    setMyInfo(nextInfo);
  };

  const toggleIsEdit = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <If condition={isEdit}>
      <If.True>
        <MyEditInformation
          toggleEditHandler={toggleIsEdit}
          myInfo={myInfo}
          submitHandler={submitHandler}
        />
      </If.True>

      <If.False>
        <div className={styles.nickname}>
          <p>{myInfo.nickname}</p>
          {isMine && <Button onClick={toggleIsEdit}>수정</Button>}
        </div>
        <p className={styles.current_state}>{myInfo.currentState}</p>
        <p className={styles.description}>{myInfo.description}</p>
      </If.False>
    </If>
  );
};

export default MyInformation;
