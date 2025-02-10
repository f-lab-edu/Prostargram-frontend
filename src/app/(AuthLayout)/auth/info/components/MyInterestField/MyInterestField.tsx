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
  onRemove: (id: string) => void;
  updateUserInterest: (field: UserInterestType) => void;
}

const MyInterestField = ({
  field,
  onRemove,
  updateUserInterest,
  ...props
}: MyInterestFieldProps) => {
  const [word, setIsWord] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputWidth = calculateWidth(word.length);

  const updateInterest = () => {
    updateUserInterest({ id: field.id, interestName: word });
    setIsEditing(false);
  };

  const clickHandler = () => {
    if (!isEditing) {
      onRemove(field.id);
    }
  };

  const keydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();

    updateInterest();
  };

  const blurHandler = () => {
    if (!word.length) {
      onRemove(field.id);
      return;
    }

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
