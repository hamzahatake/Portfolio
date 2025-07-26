import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import Project1 from '/image/Project1.png';
import Project2 from '/image/Project2.png';
import Project3 from '/image/Project3.png';
import Project4 from '/image/Project4.png';
import Project5 from '/image/Project5.png';

const projects = [
  {
    image: Project1,
    title: 'Anime Character Battle Simulator (In-progress)',
    description:
      'A full-stack web app where users build teams of anime characters and simulate turn-based battles with dynamic stats, animations, and battle logs.',
    live: 'https://dbz-battle-simulator-neon.vercel.app',
    code: 'https://github.com/hamzahatake/DBZ-Battle-Simulator',
    tags: [
      'React', 'Redux Toolkit', 'RTK Query', 'Tailwind CSS',
      'Framer Motion', 'Django REST Framework', 'PostgreSQL', 'JWT Auth',
    ],
  },
  {
    image: Project2,
    title: 'HR Portal App (In-progress)',
    description:
      'An internal HR management interface with employee listings, department filters, and streamlined navigation for efficient team oversight.',
    live: 'https://hr-portal-app.vercel.app',
    code: 'https://github.com/hamzahatake',
    tags: ['React', 'JavaScript', 'TailwindCSS', 'REST API'],
  },
  {
    image: Project3,
    title: 'Anime Search App',
    description:
      'A fast anime lookup app that allows users to search and explore anime titles using the Jikan API, with clean UI and instant search feedback.',
    tags: ['React', 'JavaScript', 'TailwindCSS', 'JikanAPI'],
    code: 'https://github.com/hamzahatake',
    live: 'https://anime-search-app-seven.vercel.app/',
  },
  {
    image: Project4,
    title: 'Movie App',
    description:
      'A modern movie browsing app that lets users explore trending films using The Movie Database (TMDb) API, with detailed views and search functionality.',
    tags: ['React', 'JavaScript', 'TailwindCSS', 'TMDb API'],
    code: 'https://github.com/hamzahatake',
    live: 'https://movies-app-blue-three.vercel.app',
  },
  {
    image: Project5,
    title: 'Weather App',
    description:
      'A sleek, responsive app that shows real-time weather data for any city using the OpenWeatherMap API.',
    tags: ['React', 'JavaScript', 'TailwindCSS', 'OpenWeatherMap API'],
    code: 'https://github.com/hamzahatake',
    live: 'https://weather-app-topaz-pi.vercel.app',
  },
];

const ProjectCard = ({ image, title, description, live, code, tags, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur-md flex flex-col overflow-hidden min-h-[450px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    {/* Image */}
    <div className="h-48 w-full overflow-hidden bg-sky-800/30">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Content */}
    <div className="flex-grow flex flex-col justify-between p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/90 text-sm mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-full px-4 py-2 font-semibold text-sm shadow-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 text-white text-sm mt-auto justify-center">
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline hover:text-sky-300"
        >
          <FaExternalLinkAlt className="text-xs" />
          Live
        </a>
        <a
          href={code}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline hover:text-sky-300"
        >
          <FaGithub className="text-base" />
          Code
        </a>
      </div>
    </div>
  </motion.div>
);

const Projects = () => (
  <section id="projects" className="bg-sky-600 text-white py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center drop-shadow-sm"
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} index={index} {...project} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
