/// <reference types="vite-plugin-svgr/client" />

import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import CautionIcon from '@assets/icons/caution.svg?react';

import Input from '../Input';
import Typo from '../Typo';
import * as Styles from './InputField.css';

interface InputFieldProps {
  id: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label: string;
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
    }: InputFieldProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const [inputValue, setInputValue] = useState('');
    const [errorState, setErrorState] = useState(false);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (errorState) {
        setErrorState(false);
      }
    };

    useEffect(() => {
      if (errorMessage) {
        setErrorState(true);
      }
    }, [errorMessage]);

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
          value={inputValue}
          onChange={changeHandler}
          ref={ref}
          size={size}
          state={errorState ? 'fail' : 'normal'}
          variants={variants}
          postfix={inputPostFix}
        />

        {errorState && (
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
