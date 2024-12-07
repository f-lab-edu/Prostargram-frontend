'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren, useEffect } from 'react';

import useTimer from '@/hooks/useTimer';
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
  isConfirm?: boolean;
  timerDuration: number;
  onClick?: () => void;
  changeState: () => void;
}

const TimerButton = ({
  isConfirm,
  timerDuration,
  onClick,
  changeState,
  ...props
}: TimerButtonProps) => {
  const { time, startTimer, changeTime, clearTimer } = useTimer({
    waitTime: timerDuration,
  });

  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
    changeTime(timerDuration);
    startTimer();
  };

  useEffect(() => {
    if (time <= 0) return;
    startTimer();
  }, [time, startTimer]);

  useEffect(() => {
    if (time > 0) return;

    changeState();
    clearTimer();
  }, [time, changeState, clearTimer]);

  useEffect(() => {
    if (isConfirm) {
      clearTimer();
    }
  }, [isConfirm, clearTimer]);

  return (
    <Button onClick={clickHandler} {...props}>
      {time <= 0 ? '재요청' : timeFormatter(time)}
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
