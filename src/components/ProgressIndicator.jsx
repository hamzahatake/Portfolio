import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ProgressIndicator = ({ 
  progress, 
  label, 
  color = "blue",
  size = "medium",
  showPercentage = true,
  animated = true,
  className = ""
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(progress);
    }
  }, [progress, animated]);

  const sizes = {
    small: "h-2",
    medium: "h-3",
    large: "h-4"
  };

  const colors = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600"
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-white">
              {Math.round(animatedProgress)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`relative ${sizes[size]} bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10`}>
        <motion.div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colors[color]} rounded-full shadow-lg`}
          initial={{ width: 0 }}
          animate={{ width: `${animatedProgress}%` }}
          transition={{ 
            duration: animated ? 1.5 : 0,
            ease: "easeOut"
          }}
          style={{
            boxShadow: `0 0 20px ${colors[color].split('-')[1] === 'blue' ? '#3b82f6' : colors[color].split('-')[1] === 'purple' ? '#8b5cf6' : colors[color].split('-')[1] === 'green' ? '#10b981' : colors[color].split('-')[1] === 'orange' ? '#f97316' : '#ef4444'}40`
          }}
        />
        
        {/* Animated shine effect */}
        <motion.div
          className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

// Circular Progress Component
export const CircularProgress = ({ 
  progress, 
  size = 60,
  strokeWidth = 4,
  color = "blue",
  label,
  className = ""
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress]);

  const colors = {
    blue: "#3b82f6",
    purple: "#8b5cf6",
    green: "#10b981",
    orange: "#f97316",
    red: "#ef4444"
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${colors[color]}40)`
          }}
        />
      </svg>
      
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">
            {Math.round(animatedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;