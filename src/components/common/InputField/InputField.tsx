/// <reference types="vite-plugin-svgr/client" />

import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  forwardRef,
} from 'react';
import CautionIcon from '@assets/icons/caution.svg?react';

import Input from '../Input';
import Typo from '../Typo';
import * as Styles from './InputField.css';

interface InputFieldProps {
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
            <CautionIcon />
            <Typo fontSize="body-12" color="red">
              {errorMessage}
            </Typo>
          </div>
        )}
      </div>
    );
  },
);

export default InputField;
