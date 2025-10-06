import React from 'react';

// React-specific utilities for performance optimization

// Dynamic imports for code splitting
export const loadComponent = (importFn) => {
  return React.lazy(() => importFn().catch(() => ({
    default: () => React.createElement('div', {
      className: 'p-4 text-center text-red-600'
    }, 'Failed to load component')
  })));
};

// Higher-order component for performance monitoring
export const withPerformanceMonitoring = (Component, componentName) => {
  return function WrappedComponent(props) {
    const startTime = performance.now();
    
    React.useEffect(() => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Performance: ${componentName} rendered in ${duration.toFixed(2)}ms`);
      }
    });
    
    return React.createElement(Component, props);
  };
};

// Hook for measuring component performance
export const usePerformanceMeasure = (componentName) => {
  const startTime = React.useRef(performance.now());
  
  React.useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${componentName} mounted in ${duration.toFixed(2)}ms`);
    }
  }, [componentName]);
  
  return startTime.current;
};

// Hook for measuring render performance
export const useRenderPerformance = (componentName) => {
  const renderCount = React.useRef(0);
  const startTime = React.useRef(performance.now());
  
  React.useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const duration = endTime - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${componentName} render #${renderCount.current} in ${duration.toFixed(2)}ms`);
    }
    
    startTime.current = performance.now();
  });
  
  return renderCount.current;
};

// Memoized component wrapper
export const withMemo = (Component, areEqual) => {
  return React.memo(Component, areEqual);
};

// Suspense wrapper with fallback
export const withSuspense = (Component, fallback = null) => {
  return function SuspenseWrapper(props) {
    return React.createElement(
      React.Suspense,
      { fallback: fallback || React.createElement('div', {
        className: 'p-4 text-center'
      }, 'Loading...') },
      React.createElement(Component, props)
    );
  };
};

export default {
  loadComponent,
  withPerformanceMonitoring,
  usePerformanceMeasure,
  useRenderPerformance,
  withMemo,
  withSuspense
};
