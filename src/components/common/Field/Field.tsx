'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren, useEffect } from 'react';

import useTimer from '@/hooks/useTimer';
import { ConfirmStateType } from '@/hooks/useSignUpState';
import { timeFormatter } from '@/utils/formatter';
import CautionIcon from '@/assets/icons/caution.svg';
import Typo from '../Typo';
import Button from '../Button';

import styles from './Field.module.scss';

interface FieldProps extends PropsWithChildren {
  className?: string;
}

const Field = ({ className, children }: FieldProps) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};

interface FieldLabelProps extends PropsWithChildren {
  htmlFor?: string;
  className?: string;
}

const FieldLabel = ({ htmlFor, className, children }: FieldLabelProps) => {
  return (
    <label htmlFor={htmlFor} className={clsx(styles.label, className)}>
      {children}
    </label>
  );
};

interface FieldEmphasizeProps extends PropsWithChildren {}

const FieldEmphasize = ({ children }: FieldEmphasizeProps) => {
  return <em className={styles.emphasize}>{children}</em>;
};

interface FieldBoxProps extends PropsWithChildren {
  className?: string;
}

const FieldBox = ({ className, children }: FieldBoxProps) => {
  return <div className={clsx(styles.field_box, className)}>{children}</div>;
};

interface FieldErrorMessageProps extends PropsWithChildren {}

const FieldErrorMessage = ({ children }: FieldErrorMessageProps) => {
  if (!children) return null;

  return (
    <div className={styles.error}>
      <CautionIcon />
      <Typo as="span" fontSize="body-12" color="red">
        {children}
      </Typo>
    </div>
  );
};

interface FieldTimerButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  onClick: (callback?: () => void) => void;
  startTimeForMilliseconds: number;
  changeConfirmState: (state: ConfirmStateType) => void;
}

const FieldTimerButton = ({
  children,
  onClick,
  startTimeForMilliseconds,
  changeConfirmState,
  ...props
}: FieldTimerButtonProps) => {
  const { time, startTimer } = useTimer({
    waitTime: startTimeForMilliseconds,
  });

  const clickHandler = () => {
    if (onClick) {
      onClick(startTimer);
    }
  };

  useEffect(() => {
    if (time > 0) return;

    console.log(time);
    changeConfirmState('PENDING');
  }, [time, changeConfirmState]);

  return (
    <Button onClick={clickHandler} {...props}>
      {startTimeForMilliseconds !== time ? timeFormatter(time) : children}
    </Button>
  );
};

Field.FieldLabel = FieldLabel;
Field.FieldEmphasize = FieldEmphasize;
Field.FieldBox = FieldBox;
Field.FieldErrorMessage = FieldErrorMessage;
Field.FieldTimerButton = FieldTimerButton;

export default Field;
