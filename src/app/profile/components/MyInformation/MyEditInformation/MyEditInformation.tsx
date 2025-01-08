'use client';

import { ChangeEvent, useState } from 'react';

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

  const checkDuplicate = () => {
    setIsConfirmDuplicate(true);
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    const target = e.target.name as keyof MyInfoType;

    if (target === 'nickname') {
      setIsConfirmDuplicate(false);
    }

    setNextMyInfo({ ...myInfo, [target]: value });
  };

  const confirmmMyInfoHandler = () => {
    if (isConfirmDuplicate) {
      toggleEditHandler();
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
            name="nickname"
            value={nextMyInfo.nickname}
            onChange={changeHandler}
          />
          <input
            name="currentState"
            value={nextMyInfo.currentState}
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
          name="description"
          value={nextMyInfo.description}
          onChange={changeHandler}
          maxLength={200}
        />
        <p>
          <span className="gray">{nextMyInfo.description.length}</span> / 200
        </p>
      </div>
      <div className={styles.confirm_button_wrapper}>
        <Button onClick={confirmmMyInfoHandler}>확인</Button>
        <Button fill="gray" onClick={toggleEditHandler}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default MyEditInformation;
