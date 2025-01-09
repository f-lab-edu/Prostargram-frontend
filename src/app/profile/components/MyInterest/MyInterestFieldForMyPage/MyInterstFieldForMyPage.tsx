'use client';

import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  HTMLAttributes,
  useRef,
  useEffect,
} from 'react';

import { REG_EXP } from '@/constants/regExp';
import { calculateWidth } from '@/utils/dynamicWidth';

import styles from './MyInterestFieldForMyPage.module.scss';

interface MyInterestFieldForMyPageProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onClick'> {
  checkList: string[];
  addInterestHandler: (interest: string) => void;
}

const MyInterestFieldForMyPage = ({
  checkList,
  addInterestHandler,
  ...props
}: MyInterestFieldForMyPageProps) => {
  const [isInterestEdit, setInterestEdit] = useState<boolean>(false);
  const [word, setWord] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const inputWidth = calculateWidth(word.length);

  const isDuplicate = () => {
    if (word !== '' && checkList.includes(word)) {
      return true;
    }
    return false;
  };

  const isInterestEditOn = () => {
    if (!isInterestEdit) {
      setInterestEdit(true);
    }
  };

  const keydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    if (isInterestEdit && isDuplicate()) return;
    e.preventDefault();

    if (word.length !== 0) {
      addInterestHandler(word);
    }

    setWord('');
    setInterestEdit(false);
  };

  const blurHandler = () => {
    if (isInterestEdit && isDuplicate()) return;

    if (word.length !== 0) {
      addInterestHandler(word);
    }

    setWord('');
    setInterestEdit(false);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.trim();

    if (REG_EXP.ONLY_ENG_NUM.test(next)) {
      setWord(() => next);
    }
  };

  useEffect(() => {
    if (isInterestEdit) {
      inputRef.current?.focus();
    }
  }, [isInterestEdit]);

  return (
    <>
      {isInterestEdit && (
        <input
          ref={inputRef}
          className={styles.interest_input}
          value={word}
          style={{ width: inputWidth }}
          onChange={changeHandler}
          onKeyDown={keydownHandler}
          onBlur={blurHandler}
          maxLength={15}
          {...props}
        />
      )}
      <button className={styles.plus_button} onClick={isInterestEditOn}>
        +
      </button>
    </>
  );
};

export default MyInterestFieldForMyPage;
