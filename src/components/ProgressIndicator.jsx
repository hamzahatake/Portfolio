import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ProgressIndicator = ({ 
  progress = 0, 
  size = 'medium',
  variant = 'circular',
  showPercentage = true,
  animated = true,
  color = 'primary',
  className = ''
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const sizes = {
    small: { size: 60, stroke: 4 },
    medium: { size: 80, stroke: 6 },
    large: { size: 120, stroke: 8 }
  };

  const colors = {
    primary: '#0ea5e9',
    secondary: '#a855f7',
    success: '#22c55e',
    warning: '#f97316',
    danger: '#ef4444'
  };

  if (variant === 'circular') {
    const { size: circleSize, stroke } = sizes[size];
    const radius = (circleSize - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

    return (
      <div className={`relative ${className}`}>
        <svg
          width={circleSize}
          height={circleSize}
          className="transform -rotate-90"
        >
          {/* Background Circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={stroke}
            fill="none"
          />
          {/* Progress Circle */}
          <motion.circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={colors[color]}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Percentage Text */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-sm font-semibold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(displayProgress)}%
            </motion.span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'linear') {
    return (
      <div className={`w-full ${className}`}>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-primary rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${displayProgress}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
        {showPercentage && (
          <motion.div
            className="text-right text-sm text-primary mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(displayProgress)}%
          </motion.div>
        )}
      </div>
    );
  }

  if (variant === 'steps') {
    const steps = Array.from({ length: 5 }, (_, i) => i + 1);
    const currentStep = Math.ceil((displayProgress / 100) * steps.length);

    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {steps.map((step) => (
          <motion.div
            key={step}
            className={`
              w-3 h-3 rounded-full
              ${step <= currentStep ? 'bg-gradient-primary' : 'bg-white/20'}
            `}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: step * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default ProgressIndicator;
