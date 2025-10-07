import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const SmoothTransition = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={className}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut" 
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Link Component with Smooth Transitions
export const SmoothLink = ({ 
  href, 
  children, 
  className = "",
  onClick,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add smooth transition effect
    if (typeof document !== 'undefined') {
      const transition = document.createElement('div');
      transition.className = 'fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center';
      transition.innerHTML = `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-white">
          <div class="animate-spin w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
          <p class="text-center">Opening project...</p>
        </div>
      `;
      document.body.appendChild(transition);

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 800));

      // Remove transition and navigate
      document.body.removeChild(transition);
    }
    setIsLoading(false);
    
    if (onClick) {
      onClick(e);
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
      {children}
    </motion.a>
  );
};

export default SmoothTransition;
