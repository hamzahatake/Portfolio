import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => (
  <motion.nav
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-transparent text-white"
  >
    <div className="flex justify-between items-center max-w-7xl mx-auto">
      {/* Brand / Logo */}
      <motion.h1
        whileHover={{ scale: 1.05 }}
        className="text-xl font-semibold tracking-tight text-white drop-shadow-md"
      >
        Hamza.dev
      </motion.h1>

      {/* Social Links */}
      <ul className="hidden md:flex gap-5">
        <motion.li whileHover={{ scale: 1.15, rotate: -6 }}>
          <a
            href="https://www.linkedin.com/in/hamza-sarwar-474509263/"
            title="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white hover:text-white/80 transition-colors duration-300"
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
            className="text-xl text-white hover:text-white/80 transition-colors duration-300"
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
            className="text-xl text-white hover:text-white/80 transition-colors duration-300"
          >
            <FaGithub />
          </a>
        </motion.li>
      </ul>

      {/* Optional mobile menu placeholder */}
      <div className="md:hidden"></div>
    </div>
  </motion.nav>
);

export default Navbar;
