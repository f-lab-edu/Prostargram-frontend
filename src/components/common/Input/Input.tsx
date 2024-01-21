import { InputHTMLAttributes, ReactNode, Ref, forwardRef } from 'react';
import * as Styles from './Input.css';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium';
  state?: 'normal' | 'fail';
  variants?: 'border' | 'noneBorder';
  postfix?: ReactNode;
}

const Input = forwardRef(
  (
    { size, state, postfix, variants, ...props }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <div
        className={Styles.wrapperStyles({
          state,
          size,
          variants,
        })}
      >
        <input className={Styles.inputStyle} ref={ref} {...props} />
        {postfix}
      </div>
    );
  },
);

Input.defaultProps = {
  size: 'small',
  state: 'normal',
  variants: 'border',
  postfix: undefined,
};

export default Input;
