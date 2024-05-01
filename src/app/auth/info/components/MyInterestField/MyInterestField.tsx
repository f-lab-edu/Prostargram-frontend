'use client';

import {
  useState,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
  HTMLAttributes,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { REG_EXP } from '@/constants/regExp';
import { calculateWidth } from '@/utils/dynamicWidth';
import CircleCloseIcon from '@/assets/icons/circle-close.svg';
import { IAddionalInfoType } from '../../types/AdditionalInfoTypes';

import * as Styles from './MyInterestField.css';

interface MyInterestFieldProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onClick'> {
  index: number;
  checkList: string[];
  onRemove: (index: number) => void;
}

const MyInterestField = ({
  index,
  checkList,
  onRemove,
  ...props
}: MyInterestFieldProps) => {
  const [word, setIsWord] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const { register, setError, clearErrors } =
    useFormContext<IAddionalInfoType>();
  const { onChange, onBlur, ...formProps } = register(
    `myInterests.${index}.myInterest`,
  );

  const inputWidth = calculateWidth(word.length);

  const noticeDuplicateError = () =>
    setError('myInterests', {
      type: 'validate',
      message: '중복된 관심사입니다.',
    });

  const isDuplicate = () => {
    if (word !== '' && checkList.includes(word)) {
      noticeDuplicateError();
      onRemove(index);
      return true;
    }
    return false;
  };

  const clickHandler = () => {
    if (!isEditing) {
      onRemove(index);
    }
  };

  const keydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    if (isEditing && isDuplicate()) return;
    e.preventDefault();

    setIsEditing(false);
    clearErrors('myInterests');
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (!word.length) {
      onRemove(index);
      return;
    }
    if (isEditing && isDuplicate()) return;

    onBlur(e);
    setIsEditing(false);
    clearErrors('myInterests');
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.trim();

    if (REG_EXP.ONLY_ENG_NUM.test(next)) {
      setIsWord(() => next);
      onChange(e);
    }
  };

  return (
    <button
      type="button"
      className={isEditing ? Styles.editing : Styles.completed}
      onClick={clickHandler}
    >
      <input
        type={isEditing ? 'text' : 'hidden'}
        value={word}
        className={Styles.myInterestInput}
        style={{ width: inputWidth }}
        maxLength={15}
        onChange={changeHandler}
        onBlur={blurHandler}
        onKeyDown={keydownHandler}
        {...formProps}
        {...props}
      />
      {!isEditing && (
        <>
          <CircleCloseIcon />
          <span>#{word}</span>
        </>
      )}
    </button>
  );
};

export default MyInterestField;
