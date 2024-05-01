'use client';

import { HTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import * as Styles from './InterestCheckbox.css';

interface InterestCheckboxType extends HTMLAttributes<HTMLInputElement> {
  value: string;
}

const InterestCheckbox = ({ value, ...props }: InterestCheckboxType) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { register } = useFormContext();

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <label
      htmlFor={value}
      className={isChecked ? Styles.checkedBox : Styles.uncheckedBox}
      onChange={handleChange}
    >
      <input
        id={value}
        type="checkbox"
        value={value}
        {...props}
        {...register('interests')}
      />
      {`#${value}`}
    </label>
  );
};

export default InterestCheckbox;
