import {
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  forwardRef,
} from 'react';

import Image from 'next/image';
import Input from '../Input';
import Typo from '../Typo';
import * as Styles from './InputField.css';

interface InputFieldProps extends HTMLAttributes<HTMLInputElement> {
  id: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  maxLength?: InputHTMLAttributes<HTMLInputElement>['maxLength'];
  placeholder?: string;
  errorMessage?: string;
  labelPrefix?: ReactNode;
  inputPostFix?: ReactNode;
  size?: 'small' | 'medium';
  variants?: 'border' | 'noneBorder';
}

const InputField = forwardRef(
  (
    {
      id,
      name,
      placeholder,
      label,
      type,
      errorMessage,
      labelPrefix,
      inputPostFix,
      size,
      variants,
      ...props
    }: InputFieldProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <div className={Styles.container}>
        <label htmlFor={id} className={Styles.label}>
          {labelPrefix}
          {label}
        </label>

        <Input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          size={size}
          state={errorMessage ? 'fail' : 'normal'}
          variants={variants}
          postfix={inputPostFix}
          {...props}
        />

        {errorMessage && (
          <div className={Styles.inputWrapper}>
            <Image
              src="assets/icons/caution.svg"
              width="16"
              height="16"
              alt="caution-image"
            />
            <Typo as="span" fontSize="body-12" color="red">
              {errorMessage}
            </Typo>
          </div>
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
