import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SkillBar = ({ skill, percentage, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="body-base text-primary font-medium">{skill}</span>
        <span className="body-small text-secondary">{percentage}%</span>
      </div>
      
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-primary rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{ 
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay + 1,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillBar;
