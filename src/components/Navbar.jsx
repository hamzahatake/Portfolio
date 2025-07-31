import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const icons = [
  {
    icon: <FaLinkedin />,
    href: 'https://www.linkedin.com/in/hamza-sarwar-474509263/',
    label: 'LinkedIn',
  },
  {
    icon: <FaInstagram />,
    href: 'https://www.instagram.com/otakutheartist',
    label: 'Instagram',
  },
  {
    icon: <FaGithub />,
    href: 'https://github.com/hamzahatake',
    label: 'GitHub',
  },
];

const Navbar = () => (
  <motion.nav
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 bg-[#1A2744]/90 text-white shadow-md backdrop-blur-md"
  >
    <div className="flex justify-center items-center w-full max-w-7xl mx-auto">
      <ul className="flex flex-row gap-6 font-['Titillium Web'] font-semibold tracking-wide text-base sm:text-lg">
        {icons.map(({ icon, href, label }, index) => (
          <motion.li
            key={index}
            className="relative group"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white transition-colors duration-200 group-hover:text-[#00D9FF]"
            >
              {icon}
            </a>

            <motion.span
              variants={{
                hover: { scaleX: 1, opacity: 1 },
                initial: { scaleX: 0, opacity: 0 },
              }}
              initial="initial"
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00D9FF] origin-left transform scale-x-0 opacity-0 transition-transform"
            />
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.nav>
);

export default Navbar;
