import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from 'react-icons/fa';
import hamzaImg from '/image/Hamza.jpg';
import { motion } from 'framer-motion';
import Timeline from './Timeline';
import Testimonials from './Testimonials';

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
  <section className="py-20 px-4 sm:px-6 lg:px-8 text-primary" id="about">
    <div className="w-full max-w-6xl mx-auto p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
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
        <h2 className="heading-1 text-primary text-shadow-lg mb-4">
          About Me
        </h2>

        {/* Description Box */}
        <div className="bg-white/5 border-l-4 border-white/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-md">
          <p className="body-large mb-4 text-primary text-shadow-sm">
            <span className="block heading-4 mb-2 text-shadow">
              Full Stack Developer (React + Django)
            </span>
            <span className="italic body-base text-secondary text-shadow-sm">
              "Coding is just another way to create art, and that's what keeps me excited about every project."
            </span>
          </p>
          <p className="body-base text-secondary text-shadow-sm">
            I have an{' '}
            <a
              href="https://www.instagram.com/otakutheartist"
              className="text-yellow-300 hover:underline transition-colors duration-300 text-shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              artistic background
            </a>
            , which is probably why I'm drawn to creating anime and gaming-inspired websites filled with color, motion, and personality. I love building interfaces that feel alive, where every animation or transition adds to the experience, like it's part of a story.
          </p>
          <p className="body-base text-secondary text-shadow-sm mt-4">
            Even though I enjoy the creativity of frontend work, I also like diving into the backend. Writing the logic that powers everything behind the scenes is just as fun. I don't like choosing between the two — I enjoy building the whole experience, from the visual design to the working engine underneath.
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="heading-3 text-primary text-shadow mb-6">Skills</h3>
          
          {/* Skill Tags */}
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
                className="bg-gradient-primary text-white rounded-full px-3 sm:px-4 py-1.5 text-sm sm:text-sm font-medium shadow"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>

    {/* Timeline Section */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <h3 className="heading-2 text-primary text-shadow-lg mb-12 text-center">My Journey</h3>
      <Timeline />
    </motion.div>

    {/* Testimonials Section */}
    <Testimonials />
  </section>
);

export default About;
