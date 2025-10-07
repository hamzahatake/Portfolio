import { FaHome, FaUser, FaCode, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import GradientOrbs from './GradientOrbs';
import GlowEffects from './GlowEffects';

const LeftNavbar = () => {
  const navItems = [
    { name: 'Home', href: '#hero', icon: FaHome },
    { name: 'About', href: '#about', icon: FaUser },
    { name: 'Projects', href: '#projects', icon: FaCode },
    { name: 'Contact', href: '#contact', icon: FaEnvelope }
  ];

  return (
    <div className="relative flex flex-col justify-center items-start gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6">
      {/* Optimized Background Elements - Removed for performance */}
      <GlowEffects />

      {/* Navigation Links */}
      <ul className="flex flex-col gap-4 relative z-10">
        {navItems.map((item, index) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, x: 5 }}
          >
            <a
              href={item.href}
              className="flex items-center gap-3 text-primary hover:text-secondary transition-colors duration-300 group relative"
            >
              <item.icon className="text-xl group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-10 z-50 whitespace-nowrap bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20 shadow-lg">
                {item.name}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default LeftNavbar;
