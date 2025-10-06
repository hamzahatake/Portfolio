import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedIcon = ({ 
  icon, 
  size = 'medium', 
  animation = 'float',
  color = 'primary',
  className = '',
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const animations = {
    float: {
      animate: { y: [0, -10, 0] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    pulse: {
      animate: { scale: [1, 1.2, 1] },
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    rotate: {
      animate: { rotate: 360 },
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    bounce: {
      animate: { y: [0, -15, 0] },
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    },
    glow: {
      animate: { 
        boxShadow: [
          '0 0 0px rgba(255, 255, 255, 0.3)',
          '0 0 20px rgba(255, 255, 255, 0.6)',
          '0 0 0px rgba(255, 255, 255, 0.3)'
        ]
      },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className={`
        ${sizes[size]} 
        text-${color} 
        cursor-pointer 
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.2,
        rotate: 15,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.9 }}
      {...animations[animation]}
      {...props}
    >
      <motion.div
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedIcon;
