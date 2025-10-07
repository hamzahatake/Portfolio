import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const BeforeAfterComparison = ({ 
  beforeImage,
  afterImage,
  beforeTitle = "Before",
  afterTitle = "After",
  className = "",
  animated = true
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-gray-900 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt={beforeTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* After Image with Slider */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={afterImage}
          alt={afterTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Slider Line */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
        animate={animated ? {
          boxShadow: [
            '0 0 0 rgba(255,255,255,0.5)',
            '0 0 20px rgba(255,255,255,0.8)',
            '0 0 0 rgba(255,255,255,0.5)'
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Slider Handle */}
      <motion.div
        className="absolute top-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing z-20"
        style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={animated ? {
          rotate: [0, 5, -5, 0]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="flex gap-1">
          <FaArrowLeft className="text-gray-600 text-xs" />
          <FaArrowRight className="text-gray-600 text-xs" />
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-semibold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {beforeTitle}
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <motion.div
          className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-semibold"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {afterTitle}
        </motion.div>
      </div>

      {/* Instructions */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white text-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <FaEye className="text-blue-400" />
          <span>Drag to compare</span>
        </div>
      </motion.div>

      {/* Animated Overlay Effects */}
      {animated && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </motion.div>
  );
};

// Comparison Grid Component
export const ComparisonGrid = ({ 
  comparisons = [],
  className = ""
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {comparisons.map((comparison, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.4 }}
        >
          <BeforeAfterComparison {...comparison} />
        </motion.div>
      ))}
    </div>
  );
};

export default BeforeAfterComparison;

