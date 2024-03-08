import {
  useState,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
  HTMLAttributes,
} from 'react';
import { useFormContext } from 'react-hook-form';

import CircleClose from '@assets/icons/circle-close.svg?react';
import { REG_EXP } from '@constants/regExp';
import { calculateWidth } from '@utils/dynamicWidth';
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
  const isDuplicate = checkList.includes(word);

  const noticeDuplicateError = () =>
    setError('myInterests', {
      type: 'validate',
      message: '중복된 관심사입니다.',
    });

  const finishEditingMyInterest = () => {
    setIsEditing(false);
    clearErrors('myInterests');
  };

  const clickHandler = () => {
    if (!isEditing) {
      onRemove(index);
    }
  };

  const keyupHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      if (isDuplicate) {
        noticeDuplicateError();
        onRemove(index);
        return;
      }

      finishEditingMyInterest();
    }
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (!word.length) {
      onRemove(index);
      return;
    }

    if (isDuplicate) {
      noticeDuplicateError();
      onRemove(index);
      return;
    }

    finishEditingMyInterest();
    onBlur(e);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.trim();

    if (REG_EXP.ONLY_ENG_NUM.test(next)) {
      setIsWord(next);
    }

    onChange(e);
  };

  const preventSpacebar = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  return (
    <button
      type="button"
      className={isEditing ? Styles.editing : Styles.completed}
      onClick={clickHandler}
      onKeyUp={preventSpacebar}
    >
      <input
        {...formProps}
        {...props}
        type={isEditing ? 'text' : 'hidden'}
        value={word}
        className={Styles.myInterestInput}
        style={{ width: inputWidth }}
        maxLength={15}
        onChange={changeHandler}
        onBlur={blurHandler}
        onKeyUp={keyupHandler}
      />
      {!isEditing && (
        <>
          <CircleClose className={Styles.circleCloseIcon} />
          <span>#{word}</span>
        </>
      )}
    </button>
  );
};

export default MyInterestField;
