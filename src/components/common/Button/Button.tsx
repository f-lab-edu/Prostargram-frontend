import { ButtonHTMLAttributes } from 'react';

import * as Styles from './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
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
      className={[
        Styles.buttonStyle({
          fill,
          size,
          disabled,
        }),
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
