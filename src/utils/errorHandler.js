// Error Types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTHENTICATION: 'AUTH_ERROR',
  AUTHORIZATION: 'AUTHZ_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Error Handler Class
export class ErrorHandler {
  constructor() {
    this.errorLog = [];
    this.maxLogSize = 100;
  }

  // Log error with context
  logError(error, context = {}) {
    const errorEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      message: error.message || 'Unknown error',
      stack: error.stack,
      type: this.getErrorType(error),
      context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.errorLog.unshift(errorEntry);
    
    // Keep only the latest errors
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(0, this.maxLogSize);
    }

    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      this.reportError(errorEntry);
    }

    console.error('Error logged:', errorEntry);
  }

  // Determine error type
  getErrorType(error) {
    if (error.name === 'NetworkError' || error.message.includes('fetch')) {
      return ERROR_TYPES.NETWORK;
    }
    if (error.name === 'ValidationError') {
      return ERROR_TYPES.VALIDATION;
    }
    if (error.name === 'AuthenticationError') {
      return ERROR_TYPES.AUTHENTICATION;
    }
    if (error.name === 'AuthorizationError') {
      return ERROR_TYPES.AUTHORIZATION;
    }
    if (error.status === 404) {
      return ERROR_TYPES.NOT_FOUND;
    }
    if (error.status >= 500) {
      return ERROR_TYPES.SERVER;
    }
    return ERROR_TYPES.UNKNOWN;
  }

  // Report error to external service
  reportError(errorEntry) {
    // Example: Send to error tracking service
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorEntry)
    // }).catch(console.error);
  }

  // Get user-friendly error message
  getUserFriendlyMessage(error) {
    const type = this.getErrorType(error);
    
    const messages = {
      [ERROR_TYPES.NETWORK]: 'Unable to connect. Please check your internet connection and try again.',
      [ERROR_TYPES.VALIDATION]: 'Please check your input and try again.',
      [ERROR_TYPES.AUTHENTICATION]: 'Please log in to continue.',
      [ERROR_TYPES.AUTHORIZATION]: 'You don\'t have permission to perform this action.',
      [ERROR_TYPES.NOT_FOUND]: 'The requested resource was not found.',
      [ERROR_TYPES.SERVER]: 'Something went wrong on our end. Please try again later.',
      [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred. Please try again.'
    };

    return messages[type] || messages[ERROR_TYPES.UNKNOWN];
  }

  // Get error severity
  getErrorSeverity(error) {
    const type = this.getErrorType(error);
    
    const severity = {
      [ERROR_TYPES.NETWORK]: 'medium',
      [ERROR_TYPES.VALIDATION]: 'low',
      [ERROR_TYPES.AUTHENTICATION]: 'high',
      [ERROR_TYPES.AUTHORIZATION]: 'high',
      [ERROR_TYPES.NOT_FOUND]: 'low',
      [ERROR_TYPES.SERVER]: 'high',
      [ERROR_TYPES.UNKNOWN]: 'medium'
    };

    return severity[type] || 'medium';
  }

  // Get recent errors
  getRecentErrors(limit = 10) {
    return this.errorLog.slice(0, limit);
  }

  // Clear error log
  clearLog() {
    this.errorLog = [];
  }
}

// Global error handler instance
export const errorHandler = new ErrorHandler();

// Note: Error Boundary components should be created in separate .jsx files
// This utility file contains only pure JavaScript functions

// Async Error Handler
export const withAsyncErrorHandling = (asyncFunction) => {
  return async (...args) => {
    try {
      return await asyncFunction(...args);
    } catch (error) {
      errorHandler.logError(error, {
        function: asyncFunction.name,
        args: args.length
      });
      throw error;
    }
  };
};

// Retry Mechanism
export const withRetry = (fn, maxRetries = 3, delay = 1000) => {
  return async (...args) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          errorHandler.logError(error, {
            function: fn.name,
            attempts: attempt,
            maxRetries
          });
          throw error;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    
    throw lastError;
  };
};

// Network Error Handler
export const handleNetworkError = (error) => {
  if (!navigator.onLine) {
    return {
      type: 'offline',
      message: 'You appear to be offline. Please check your connection.',
      action: 'retry'
    };
  }
  
  if (error.name === 'AbortError') {
    return {
      type: 'timeout',
      message: 'Request timed out. Please try again.',
      action: 'retry'
    };
  }
  
  return {
    type: 'network',
    message: 'Network error. Please try again.',
    action: 'retry'
  };
};

// Validation Error Handler
export const handleValidationError = (error) => {
  if (error.errors) {
    return {
      type: 'validation',
      message: 'Please fix the following errors:',
      details: error.errors,
      action: 'fix'
    };
  }
  
  return {
    type: 'validation',
    message: error.message || 'Invalid input provided.',
    action: 'fix'
  };
};

// Error Recovery Strategies
export const getRecoveryStrategy = (error) => {
  const type = errorHandler.getErrorType(error);
  
  const strategies = {
    [ERROR_TYPES.NETWORK]: {
      action: 'retry',
      message: 'Retry the operation',
      autoRetry: true,
      maxRetries: 3
    },
    [ERROR_TYPES.VALIDATION]: {
      action: 'fix',
      message: 'Please correct the input',
      autoRetry: false
    },
    [ERROR_TYPES.AUTHENTICATION]: {
      action: 'login',
      message: 'Please log in again',
      autoRetry: false,
      redirect: '/login'
    },
    [ERROR_TYPES.AUTHORIZATION]: {
      action: 'contact',
      message: 'Contact support for access',
      autoRetry: false
    },
    [ERROR_TYPES.NOT_FOUND]: {
      action: 'navigate',
      message: 'Go back to previous page',
      autoRetry: false,
      redirect: -1
    },
    [ERROR_TYPES.SERVER]: {
      action: 'retry',
      message: 'Try again later',
      autoRetry: true,
      maxRetries: 2,
      delay: 5000
    }
  };
  
  return strategies[type] || strategies[ERROR_TYPES.UNKNOWN];
};

export default {
  ErrorHandler,
  errorHandler,
  withAsyncErrorHandling,
  withRetry,
  handleNetworkError,
  handleValidationError,
  getRecoveryStrategy,
  ERROR_TYPES
};
