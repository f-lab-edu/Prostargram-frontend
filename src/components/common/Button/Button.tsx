import { ButtonHTMLAttributes } from 'react';

import * as Styles from './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  fill?: 'blue' | 'red' | 'gray';
  className?: string;
}

const Button = ({
  children,
  fill,
  size,
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

Button.defaultProps = {
  fill: 'blue',
  size: 'large',
};

export default Button;
