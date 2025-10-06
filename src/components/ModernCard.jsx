import { motion } from 'framer-motion';
import { useState } from 'react';

const ModernCard = ({ 
  children, 
  variant = 'glass',
  hover = true,
  className = '',
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    glass: 'glass-morphism',
    glassStrong: 'glass-morphism-strong',
    glassSubtle: 'glass-morphism-subtle',
    neumorphism: 'neumorphism',
    neumorphismInset: 'neumorphism-inset'
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl p-6
        transition-all duration-300 ease-out
        ${variants[variant]}
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hover ? { 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      {...props}
    >
      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-white/20"
        animate={{
          borderColor: isHovered 
            ? 'rgba(255, 255, 255, 0.4)' 
            : 'rgba(255, 255, 255, 0.2)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ModernCard;
