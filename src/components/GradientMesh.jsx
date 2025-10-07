import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GradientMesh = ({ 
  className = "",
  intensity = "medium",
  animated = true,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const intensities = {
    subtle: { opacity: 0.1, blur: 20 },
    medium: { opacity: 0.2, blur: 15 },
    strong: { opacity: 0.3, blur: 10 }
  };

  const currentIntensity = intensities[intensity];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient mesh */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, ${colors[0]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${colors[1]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, ${colors[2]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${colors[3]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)
          `,
          filter: `blur(${currentIntensity.blur}px)`
        }}
        animate={animated ? {
          background: [
            `radial-gradient(circle at 20% 20%, ${colors[0]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, ${colors[1]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, ${colors[2]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, ${colors[3]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`,
            `radial-gradient(circle at 30% 30%, ${colors[1]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
             radial-gradient(circle at 70% 30%, ${colors[2]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
             radial-gradient(circle at 30% 70%, ${colors[3]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
             radial-gradient(circle at 70% 70%, ${colors[0]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 20%, ${colors[0]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, ${colors[1]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, ${colors[2]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, ${colors[3]}${Math.floor(currentIntensity.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`
          ]
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mouse-responsive gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${typeof window !== 'undefined' ? mousePosition.x / window.innerWidth * 100 : 50}% ${typeof window !== 'undefined' ? mousePosition.y / window.innerHeight * 100 : 50}%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
          filter: 'blur(30px)'
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default GradientMesh;
