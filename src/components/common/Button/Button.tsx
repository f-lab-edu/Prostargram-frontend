import { ButtonHTMLAttributes } from 'react';
import * as Styles from './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  fill?: 'blue' | 'red' | 'gray';
}

const Button = ({ children, fill, size, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={Styles.buttonStyle({
        fill,
        size,
        disabled,
      })}
      disabled={disabled}
      {...props}
    >
      {disabled ? '로딩' : children}
    </button>
  );
};

Button.defaultProps = {
  fill: 'blue',
  size: 'small',
};

export default Button;
