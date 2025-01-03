'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import Portal from '../../Portal/Portal';
import ToastItem from '../Toast';

import styles from './ToastProvider.module.scss';

interface ToastType {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface IToastContext {
  addToast: (message: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<IToastContext | null>(null);

const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext can't refer ToastProvider ");
  }

  return context;
};

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(({ type, message }: Omit<ToastType, 'id'>) => {
    setToasts((prev) => [
      ...prev,
      {
        id: Math.floor(Math.random() * 100_000_000).toString(),
        type,
        message,
      },
    ]);
  }, []);

  const removeToast = useCallback((targetId: string) => {
    setToasts((prev) => prev.filter(({ id }) => targetId !== id));
  }, []);

  const contextValues = useMemo(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={contextValues}>
      {children}
      <Portal>
        {toasts.length === 0 && (
          <ul className={styles.container}>
            {toasts.map(({ id, type, message }) => (
              <ToastItem key={id} id={id} type={type} removeToast={removeToast}>
                {message}
              </ToastItem>
            ))}
          </ul>
        )}
      </Portal>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export { useToastContext };
export type { ToastType };
