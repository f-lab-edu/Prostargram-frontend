import { InputHTMLAttributes, ReactNode, Ref, forwardRef } from 'react';
import * as Styles from './Input.css';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  state?: 'normal' | 'fail';
  variants?: 'border' | 'noneBorder';
  postfix?: ReactNode;
}

const Input = forwardRef(
  (
    {
      size = 'large',
      state = 'normal',
      postfix,
      variants,
      disabled,
      ...props
    }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <div
        className={Styles.wrapperStyles({
          state: disabled ? 'disabled' : state,
          size,
          variants,
        })}
      >
        <input
          className={Styles.inputStyle}
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
