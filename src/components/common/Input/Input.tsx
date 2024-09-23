import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode, Ref, forwardRef } from 'react';

import styles from './Input.module.scss';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium';
  state?: 'normal' | 'fail';
  variants?: 'border' | 'noneBorder';
  postfix?: ReactNode;
}

const Input = forwardRef(
  (
    {
      size = 'medium',
      state = 'normal',
      postfix,
      variants = 'border',
      disabled,
      ...props
    }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <div
        className={clsx(
          styles.wrapper,
          styles[size],
          styles[state],
          styles[variants],
          {
            [styles.disabled]: disabled,
          },
        )}
      >
        <input
          className={styles.input}
          autoComplete="off"
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {postfix}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
