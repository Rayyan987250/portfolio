'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // In production, you might want to log this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-aer-bg-primary">
          <div className="text-center space-y-6 p-8">
            <h1 className="text-4xl aer-headline text-aer-text-primary">
              Something went wrong
            </h1>
            <p className="aer-body text-aer-text-secondary max-w-md">
              We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="space-x-4">
              <button
                onClick={this.resetError}
                className="aer-button-primary px-6 py-3 rounded-none"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="aer-button-secondary px-6 py-3 rounded-none"
              >
                Refresh Page
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer aer-ui-text text-aer-text-muted">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-4 p-4 bg-aer-bg-secondary border border-aer-border-subtle text-xs text-aer-text-secondary overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;