import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedTechIcon = ({ 
  technology, 
  size = 20, 
  className = "",
  animated = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTechIcon = (tech) => {
    const icons = {
      'React': (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="2"
            fill="#61DAFB"
            animate={animated ? {
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V6.5C15 7.3 14.3 8 13.5 8S12 7.3 12 6.5V5.5L6 7V9L12 7.5V8.5C12 9.3 12.7 10 13.5 10S15 9.3 15 8.5V7.5L21 9Z"
            fill="#61DAFB"
            animate={animated ? {
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      ),
      'Next.js': (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M11.572 0c-.176 0-.31.001-.358.006a6.534 6.534 0 0 0-5.833 5.747c-.006.05-.006.186-.006.357v11.78c0 .176.001.31.006.358a6.534 6.534 0 0 0 5.747 5.833c.05.006.186.006.357.006s.31-.001.358-.006a6.534 6.534 0 0 0 5.833-5.747c.006-.05.006-.186.006-.357V6.11c0-.176-.001-.31-.006-.358A6.534 6.534 0 0 0 12.215.006C12.165 0 12.029 0 11.858 0h.714z"
            fill="#000"
            animate={animated ? {
              scale: [1, 1.05, 1]
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M14.5 7.5h-1.5v9h1.5v-9z"
            fill="#fff"
            animate={animated ? {
              opacity: [0.8, 1, 0.8]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      ),
      'TypeScript': (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            width="24"
            height="24"
            rx="4"
            fill="#3178C6"
            animate={animated ? {
              scale: [1, 1.02, 1]
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.251.304.441.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.252 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.3 0 .573-.03.819-.09.246-.059.456-.144.63-.254.174-.111.31-.243.408-.396a1.023 1.023 0 0 0 .156-.566c0-.287-.092-.518-.276-.694-.184-.176-.435-.333-.753-.47-.318-.138-.695-.267-1.13-.388a9.638 9.638 0 0 1-1.286-.513 4.08 4.08 0 0 1-1.032-.793 2.279 2.279 0 0 1-.632-1.008c-.093-.378-.14-.804-.14-1.277 0-.614.108-1.141.323-1.582.216-.441.51-.804.883-1.089a4.279 4.279 0 0 1 1.23-.629 6.033 6.033 0 0 1 1.512-.19zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
            fill="#fff"
            animate={animated ? {
              opacity: [0.9, 1, 0.9]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      ),
      'Tailwind CSS': (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
            fill="#06B6D4"
            animate={animated ? {
              scale: [1, 1.03, 1],
              rotate: [0, 1, -1, 0]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      ),
      'JavaScript': (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            width="24"
            height="24"
            rx="4"
            fill="#F7DF1E"
            animate={animated ? {
              scale: [1, 1.02, 1]
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M6.5 6.5h11v11h-11v-11z"
            fill="#000"
            animate={animated ? {
              opacity: [0.8, 1, 0.8]
            } : {}}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      )
    };

    return icons[tech] || (
      <motion.div
        className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
        animate={animated ? {
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {tech.charAt(0)}
      </motion.div>
    );
  };

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {getTechIcon(technology)}
    </motion.div>
  );
};

export default AnimatedTechIcon;

