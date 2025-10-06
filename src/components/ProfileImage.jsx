import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import hamzaImg from '/image/Hamza.jpg';

const ProfileImage = () => {
  const { colorScheme } = useTheme();

  const getGradientColors = () => {
    switch (colorScheme) {
      case 'purple':
        return 'from-purple-400 via-pink-400 to-red-400';
      case 'orange':
        return 'from-orange-400 via-red-400 to-pink-400';
      case 'green':
        return 'from-green-400 via-blue-400 to-purple-400';
      default:
        return 'from-blue-400 via-cyan-400 to-teal-400';
    }
  };

  return (
    <div className="relative">
      {/* Animated background rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className={`w-full h-full rounded-full bg-gradient-to-r ${getGradientColors()} opacity-20`} />
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1.1, 1.2, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className={`w-full h-full rounded-full bg-gradient-to-r ${getGradientColors()} opacity-10`} />
      </motion.div>

      {/* Main profile image */}
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="relative overflow-hidden rounded-full border-4 border-white shadow-2xl"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 255, 255, 0.3)',
              '0 0 40px rgba(255, 255, 255, 0.5)',
              '0 0 20px rgba(255, 255, 255, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src={hamzaImg}
            alt="Hamza Sarwar"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors()} opacity-20 mix-blend-overlay`} />
        </motion.div>

        {/* Floating particles around image */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
              top: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className={`w-full h-full rounded-full bg-gradient-to-r ${getGradientColors()} opacity-30`} />
      </motion.div>
    </div>
  );
};

export default ProfileImage;
