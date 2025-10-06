import { FaLinkedin, FaInstagram, FaGithub, FaSun, FaMoon, FaPalette } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

const Navbar = () => {
  const { theme, colorScheme, toggleTheme, changeColorScheme } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorSchemes = [
    { name: 'Sky', value: 'sky', color: '#0ea5e9' },
    { name: 'Purple', value: 'purple', color: '#a855f7' },
    { name: 'Orange', value: 'orange', color: '#f97316' },
    { name: 'Green', value: 'green', color: '#22c55e' }
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-transparent text-primary"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand / Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="heading-4 text-primary text-shadow-md"
        >
          Hamza.dev
        </motion.h1>

        {/* Theme Controls */}
        <div className="flex items-center gap-4">
          {/* Color Scheme Picker */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              title="Change Color Scheme"
            >
              <FaPalette className="text-primary" />
            </motion.button>

            <AnimatePresence>
              {showColorPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl"
                >
                  <div className="flex gap-2">
                    {colorSchemes.map((scheme) => (
                      <motion.button
                        key={scheme.value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          changeColorScheme(scheme.value);
                          setShowColorPicker(false);
                        }}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                          colorScheme === scheme.value
                            ? 'border-white scale-110'
                            : 'border-white/50 hover:border-white'
                        }`}
                        style={{ backgroundColor: scheme.color }}
                        title={scheme.name}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <FaMoon className="text-primary" />
            ) : (
              <FaSun className="text-primary" />
            )}
          </motion.button>

          {/* Social Links */}
          <ul className="hidden md:flex gap-5">
            <motion.li whileHover={{ scale: 1.15, rotate: -6 }}>
              <a
                href="https://www.linkedin.com/in/hamza-sarwar-474509263/"
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-primary hover:text-secondary transition-colors duration-300"
              >
                <FaLinkedin />
              </a>
            </motion.li>

            <motion.li whileHover={{ scale: 1.15, rotate: -6 }}>
              <a
                href="https://www.instagram.com/otakutheartist"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-primary hover:text-secondary transition-colors duration-300"
              >
                <FaInstagram />
              </a>
            </motion.li>

            <motion.li whileHover={{ scale: 1.15, rotate: -6 }}>
              <a
                href="https://github.com/hamzahatake"
                title="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-primary hover:text-secondary transition-colors duration-300"
              >
                <FaGithub />
              </a>
            </motion.li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;