import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const DynamicLighting = ({ 
  className = "",
  intensity = "medium",
  color = "blue",
  animated = true
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 100);

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      clearInterval(interval);
    };
  }, []);

  const intensities = {
    subtle: { opacity: 0.1, blur: 30 },
    medium: { opacity: 0.2, blur: 20 },
    strong: { opacity: 0.3, blur: 15 }
  };

  const colors = {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    green: '#10b981',
    orange: '#f97316'
  };

  const currentIntensity = intensities[intensity];
  const currentColor = colors[color] || colors.blue;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Mouse-following light */}
      <motion.div
        className="absolute"
        style={{
          left: `${typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth) * 100 : 50}%`,
          top: `${typeof window !== 'undefined' ? (mousePosition.y / window.innerHeight) * 100 : 50}%`,
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${currentColor}40 0%, transparent 70%)`,
          filter: `blur(${currentIntensity.blur}px)`,
          transform: 'translate(-50%, -50%)'
        }}
        animate={animated ? {
          scale: [1, 1.2, 1],
          opacity: [currentIntensity.opacity, currentIntensity.opacity * 1.5, currentIntensity.opacity]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated ambient lighting */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${time * 10}deg, ${currentColor}20, transparent, ${currentColor}20)`,
          filter: 'blur(40px)'
        }}
        animate={animated ? {
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Pulsing center light */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${currentColor}30 0%, transparent 60%)`,
          filter: 'blur(30px)'
        }}
        animate={animated ? {
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Edge lighting */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${currentColor}20, transparent, ${currentColor}20)`,
          filter: 'blur(2px)'
        }}
        animate={animated ? {
          rotate: [0, 360],
          opacity: [0.1, 0.3, 0.1]
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default DynamicLighting;
