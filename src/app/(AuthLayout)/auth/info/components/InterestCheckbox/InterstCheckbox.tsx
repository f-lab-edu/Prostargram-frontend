'use client';

import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { HTMLAttributes, useState } from 'react';

import styles from './InterestCheckbox.module.scss';

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
      className={clsx(styles.checkbox, {
        [styles.checked]: isChecked,
      })}
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
