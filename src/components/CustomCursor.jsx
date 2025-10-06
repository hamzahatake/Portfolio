import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const hoverRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px) scale(${isHovering ? 1.2 : 1})`;
      }
      if (hoverRef.current && isHovering) {
        hoverRef.current.style.transform = `translate(${e.clientX - 30}px, ${e.clientY - 30}px)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      if (e.target.matches('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter, true);
    window.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter, true);
      window.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [isHovering, isClicking]);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference transition-none"
        style={{ transform: 'translate(0px, 0px) scale(1)' }}
      >
        <div className="w-4 h-4 bg-white rounded-full" />
      </div>

      {/* Cursor trail */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-40 transition-none"
        style={{ transform: 'translate(0px, 0px) scale(1)' }}
      >
        <div className="w-10 h-10 border border-white/30 rounded-full" />
      </div>

      {/* Hover effect */}
      {isHovering && (
        <div
          ref={hoverRef}
          className="fixed top-0 left-0 pointer-events-none z-30 transition-none"
          style={{ 
            transform: 'translate(0px, 0px)',
            opacity: 0.3
          }}
        >
          <div className="w-16 h-16 border border-white/20 rounded-full" />
        </div>
      )}
    </>
  );
};

export default CustomCursor;
