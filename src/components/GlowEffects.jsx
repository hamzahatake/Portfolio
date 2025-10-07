import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const GlowEffects = ({ className = "" }) => {
  const { colorScheme, theme } = useTheme();

  const colorSchemes = {
    sky: {
      light: '#0ea5e9',
      dark: '#3b82f6'
    },
    purple: {
      light: '#a855f7',
      dark: '#8b5cf6'
    },
    orange: {
      light: '#f97316',
      dark: '#ea580c'
    },
    green: {
      light: '#22c55e',
      dark: '#16a34a'
    }
  };

  const currentColor = colorSchemes[colorScheme]?.[theme] || colorSchemes.sky[theme];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle, ${currentColor}15, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Inner glow */}
      <motion.div
        className="absolute inset-2 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${currentColor}20, transparent 50%)`,
          filter: 'blur(10px)',
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Pulsing border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `conic-gradient(from 0deg, ${currentColor}40, transparent, ${currentColor}40)`,
          filter: 'blur(2px)',
        }}
        animate={{
          rotate: [0, 360],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default GlowEffects;

