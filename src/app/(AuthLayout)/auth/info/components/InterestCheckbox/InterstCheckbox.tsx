'use client';

import clsx from 'clsx';
import { HTMLAttributes, useEffect, useState } from 'react';

import styles from './InterestCheckbox.module.scss';

interface InterestCheckboxType extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  isMax: boolean;
  isCheckedInterest?: boolean;
  onClickWithChecked: () => void;
  onClickWithUnchecked: () => void;
}

const InterestCheckbox = ({
  value,
  isMax,
  isCheckedInterest,
  onClickWithChecked,
  onClickWithUnchecked,
  ...props
}: InterestCheckboxType) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(
    isCheckedInterest,
  );

  const clickHandler = () => {
    if (!isChecked && isMax === false) {
      onClickWithUnchecked();
      setIsChecked(true);
    }
    if (!isChecked && isMax === true) {
      setIsChecked(false);
    }
    if (isChecked && isMax === false) {
      setIsChecked(false);
      onClickWithChecked();
    }
    if (isChecked && isMax === true) {
      setIsChecked(false);
      onClickWithChecked();
    }
  };

  useEffect(() => {
    setIsChecked(isCheckedInterest);
  }, [isCheckedInterest]);

  return (
    <button
      type="button"
      className={clsx(styles.checkbox, {
        [styles.checked]: isChecked,
      })}
      onClick={clickHandler}
      {...props}
    >
      {`#${value}`}
    </button>
  );
};

export default InterestCheckbox;
