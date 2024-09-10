import {
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  forwardRef,
} from 'react';

import CautionIcon from '@/assets/icons/caution.svg';
import Input from '../Input';
import Typo from '../Typo';

import styles from './InputField.module.scss';

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
      <div className={styles.container}>
        <label htmlFor={id} className={styles.label}>
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
          <div className={styles.caution_wrapper}>
            <CautionIcon width="16" height="16" alt="caution-image" />
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
