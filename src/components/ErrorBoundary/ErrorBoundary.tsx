import React, { Component, ReactNode } from 'react';
import {
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  ReloadButton
} from './ErrorBoundary.styles';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Security Platform Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Security Platform Error</ErrorTitle>
          <ErrorMessage>Something went wrong. Please refresh the page.</ErrorMessage>
          <ReloadButton onClick={() => window.location.reload()}>
            Reload Application
          </ReloadButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}