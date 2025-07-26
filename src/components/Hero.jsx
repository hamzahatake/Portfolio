import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Hero = () => {
  // Apply smooth scroll behavior globally (for copy-paste simplicity)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-sky-600 text-white" id="hero">
      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-6 px-4">
        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
        >
          Hi, I'm Hamza <br />I build full-stack web experiences.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl"
        >
          A Full-stack Web Developer creating modern, interactive experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex gap-4 mt-4 flex-wrap justify-center"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-white text-sky-600 font-semibold shadow-md hover:bg-sky-100 transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-white text-white font-medium hover:bg-white/10 transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
