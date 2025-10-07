import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PerformanceMonitor = () => {
  const [fps, setFps] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Toggle visibility with Ctrl+Shift+P
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg border border-white/20"
    >
      <div className="text-sm space-y-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${fps >= 55 ? 'bg-green-500' : fps >= 30 ? 'bg-yellow-500' : 'bg-red-500'}`} />
          <span>FPS: {fps}</span>
        </div>
        <div className="text-xs text-gray-300">
          Performance: {fps >= 55 ? 'Excellent' : fps >= 30 ? 'Good' : 'Poor'}
        </div>
        <div className="text-xs text-gray-400">
          Press Ctrl+Shift+P to toggle
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMonitor;
