import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import project1 from '/image/Project1.png';
import project2 from '/image/Project2.png';
import project3 from '/image/Project3.png';
import project4 from '/image/Project4.png'
import project5 from '/image/Project5.png'

const projects = [
  {
    image: project1,
    title: 'Anime Character Battle Simulator (In-progress)',
    desc: 'A full-stack web app where users build teams of anime characters and simulate turn-based battles with dynamic stats, animations, and battle logs.',
    tech: ['React', 'Redux Toolkit', 'RTK Query', 'Tailwind CSS', 'Framer Motion', 'Django REST Framework', 'PostgreSQL', 'JWT Auth'],
    github: 'https://github.com/hamzahatake/Anime-Search-App',
    demo: 'https://dbz-battle-simulator-neon.vercel.app',
  },
  {
    image: project2,
    title: 'HR Portal App (In-progress)',
    desc: 'An internal HR management interface with employee listings, department filters, and streamlined navigation for efficient team oversight.',
    tech: ['React', 'JavaScript', 'TailwindCSS', 'REST API'],
    github: 'https://github.com/hamzahatake/HR-Portal-App-WIP',
    demo: 'https://hr-portal-app.vercel.app',
  },
  {
    image: project3,
    title: 'ShopEase Redux E-Commerce Store',
    desc: 'A clean e-commerce interface with responsive design, dynamic product listings, and smooth user interactions—built for both usability and performance.',
    tech: ['React', 'JavaScript', 'Redux Toolkit', 'TailwindCSS'],
    github: 'https://github.com/hamzahatake/redux-ecommerce-store-WIP',
    demo: 'https://redux-ecommerce-store-wip.vercel.app',
  },
  {
    image: project4,
    title: 'Anime Search App',
    desc: 'A fast anime lookup app that allows users to search and explore anime titles using the Jikan API, with clean UI and instant search feedback.',
    tech: ['React', 'JavaScript', 'TailwindCSS', 'JikanAPI'],
    github: 'https://github.com/hamzahatake/Anime-Search-App',
    demo: 'https://anime-search-app-seven.vercel.app/',
  },
  {
    image: project5,
    title: 'Movie App',
    desc: 'A modern movie browsing app that lets users explore trending films using The Movie Database (TMDb) API, with detailed views and search functionality.',
    tech: ['React', 'JavaScript', 'TailwindCSS', 'TMDb API'],
    github: 'https://github.com/hamzahatake/Movies-App',
    demo: 'https://movies-app-blue-three.vercel.app',
  },
  {
    image: project6,
    title: 'Weather App',
    desc: 'A sleek, responsive app that shows real-time weather data for any city using the OpenWeatherMap API.',
    tech: ['React', 'JavaScript', 'TailwindCSS', 'OpenWeatherMap API'],
    github: 'https://github.com/hamzahatake/Weather-App',
    demo: 'https://weather-app-topaz-pi.vercel.app',
  }
];

const ProjectCard = ({ project }) => (
  <div
    className="relative w-full min-w-[20rem] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] min-h-[26rem]"
  >
    {/* Project Image */}
    <div className="relative h-full min-h-[26rem] rounded-2xl overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover filter brightness-95 saturate-110 transition duration-300"
      />
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-900/70 backdrop-blur-sm text-white opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl h-full overflow-y-auto p-6 flex items-center justify-center">
        <div className="text-center w-full max-h-full space-y-4">
          <h3 className="text-2xl font-bold text-sky-400">{project.title}</h3>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{project.desc}</p>
          {/* Tech Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="bg-sky-500/90 text-white text-xs px-3 py-1 rounded-full font-semibold shadow hover:scale-105 transition-transform"
              >
                {t}
              </span>
            ))}
          </div>
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="bg-sky-400/20 rounded-full p-3 text-xl text-white hover:bg-sky-500 transition-all hover:shadow-md"
            >
              <FaGithub />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
              className="bg-sky-400/20 rounded-full p-3 text-xl text-white hover:bg-sky-500 transition-all hover:shadow-md"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Projects = () => (
  <section id="projects" className="w-[90%] max-w-[1200px] mx-auto mt-16 animate-fadeIn">
    <h2 className="text-4xl font-extrabold text-slate-800 mb-10 text-center tracking-tight">Projects</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
      {projects.map((project, idx) => (
        <ProjectCard key={idx} project={project} />
      ))}
    </div>
  </section>
);

export default Projects;
