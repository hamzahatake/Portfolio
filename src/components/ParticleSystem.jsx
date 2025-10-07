import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ParticleSystem = ({ 
  count = 50,
  featured = false,
  className = "",
  color = "#3b82f6"
}) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (featured ? 6 : 3) + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.6 + 0.2,
        direction: Math.random() * 360,
        speed: Math.random() * 2 + 0.5
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, [count, featured]);

  const getParticleColor = (opacity) => {
    const colors = {
      blue: `rgba(59, 130, 246, ${opacity})`,
      purple: `rgba(168, 85, 247, ${opacity})`,
      green: `rgba(34, 197, 94, ${opacity})`,
      orange: `rgba(249, 115, 22, ${opacity})`
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: getParticleColor(particle.opacity),
            boxShadow: `0 0 ${particle.size * 2}px ${getParticleColor(particle.opacity)}`
          }}
          animate={{
            x: [
              0,
              Math.cos(particle.direction * Math.PI / 180) * particle.speed * 20,
              Math.cos(particle.direction * Math.PI / 180) * particle.speed * 40,
              0
            ],
            y: [
              0,
              Math.sin(particle.direction * Math.PI / 180) * particle.speed * 20,
              Math.sin(particle.direction * Math.PI / 180) * particle.speed * 40,
              0
            ],
            scale: [1, 1.2, 0.8, 1],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity * 0.7, particle.opacity],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Featured project special effects */}
      {featured && (
        <>
          {/* Orbiting particles */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                backgroundColor: getParticleColor(0.8),
                boxShadow: `0 0 10px ${getParticleColor(0.8)}`
              }}
              animate={{
                rotate: [0, 360],
                x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                y: [0, Math.sin(i * 45 * Math.PI / 180) * 100]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Central glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${getParticleColor(0.3)} 0%, transparent 70%)`,
              filter: 'blur(20px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </div>
  );
};

export default ParticleSystem;

