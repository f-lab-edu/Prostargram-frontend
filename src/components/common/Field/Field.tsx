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

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container = ({ className, children }: ContainerProps) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};

interface LabelProps extends PropsWithChildren {
  htmlFor?: string;
  className?: string;
}

const Label = ({ htmlFor, className, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={clsx(styles.label, className)}>
      {children}
    </label>
  );
};

interface EmphasizeProps extends PropsWithChildren {}

const Emphasize = ({ children }: EmphasizeProps) => {
  return <em className={styles.emphasize}>{children}</em>;
};

interface BoxProps extends PropsWithChildren {
  className?: string;
}

const Box = ({ className, children }: BoxProps) => {
  return <div className={clsx(styles.field_box, className)}>{children}</div>;
};

interface ErrorMessageProps extends PropsWithChildren {}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
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

interface TimerButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  onClick: (callback?: () => void) => void;
  startTimeForMilliseconds: number;
  changeConfirmState: (state: ConfirmStateType) => void;
}

const TimerButton = ({
  children,
  startTimeForMilliseconds,
  onClick,
  changeConfirmState,
  ...props
}: TimerButtonProps) => {
  const { time, startTimer, changeTime } = useTimer({
    waitTime: startTimeForMilliseconds,
  });

  const clickHandler = () => {
    if (onClick) {
      onClick(startTimer);
    }
  };

  useEffect(() => {
    if (time > 0) return;

    changeConfirmState('retry');
    changeTime(startTimeForMilliseconds);
  }, [time, startTimeForMilliseconds, changeConfirmState, changeTime]);

  return (
    <Button onClick={clickHandler} {...props}>
      {startTimeForMilliseconds >= 0 && startTimeForMilliseconds <= time
        ? children
        : timeFormatter(time)}
    </Button>
  );
};

const Field = Object.assign(Container, {
  Label,
  Emphasize,
  Box,
  ErrorMessage,
  TimerButton,
});

export default Field;
