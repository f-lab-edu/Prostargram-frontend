import {
  useState,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
  HTMLAttributes,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { REG_EXP } from '@constants/regExp';
import { calculateWidth } from '@utils/dynamicWidth';

import CircleClose from '@assets/icons/circle-close.svg?react';
import * as Styles from './MyInterestField.css';

interface MyInterestFieldProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onClick'> {
  index: number;
  removeHandler: (index: number) => void;
}

const MyInterestField = ({
  index,
  removeHandler,
  ...props
}: MyInterestFieldProps) => {
  const [word, setIsWord] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const { register } = useFormContext();
  const { onChange, onBlur, ...formProps } = register(
    `myInterests.${index}.myInterest`,
  );

  const clickHandler = () => {
    if (!isEditing) {
      removeHandler(index);
    }
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (!word.length) {
      removeHandler(index);
      return;
    }

    if (onBlur) {
      onBlur(e);
    }

    setIsEditing(false);
  };

  const keyupHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      setIsEditing(false);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.trim();

    if (REG_EXP.ONLY_ENG_NUM.test(next)) {
      setIsWord(next);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const preventSpacebar = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const inputWidth = calculateWidth(word.length);

  return (
    <button
      type="button"
      className={isEditing ? Styles.inputEditing : Styles.inputCompleted}
      onClick={clickHandler}
      onKeyDown={preventSpacebar}
    >
      <input
        {...formProps}
        {...props}
        type={isEditing ? 'text' : 'hidden'}
        value={word}
        className={Styles.input}
        style={{ width: inputWidth }}
        maxLength={15}
        onChange={changeHandler}
        onBlur={blurHandler}
        onKeyUp={keyupHandler}
      />
      {!isEditing && (
        <>
          <CircleClose className={Styles.circleX} />
          <span>#{word}</span>
        </>
      )}
    </button>
  );
};

export default MyInterestField;
