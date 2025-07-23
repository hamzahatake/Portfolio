import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const Navbar = () => (
  <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4 text-sky-500 flex justify-evenly">
    <div className="flex justify-between items-center max-w-7xl mx-auto">

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-10 font-light text-sm tracking-wide">
        <li>
          <a href="https://www.linkedin.com/in/hamza-sarwar-474509263/" title="LinkedIn" target="_blank" className="hover:text-sky-400 transform hover:scale-110 hover:-rotate-6 transition-colors duration-300 text-xl">
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/otakutheartist" target='_blank' title="Instagram" className="hover:text-sky-400 transform hover:scale-110 hover:-rotate-6 transition-colors duration-300 text-xl">
            <FaInstagram />
          </a>

        </li>
        <li>
          <a href="https://github.com/hamzahatake" target='_blank' title="GitHub" className="hover:text-sky-400 transform hover:scale-110 hover:-rotate-6 transition-colors duration-300 text-xl">
            <FaGithub />
          </a>
        </li>
      </ul>
    </div>
  </nav >
);

export default Navbar;