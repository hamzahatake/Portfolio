import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const GradientOrbs = ({ className = "" }) => {
  const { colorScheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [orbs, setOrbs] = useState([]);

  const colorSchemes = {
    sky: ['#0ea5e9', '#3b82f6', '#1d4ed8'],
    purple: ['#a855f7', '#8b5cf6', '#7c3aed'],
    orange: ['#f97316', '#ea580c', '#dc2626'],
    green: ['#22c55e', '#16a34a', '#15803d']
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const generateOrbs = () => {
      const newOrbs = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        size: Math.random() * 100 + 50,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 3,
      }));
      setOrbs(newOrbs);
    };

    generateOrbs();
  }, []);

  const currentColors = colorSchemes[colorScheme] || colorSchemes.sky;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb, index) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full opacity-20 blur-xl"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${currentColors[index % currentColors.length]}40, transparent)`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, (mousePosition.x - window.innerWidth / 2) * 0.1, 0],
            y: [0, (mousePosition.y - window.innerHeight / 2) * 0.1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default GradientOrbs;

