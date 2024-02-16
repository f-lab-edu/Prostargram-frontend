import { PropsWithChildren } from 'react';

import CautionIcon from '@assets/icons/caution.svg?react';
import Typo from '../Typo';

import * as Styles from './Field.css';

interface FieldProps extends PropsWithChildren {}

const Field = ({ children }: FieldProps) => {
  return <div className={Styles.fieldContainer}>{children}</div>;
};

interface FieldLabelProps extends PropsWithChildren {
  htmlFor?: string;
}

const FieldLabel = ({ htmlFor, children }: FieldLabelProps) => {
  return (
    <label htmlFor={htmlFor} className={Styles.label}>
      {children}
    </label>
  );
};

interface FieldEmphasizeProps extends PropsWithChildren {}

const FieldEmphasize = ({ children }: FieldEmphasizeProps) => {
  return <em className={Styles.emphasize}>{children}</em>;
};

interface FieldBoxProps extends PropsWithChildren {}

const FieldBox = ({ children }: FieldBoxProps) => {
  return <div className={Styles.fieldBox}>{children}</div>;
};

interface FieldErrorMessageProps extends PropsWithChildren {}

const FieldErrorMessage = ({ children }: FieldErrorMessageProps) => {
  if (!children) return null;

  return (
    <div className={Styles.errorMessage}>
      <CautionIcon />
      <Typo fontSize="body-12" color="red">
        {children}
      </Typo>
    </div>
  );
};

Field.FieldLabel = FieldLabel;
Field.FieldEmphasize = FieldEmphasize;
Field.FieldBox = FieldBox;
Field.FieldErrorMessage = FieldErrorMessage;

export default Field;
