import { motion } from 'framer-motion';
import { FaSpinner, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    gray: 'text-gray-500'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} ${colorClasses[color]}`}
    >
      <FaSpinner className="w-full h-full" />
    </motion.div>
  );
};

// Skeleton Loader Component
export const SkeletonLoader = ({ 
  variant = 'text', 
  width = '100%', 
  height = '1rem',
  className = '',
  lines = 1 
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded';
  
  if (variant === 'text') {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} mb-2`}
            style={{ 
              width: index === lines - 1 ? '75%' : width,
              height 
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`${baseClasses} ${className}`} style={{ width, height }}>
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded mb-2" />
          <div className="h-3 bg-gray-300 rounded mb-2 w-3/4" />
          <div className="h-3 bg-gray-300 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <div 
        className={`${baseClasses} ${className}`} 
        style={{ width, height }}
      />
    );
  }

  return (
    <div 
      className={`${baseClasses} ${className}`} 
      style={{ width, height }}
    />
  );
};

// Loading Button Component
export const LoadingButton = ({ 
  loading = false, 
  children, 
  className = '',
  disabled = false,
  ...props 
}) => {
  return (
    <motion.button
      className={`relative ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      {...props}
    >
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <LoadingSpinner size="small" color="white" />
        </motion.div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </motion.button>
  );
};

// Error State Component
export const ErrorState = ({ 
  message = 'Something went wrong', 
  onRetry,
  showRetry = true,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 3 
        }}
        className="text-red-500 mb-4"
      >
        <FaExclamationTriangle className="w-12 h-12" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-4 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <motion.button
          onClick={onRetry}
          className="btn-primary px-6 py-2 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

// Success State Component
export const SuccessState = ({ 
  message = 'Success!', 
  className = '',
  showIcon = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      {showIcon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-green-500 mb-4"
        >
          <FaCheckCircle className="w-12 h-12" />
        </motion.div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {message}
      </h3>
    </motion.div>
  );
};

// Loading Overlay Component
export const LoadingOverlay = ({ 
  loading = false, 
  message = 'Loading...',
  children 
}) => {
  return (
    <div className="relative">
      {children}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="flex flex-col items-center">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-gray-600 font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Progressive Loading Component
export const ProgressiveLoader = ({ 
  steps = [],
  currentStep = 0,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index <= currentStep ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index < currentStep
                  ? 'bg-primary text-white'
                  : index === currentStep
                  ? 'bg-primary/20 text-primary border-2 border-primary'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className="ml-2 text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentStep + 1) / steps.length) * 100}%` 
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default {
  LoadingSpinner,
  SkeletonLoader,
  LoadingButton,
  ErrorState,
  SuccessState,
  LoadingOverlay,
  ProgressiveLoader
};
