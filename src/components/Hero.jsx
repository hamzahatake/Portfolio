import { motion } from 'framer-motion';
import hamzaImg from '/image/Hamza.png';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => (
  <section className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[80vh] py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 bg-white overflow-hidden">
    {/* Text Section */}
    <motion.div
      className="flex-1 min-w-[320px] space-y-6 z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={childVariants}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight"
      >
        Hi, I'm <span className="text-sky-500">Hamza</span>
      </motion.h1>

      <motion.p
        variants={childVariants}
        className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed"
      >
        A Full-stack <span className="text-sky-500">Web Developer</span> crafting sleek, animated, and tech-forward user experiences.
      </motion.p>
    </motion.div>

    {/* Image Section */}
    <motion.div
      className="flex-1 min-w-[250px] flex justify-center items-center relative mb-12 md:mb-0"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Floating container */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2.5,
          ease: 'easeInOut',
        }}
      >
        {/* Hover interaction only happens here */}
        <motion.img
          src={hamzaImg}
          alt="Hamza"
          className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover shadow-[0_8px_24px_rgba(0,217,255,0.25)] border-4 border-white bg-white"
          whileHover={{
            scale: 1.1,
            rotate: 5,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />
      </motion.div>
    </motion.div>

  </section>
);

export default Hero;
