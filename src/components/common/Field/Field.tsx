import { PropsWithChildren } from 'react';

import CautionIcon from '@/assets/icons/caution.svg';
import Typo from '../Typo';

import * as Styles from './Field.css';

interface FieldProps extends PropsWithChildren {
  className?: string;
}

const Field = ({ className, children }: FieldProps) => {
  return (
    <div className={`${Styles.fieldContainer} ${className}`}>{children}</div>
  );
};

interface FieldLabelProps extends PropsWithChildren {
  htmlFor?: string;
  className?: string;
}

const FieldLabel = ({ htmlFor, className, children }: FieldLabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`${Styles.label} ${className}`}>
      {children}
    </label>
  );
};

interface FieldEmphasizeProps extends PropsWithChildren {}

const FieldEmphasize = ({ children }: FieldEmphasizeProps) => {
  return <em className={Styles.emphasize}>{children}</em>;
};

interface FieldBoxProps extends PropsWithChildren {
  className?: string;
}

const FieldBox = ({ className, children }: FieldBoxProps) => {
  return <div className={`${Styles.fieldBox} ${className}`}>{children}</div>;
};

interface FieldErrorMessageProps extends PropsWithChildren {}

const FieldErrorMessage = ({ children }: FieldErrorMessageProps) => {
  if (!children) return null;

  return (
    <div className={Styles.errorMessage}>
      <CautionIcon />
      <Typo as="span" fontSize="body-12" color="red">
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
