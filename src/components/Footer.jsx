import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-slate-800 text-white py-5 text-center mt-8">
    <div className="flex flex-col items-center gap-2 w-full max-w-[1200px] mx-auto">
      <p className="text-sm">&copy; 2025 Hamza. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="https://www.linkedin.com/in/hamza-sarwar-474509263/" target='_blank' title="LinkedIn" className="text-white hover:text-sky-400 text-xl transition-transform hover:scale-110 hover:rotate-6"><FaLinkedin /></a>
        <a href="https://www.instagram.com/otakutheartist" target='_blank' title="Instagram" className="text-white hover:text-sky-400 text-xl transition-transform hover:scale-110 hover:rotate-6"><FaInstagram /></a>
        <a href="https://github.com/hamzahatake" target='_blank' title="GitHub" className="text-white hover:text-sky-400 text-xl transition-transform hover:scale-110 hover:rotate-6"><FaGithub /></a>
      </div>
    </div>
  </footer>
);

export default Footer;