import { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Button from '../Button';

import styles from './LocalQueryErrorBoundary.module.scss';

interface ErrorComponentProps extends FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorComponent = (props: ErrorComponentProps) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div className={styles.error_box}>
      <p className={styles.error_message}>{error?.message}</p>
      <Button type="button" fill="gray" onClick={resetErrorBoundary}>
        돌아가기
      </Button>
    </div>
  );
};

interface LocalQueryErrorBoundaryProps {
  children?: ReactNode;
  fallback?: (props: FallbackProps) => ReactNode;
}

const LocalQueryErrorBoundary = ({
  children,
  fallback = ErrorComponent,
}: LocalQueryErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallbackRender={fallback} onReset={reset}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default LocalQueryErrorBoundary;
