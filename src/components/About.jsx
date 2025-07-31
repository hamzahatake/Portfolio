import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from 'react-icons/fa';
import hamzaImg from '/image/Hamza.png';
import { motion } from 'framer-motion';

const skills = [
  'React.js',
  'Redux Toolkit',
  'RTK Query',
  'Tailwind CSS',
  'Framer Motion',
  'Django',
  'Django REST Framework',
  'REST API Development',
  'Authentication (Token-Based)',
  'PostgreSQL',
  'Full Stack Web Development',
];

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

const About = () => (
  <section className="bg-sky-600 py-20 px-4 sm:px-6 lg:px-8 text-white" id="about">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
    >
      {/* Profile Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] flex-shrink-0"
      >
        <img
          src={hamzaImg}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
        />
      </motion.div>

      {/* About Content */}
      <div className="flex-1 w-full flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow">
          About Me
        </h2>

        {/* Description Box */}
        <div className="bg-white/5 border-l-4 border-white/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-md">
          <p className="text-base sm:text-lg mb-4 text-white">
            <span className="block font-semibold text-lg sm:text-xl mb-2">
              Full Stack Developer (React + Django)
            </span>
            <span className="italic opacity-90 text-sm sm:text-base">
              "Coding is just another way to create art, and that’s what keeps me excited about every project."
            </span>
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-white/90">
            I have an{' '}
            <a
              href="https://www.instagram.com/otakutheartist"
              className="text-cyan-200 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              artistic background
            </a>
            , which is probably why I’m drawn to creating anime and gaming-inspired websites filled with color, motion, and personality. I love building interfaces that feel alive, where every animation or transition adds to the experience, like it’s part of a story.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-white/90 mt-4">
            Even though I enjoy the creativity of frontend work, I also like diving into the backend. Writing the logic that powers everything behind the scenes is just as fun. I don’t like choosing between the two — I enjoy building the whole experience, from the visual design to the working engine underneath.
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">Skills</h3>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 sm:gap-3"
          >
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-full px-3 sm:px-4 py-1.5 text-sm sm:text-sm font-medium shadow"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default About;
