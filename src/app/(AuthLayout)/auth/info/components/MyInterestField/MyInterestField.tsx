'use client';

import clsx from 'clsx';
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
import CircleCloseIcon from '@/assets/icons/circle-close.svg';

import styles from './MyInterestField.module.scss';

type UserInterestType = { id: string; interestName: string };

interface MyInterestFieldProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onClick'> {
  field: UserInterestType;
  checkList: string[];
  onRemove: (id: string) => void;
  changeError: (boolean: boolean) => void;
  updateUserInterest: (field: UserInterestType) => void;
}

const MyInterestField = ({
  field,
  checkList,
  onRemove,
  changeError,
  updateUserInterest,
  ...props
}: MyInterestFieldProps) => {
  const [word, setIsWord] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputWidth = calculateWidth(word.length);

  const noticeDuplicateError = () => changeError(true);

  const isDuplicate = () => {
    if (word !== '' && checkList.includes(word)) {
      noticeDuplicateError();
      onRemove(field.id);
      return true;
    }
    return false;
  };

  const updateInterest = () => {
    updateUserInterest({ id: field.id, interestName: word });
    setIsEditing(false);
    changeError(false);
  };

  const clickHandler = () => {
    if (!isEditing) {
      onRemove(field.id);
    }
  };

  const keydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    if (isEditing && isDuplicate()) return;
    e.preventDefault();

    updateInterest();
  };

  const blurHandler = () => {
    if (!word.length) {
      onRemove(field.id);
      return;
    }
    if (isEditing && isDuplicate()) return;

    updateInterest();
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.trim();

    if (REG_EXP.ONLY_ENG_NUM.test(next)) {
      setIsWord(() => next);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <button
      type="button"
      className={clsx(styles.button, {
        [styles.editing]: isEditing,
        [styles.completed]: !isEditing,
      })}
      onClick={clickHandler}
    >
      <input
        type={isEditing ? 'text' : 'hidden'}
        ref={inputRef}
        value={word}
        className={styles.input}
        style={{ width: inputWidth }}
        maxLength={15}
        onChange={changeHandler}
        onBlur={blurHandler}
        onKeyDown={keydownHandler}
        {...props}
      />
      {!isEditing && (
        <>
          <CircleCloseIcon className={styles.close_icon} />
          <span>#{word}</span>
        </>
      )}
    </button>
  );
};

export default MyInterestField;
