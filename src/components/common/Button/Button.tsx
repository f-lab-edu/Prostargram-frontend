import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'none' | 'small' | 'medium' | 'large';
  fill?: 'blue' | 'red' | 'white' | 'gray';
  className?: string;
}

const Button = ({
  children,
  fill = 'blue',
  size = 'large',
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[size],
        styles[fill],
        {
          disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
