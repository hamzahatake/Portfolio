import { motion } from 'framer-motion';
import { useState } from 'react';

const ModernButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon = null,
  onClick,
  className = '',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: 'glass-morphism-strong text-primary hover:scale-105',
    secondary: 'neumorphism-button text-primary hover:scale-105',
    ghost: 'glass-morphism-subtle text-primary hover:scale-105',
    gradient: 'bg-gradient-primary text-white hover:scale-105',
    outline: 'border-2 border-white/30 text-primary hover:bg-white/10'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-full font-semibold
        transition-all duration-300 ease-out
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isPressed ? 1 : 0,
          opacity: isPressed ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Loading Spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Button Content */}
      <motion.div
        className={`flex items-center justify-center gap-2 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        transition={{ duration: 0.2 }}
      >
        {icon && (
          <motion.span
            animate={{ 
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1 
            }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.span>
        )}
        <span>{children}</span>
      </motion.div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ModernButton;
