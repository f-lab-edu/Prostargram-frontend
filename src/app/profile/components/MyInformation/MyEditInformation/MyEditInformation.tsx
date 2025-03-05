'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

import { getFormData } from '@/utils/form';
import Button from '@/components/common/Button';
import { useToastContext } from '@/components/common/Toast/ToastProvider';
import { useConfirmUsernameDuplicate } from '@/api/mutations/sign-up';
import type { MyInfoType } from '../MyInformation';

import styles from './MyEditInformation.module.scss';

interface MyEditInformationProps {
  myInfo: MyInfoType;
  toggleEditHandler: () => void;
  onSubmitNextInfo: (nextInfo: MyInfoType) => void;
}

const MyEditInformation = ({
  myInfo,
  toggleEditHandler,
  onSubmitNextInfo,
}: MyEditInformationProps) => {
  const { addToast } = useToastContext();
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(myInfo.username);
  const [selfIntroduction, setSelfIntroduction] = useState<string>(
    myInfo.selfIntroduction,
  );

  const { mutate: checkIsDuplicateUsername } = useConfirmUsernameDuplicate();

  const checkDuplicate = () => {
    checkIsDuplicateUsername(username, {
      onSuccess: (res) => {
        setIsDuplicate(!res.isSuccess);
      },
    });
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;

    if (name === 'username') {
      setIsDuplicate(value !== '' && myInfo.username !== value);
      setUsername(value);
    }

    if (name === 'selfIntroduction') {
      setSelfIntroduction(value);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nextInfo: MyInfoType = getFormData<keyof MyInfoType>(formData);

    if (!isDuplicate) {
      onSubmitNextInfo(nextInfo);
      return;
    }

    addToast({ type: 'error', message: '닉네임 중복 확인을 실행 해 주세요.' });
  };

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <div className={styles.input_wrapper}>
        <div className={styles.left}>
          <input
            name="username"
            defaultValue={username || ''}
            onChange={changeHandler}
            className={styles.nickname}
          />
          <input
            name="departmentName"
            defaultValue={myInfo.departmentName || ''}
          />
        </div>

        <Button
          type="button"
          className={styles.right}
          onClick={checkDuplicate}
          disabled={!isDuplicate}
        >
          {!isDuplicate ? '확인 완료' : '중복 확인'}
        </Button>
      </div>
      <div className={styles.textarea_wrapper}>
        <textarea
          name="selfIntroduction"
          defaultValue={myInfo.selfIntroduction || ''}
          onChange={changeHandler}
          maxLength={200}
        />
        <div className={styles.character_count}>
          <span className={styles.gray}>{selfIntroduction?.length || 0}</span> /
          200
        </div>
      </div>
      <div className={styles.confirm_button_wrapper}>
        <Button type="submit">확인</Button>
        <Button type="button" fill="gray" onClick={toggleEditHandler}>
          취소
        </Button>
      </div>
    </form>
  );
};

export default MyEditInformation;
