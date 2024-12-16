import { AxiosError } from 'axios';
import React from 'react';

interface ErrorBoundaryFallbackProps {
  reset: () => void;
  error: AxiosError;
}

interface ErrorBoundaryProps {
  fallbackComponent: (props: ErrorBoundaryFallbackProps) => React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: AxiosError | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(
      'Error caught by ErrorBoundary componentDidCatch',
      error,
      errorInfo,
    );
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { fallbackComponent, children } = this.props;

    if (hasError && error) {
      return fallbackComponent({ reset: this.resetError, error });
    }

    return children;
  }
}

export default ErrorBoundary;
