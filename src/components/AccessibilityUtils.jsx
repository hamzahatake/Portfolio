import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Focus Management Hook
export const useFocusManagement = () => {
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  const trapFocus = (containerRef) => {
    if (!containerRef.current) return;
    
    const focusableContent = containerRef.current.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  };

  const focusFirst = (containerRef) => {
    if (containerRef.current) {
      const firstElement = containerRef.current.querySelector(focusableElements);
      if (firstElement) firstElement.focus();
    }
  };

  return { trapFocus, focusFirst };
};

// Skip Link Component
export const SkipLink = ({ href, children = 'Skip to main content' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' && !isVisible) {
        setIsVisible(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Tab' && isVisible) {
        setTimeout(() => setIsVisible(false), 100);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          href={href}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
        >
          {children}
        </motion.a>
      )}
    </AnimatePresence>
  );
};

// Screen Reader Only Text
export const SrOnly = ({ children }) => (
  <span className="sr-only">{children}</span>
);

// Accessible Button Component
export const AccessibleButton = ({ 
  children, 
  onClick, 
  ariaLabel,
  ariaDescribedBy,
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || loading}
      className={`${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      {...props}
    >
      {loading && <SrOnly>Loading...</SrOnly>}
      {children}
    </motion.button>
  );
};

// Accessible Modal Component
export const AccessibleModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  className = ''
}) => {
  const modalRef = useRef(null);
  const { trapFocus, focusFirst } = useFocusManagement();

  useEffect(() => {
    if (isOpen) {
      const cleanup = trapFocus(modalRef);
      focusFirst(modalRef);
      
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      return () => {
        cleanup();
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, trapFocus, focusFirst]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto ${className}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
            <AccessibleButton
              onClick={onClose}
              ariaLabel="Close modal"
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </AccessibleButton>
          </div>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Accessible Form Field Component
export const AccessibleFormField = ({ 
  label, 
  error, 
  required = false,
  children,
  className = ''
}) => {
  const fieldId = `field-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${fieldId}-error`;

  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      
      {children}
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          id={errorId}
          className="text-red-500 text-sm mt-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// High Contrast Mode Detection
export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (e) => setIsHighContrast(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
};

// Reduced Motion Detection
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Announcement Component for Screen Readers
export const Announcement = ({ message, priority = 'polite' }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    if (message) {
      const id = Date.now();
      setAnnouncements(prev => [...prev, { id, message }]);
      
      // Remove announcement after 5 seconds
      setTimeout(() => {
        setAnnouncements(prev => prev.filter(ann => ann.id !== id));
      }, 5000);
    }
  }, [message]);

  return (
    <div aria-live={priority} aria-atomic="true" className="sr-only">
      {announcements.map(announcement => (
        <div key={announcement.id}>
          {announcement.message}
        </div>
      ))}
    </div>
  );
};

// Keyboard Navigation Hook
export const useKeyboardNavigation = (onArrowUp, onArrowDown, onEnter, onEscape) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          onArrowUp?.();
          break;
        case 'ArrowDown':
          e.preventDefault();
          onArrowDown?.();
          break;
        case 'Enter':
          e.preventDefault();
          onEnter?.();
          break;
        case 'Escape':
          e.preventDefault();
          onEscape?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onArrowUp, onArrowDown, onEnter, onEscape]);
};

export default {
  useFocusManagement,
  SkipLink,
  SrOnly,
  AccessibleButton,
  AccessibleModal,
  AccessibleFormField,
  useHighContrast,
  useReducedMotion,
  Announcement,
  useKeyboardNavigation
};
