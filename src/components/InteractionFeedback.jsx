import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

// Success Animation Component
export const SuccessAnimation = ({ 
  message = "Success!", 
  duration = 3000,
  onComplete,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 right-4 z-50 bg-green-500/90 backdrop-blur-xl border border-green-400/30 rounded-2xl p-4 text-white shadow-2xl ${className}`}
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <FaCheck className="text-white text-sm" />
              </motion.div>
            </motion.div>
            <span className="font-semibold">{message}</span>
          </div>
          
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-green-300 rounded-b-2xl"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Error Animation Component
export const ErrorAnimation = ({ 
  message = "Something went wrong!", 
  duration = 4000,
  onComplete,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 right-4 z-50 bg-red-500/90 backdrop-blur-xl border border-red-400/30 rounded-2xl p-4 text-white shadow-2xl ${className}`}
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
            >
              <FaTimes className="text-white text-sm" />
            </motion.div>
            <span className="font-semibold">{message}</span>
          </div>
          
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-red-300 rounded-b-2xl"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Loading State Component
export const LoadingState = ({ 
  message = "Loading...", 
  className = "",
  size = "medium"
}) => {
  const sizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8"
  };

  return (
    <motion.div
      className={`flex items-center justify-center gap-3 text-white ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`${sizes[size]} border-2 border-white/30 border-t-white rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="font-medium">{message}</span>
    </motion.div>
  );
};

// Skeleton Loader Component
export const SkeletonLoader = ({ 
  variant = "card",
  className = "",
  count = 1
}) => {
  const variants = {
    card: "h-96 w-full rounded-2xl",
    text: "h-4 w-full rounded",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24 rounded-lg"
  };

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl ${variants[variant]} ${className}`}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        >
          {variant === "card" && (
            <div className="p-6 space-y-4">
              <div className="h-6 bg-white/20 rounded w-3/4" />
              <div className="h-4 bg-white/20 rounded w-full" />
              <div className="h-4 bg-white/20 rounded w-2/3" />
              <div className="flex gap-2">
                <div className="h-6 bg-white/20 rounded-full w-16" />
                <div className="h-6 bg-white/20 rounded-full w-20" />
                <div className="h-6 bg-white/20 rounded-full w-14" />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </>
  );
};

