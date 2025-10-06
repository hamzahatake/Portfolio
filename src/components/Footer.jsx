import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true }}
    className="text-primary py-8 px-4"
  >
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
      {/* Copyright */}
      <p className="body-small text-secondary text-shadow-sm tracking-wide">
        &copy; 2025 Hamza. All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex gap-6 text-xl">
        <motion.a
          whileHover={{ scale: 1.2, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 300 }}
          href="https://www.linkedin.com/in/hamza-sarwar-474509263/"
          title="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-secondary transition-colors duration-300"
        >
          <FaLinkedin />
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.2, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 300 }}
          href="https://www.instagram.com/otakutheartist"
          title="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-secondary transition-colors duration-300"
        >
          <FaInstagram />
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.2, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 300 }}
          href="https://github.com/hamzahatake"
          title="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-secondary transition-colors duration-300"
        >
          <FaGithub />
        </motion.a>
      </div>
    </div>
  </motion.footer>
);

export default Footer;