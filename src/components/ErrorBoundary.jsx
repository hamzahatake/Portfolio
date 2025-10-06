import React from 'react';
import { errorHandler } from '../utils/errorHandler';

// Error Boundary Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    errorHandler.logError(error, {
      component: this.props.componentName || 'Unknown',
      errorInfo,
      props: this.props
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            {errorHandler.getUserFriendlyMessage(this.state.error)}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="btn-primary px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = (Component, fallbackComponent) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary 
        componentName={Component.name}
        fallback={fallbackComponent}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

export default ErrorBoundary;
