'use client';

import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

import styles from './Toast.module.scss';

type ToastType = 'success' | 'error' | 'info';

const animationSet = {
  'run-from-right': styles.run_from_right,
  'fade-out': styles.fade_out,
} as const;

const toastColorSet: Record<ToastType, string> = {
  success: styles.blue,
  error: styles.red,
  info: styles.yellow,
};

interface ToastItemProps {
  children?: ReactNode;
  id: string;
  type?: 'success' | 'error' | 'info';
  autoClose?: number;
  removeToast: (id: string) => void;
}

const ToastItem = ({
  children,
  id,
  type = 'success',
  autoClose = 2000,
  removeToast,
}: ToastItemProps) => {
  const [animationTrigger, setAnimationTrigger] =
    useState<keyof typeof animationSet>('run-from-right');

  useEffect(() => {
    setTimeout(() => {
      setAnimationTrigger('fade-out');

      setTimeout(() => removeToast(id), autoClose);
    }, autoClose);
  }, [id, autoClose, removeToast]);

  return (
    <li
      className={clsx([
        styles.item,
        animationSet[animationTrigger],
        toastColorSet[type],
      ])}
    >
      <p className={styles.message}>{children}</p>
      <div className={styles.guage} />
    </li>
  );
};

export default ToastItem;
