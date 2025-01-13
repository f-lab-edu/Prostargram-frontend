'use client';

import { ChangeEvent, useState } from 'react';

import { useConfirmUsernameDuplicate } from '@/api/mutations/sign-up';
import Button from '@/components/common/Button';
import type { MyInfoType } from '../MyInformation';

import styles from './MyEditInformation.module.scss';

interface MyEditInformationProps {
  myInfo: MyInfoType;
  toggleEditHandler: () => void;
  submitHandler: (nextInfo: MyInfoType) => void;
}

const MyEditInformation = ({
  myInfo,
  toggleEditHandler,
  submitHandler,
}: MyEditInformationProps) => {
  const [isConfirmDuplicate, setIsConfirmDuplicate] = useState<boolean>(true);
  const [nextMyInfo, setNextMyInfo] = useState<MyInfoType>(myInfo);

  const { mutate: checkIsDuplicateUsername } = useConfirmUsernameDuplicate();

  const checkDuplicate = () => {
    checkIsDuplicateUsername(nextMyInfo.username, {
      onSuccess: (res) => {
        setIsConfirmDuplicate(res.isSuccess);
      },
    });
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    const targetInputName = e.target.name as keyof MyInfoType;

    if (targetInputName === 'username') {
      setIsConfirmDuplicate(myInfo.username === value);
    }

    setNextMyInfo({ ...myInfo, [targetInputName]: value });
  };

  const confirmMyInfoHandler = () => {
    if (nextMyInfo.username === myInfo.username || isConfirmDuplicate) {
      submitHandler(nextMyInfo);
      return;
    }

    alert('닉네임 중복 확인을 해주세요.');
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_wrapper}>
        <div className={styles.left}>
          <input
            className={styles.nickname}
            name="username"
            value={nextMyInfo.username || ''}
            onChange={changeHandler}
          />
          <input
            name="departmentName"
            value={nextMyInfo.departmentName || ''}
            onChange={changeHandler}
          />
        </div>

        <Button
          className={styles.right}
          onClick={checkDuplicate}
          disabled={isConfirmDuplicate}
        >
          {isConfirmDuplicate ? '확인 완료' : '중복 확인'}
        </Button>
      </div>
      <div className={styles.textarea_wrapper}>
        <textarea
          name="selfIntroduction"
          value={nextMyInfo.selfIntroduction || ''}
          onChange={changeHandler}
          maxLength={200}
        />
        <p>
          <span className="gray">
            {nextMyInfo.selfIntroduction?.length || 0}
          </span>{' '}
          / 200
        </p>
      </div>
      <div className={styles.confirm_button_wrapper}>
        <Button onClick={confirmMyInfoHandler}>확인</Button>
        <Button fill="gray" onClick={toggleEditHandler}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default MyEditInformation;
