'use client';

import { useState } from 'react';

import If from '@/components/common/If';
import Button from '@/components/common/Button';
import { useProfileInfoMutation } from '@/api/profile/profileMutation';

import styles from './MyInformation.module.scss';
import MyEditInformation from './MyEditInformation';

export interface MyInfoType {
  username: string;
  departmentName: string;
  selfIntroduction: string;
}

interface MyInformationProps extends MyInfoType {
  isMine: boolean;
}

const MyInformation = ({
  username,
  departmentName,
  selfIntroduction,
  isMine,
}: MyInformationProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [myInfo, setMyInfo] = useState<MyInfoType>({
    username,
    departmentName,
    selfIntroduction,
  });

  const { mutate: updateProfileInfo } = useProfileInfoMutation();

  const submitHandler = (nextInfo: MyInfoType) => {
    const origin = Object.values(myInfo);
    const next = Object.values(nextInfo);

    const isSame = origin.every(
      (originInfo, index) => originInfo === next[index],
    );

    if (isSame) {
      setMyInfo(nextInfo);
    } else {
      updateProfileInfo(nextInfo, {
        onSuccess: () => {
          setMyInfo(nextInfo);
        },
      });
    }

    setIsEdit(false);
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
          onSubmitNextInfo={submitHandler}
        />
      </If.True>

      <If.False>
        <div className={styles.nickname}>
          <p>{myInfo.username}</p>
          {isMine && <Button onClick={toggleIsEdit}>수정</Button>}
        </div>
        <p className={styles.current_state}>{myInfo.departmentName}</p>
        <p className={styles.description}>{myInfo.selfIntroduction}</p>
      </If.False>
    </If>
  );
};

export default MyInformation;
