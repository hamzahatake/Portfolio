import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Display Typography Component
export const DisplayText = ({ 
  children, 
  className = "", 
  variant = "h1",
  animate = false,
  ...props 
}) => {
  const variants = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-black tracking-tight",
    h2: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
    h3: "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
    h4: "text-xl md:text-2xl lg:text-3xl font-bold tracking-tight"
  };

  const fontFamily = "font-display"; // Space Grotesk for display
  const textShadow = "text-shadow-lg";
  const letterSpacing = "tracking-tight";

  const Component = animate ? motion.h1 : 'h1';

  return (
    <Component
      className={`${fontFamily} ${variants[variant]} ${textShadow} ${letterSpacing} ${className}`}
      style={{
        fontFamily: 'Space Grotesk, system-ui, sans-serif',
        fontWeight: '700',
        letterSpacing: '-0.025em',
        lineHeight: '1.1',
        textShadow: '0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

// Body Typography Component
export const BodyText = ({ 
  children, 
  className = "", 
  variant = "base",
  weight = "normal",
  animate = false,
  ...props 
}) => {
  const variants = {
    large: "text-lg md:text-xl",
    base: "text-base md:text-lg",
    small: "text-sm md:text-base",
    xs: "text-xs md:text-sm"
  };

  const weights = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold"
  };

  const fontFamily = "font-body"; // Inter for body
  const lineHeight = "leading-relaxed";

  const Component = animate ? motion.p : 'p';

  return (
    <Component
      className={`${fontFamily} ${variants[variant]} ${weights[weight]} ${lineHeight} ${className}`}
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: weight === 'light' ? '300' : weight === 'normal' ? '400' : weight === 'medium' ? '500' : weight === 'semibold' ? '600' : '700',
        lineHeight: '1.6',
        letterSpacing: '0.01em'
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

// Glowing Text Component
export const GlowText = ({ 
  children, 
  className = "",
  glowColor = "blue",
  intensity = "medium",
  animate = false,
  ...props 
}) => {
  const glowIntensities = {
    subtle: "drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]",
    medium: "drop-shadow-[0_0_12px_rgba(59,130,246,0.5)] drop-shadow-[0_0_24px_rgba(59,130,246,0.3)]",
    strong: "drop-shadow-[0_0_16px_rgba(59,130,246,0.7)] drop-shadow-[0_0_32px_rgba(59,130,246,0.5)]"
  };

  const glowColors = {
    blue: "drop-shadow-[0_0_12px_rgba(59,130,246,0.5)] drop-shadow-[0_0_24px_rgba(59,130,246,0.3)]",
    purple: "drop-shadow-[0_0_12px_rgba(168,85,247,0.5)] drop-shadow-[0_0_24px_rgba(168,85,247,0.3)]",
    green: "drop-shadow-[0_0_12px_rgba(34,197,94,0.5)] drop-shadow-[0_0_24px_rgba(34,197,94,0.3)]",
    orange: "drop-shadow-[0_0_12px_rgba(249,115,22,0.5)] drop-shadow-[0_0_24px_rgba(249,115,22,0.3)]"
  };

  const Component = animate ? motion.span : 'span';

  return (
    <Component
      className={`${glowColors[glowColor]} ${className}`}
      style={{
        filter: glowColors[glowColor].replace(/drop-shadow-\[/g, '').replace(/\]/g, ''),
        textShadow: '0 0 20px currentColor'
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

// Animated Counter Component
export const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  className = "",
  prefix = "",
  suffix = "",
  ...props 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(end);
    }, 500);
    return () => clearTimeout(timer);
  }, [end]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {prefix}
      <motion.span
        key={count}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {count}
      </motion.span>
      {suffix}
    </motion.span>
  );
};
