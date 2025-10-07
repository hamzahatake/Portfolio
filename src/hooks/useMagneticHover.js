import { useState, useRef, useCallback } from 'react';

export const useMagneticHover = (strength = 0.3) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    position,
    elementRef,
    handleMouseMove,
    handleMouseLeave
  };
};

