import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ProjectFilter from './ProjectFilter';
import LazyImage from './LazyImage';
import { LoadingOverlay, SkeletonLoader, ErrorState } from './LoadingStates';
import { errorHandler } from '../utils/errorHandler';
import { performanceMonitor } from '../utils/performanceMonitor';
import Project1 from '/image/Project1.png';
import Project2 from '/image/Project2.png';
import Project3 from '/image/Project3.png';
import Project4 from '/image/Project4.png';
import Project5 from '/image/Project5.png';
import Project6 from '/image/Project6.png';
import Project7 from '/image/Project7.png';

const projects = [
  {
    image: Project7,
    title: 'Entrepreneur Portfolio Website',
    description: 'A sophisticated portfolio website for a multi-industry entrepreneur showcasing 4 businesses generating $2M+ revenue across F&B, design, textiles, and software sectors.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    code: null,
    live: 'https://bilal-portfolio-jwwe.vercel.app',
    category: 'Full Stack',
    featured: true
  },
  {
    image: Project1,
    title: 'Anime Character Battle Simulator (In-progress)',
    description: 'A full-stack web app where users build teams of anime characters and simulate turn-based battles with dynamic stats, animations, and battle logs.',
    tags: ['React', 'Redux Toolkit', 'RTK Query', 'Tailwind CSS', 'Framer Motion', 'Django REST Framework', 'PostgreSQL', 'JWT Auth'],
    code: 'https://github.com/hamzahatake/DBZ-Battle-Simulator',
    live: 'https://dbz-battle-simulator-weld.vercel.app',
    category: 'Full Stack',
    featured: false
  },
  {
    image: Project2,
    title: 'HR Portal App (In-progress)',
    description: 'An internal HR management interface with employee listings, department filters, and streamlined navigation for efficient team oversight.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'REST API'],
    code: 'https://github.com/hamzahatake/HR-Portal-App-WIP',
    live: 'https://hr-portal-app.vercel.app',
    category: 'Frontend',
    featured: false
  },
  {
    image: Project3,
    title: 'ShopEase Redux E-Commerce Store',
    description: 'A clean e-commerce interface with responsive design, dynamic product listings, and smooth user interactions—built for both usability and performance.',
    tags: ['React', 'JavaScript', 'Redux Toolkit', 'Tailwind CSS'],
    code: 'https://github.com/hamzahatake/redux-ecommerce-store-WIP',
    live: 'https://redux-ecommerce-store-wip.vercel.app',
    category: 'Frontend',
    featured: false
  },
  {
    image: Project4,
    title: 'Anime Search App',
    description: 'A fast anime lookup app that allows users to search and explore anime titles using the Jikan API, with clean UI and instant search feedback.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Jikan API'],
    code: 'https://github.com/hamzahatake/Anime-Search-App',
    live: 'https://anime-search-app-seven.vercel.app/',
    category: 'API Integration',
    featured: false
  },
  {
    image: Project5,
    title: 'Movie App',
    description: 'A modern movie browsing app that lets users explore trending films using The Movie Database (TMDb) API, with detailed views and search functionality.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'TMDb API'],
    code: 'https://github.com/hamzahatake/Movies-App',
    live: 'https://movies-app-blue-three.vercel.app',
    category: 'API Integration',
    featured: false
  },
  {
    image: Project6,
    title: 'Weather App',
    description: 'A sleek, responsive app that shows real-time weather data for any city using the OpenWeatherMap API.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'OpenWeatherMap API'],
    code: 'https://github.com/hamzahatake/Weather-App',
    live: 'https://weather-app-topaz-pi.vercel.app',
    category: 'API Integration',
    featured: false
  }
];

const ProjectCard = ({ image, title, description, live, code, tags, index, featured }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    viewport={{ once: true }}
    className="group relative"
    whileHover={{ 
      y: -10,
      transition: { duration: 0.3 }
    }}
  >
    <motion.div
      className="card-glass rounded-2xl shadow-lg flex flex-col overflow-hidden h-[500px] transition-all duration-500 group-hover:shadow-2xl"
      whileHover={{
        rotateY: 5,
        rotateX: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Featured badge */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
          className="absolute top-4 right-4 z-10 bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
        >
          Featured
        </motion.div>
      )}

      <div className="h-48 w-full overflow-hidden bg-gradient-primary relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading={index < 3 ? 'eager' : 'lazy'}
          onError={(e) => {
            e.target.src = '/image/placeholder.jpg';
          }}
        />
        
        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
        >
          <motion.a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-4 py-2 rounded-full text-sm font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt className="inline mr-2" />
            Live Demo
          </motion.a>
          {code && (
            <motion.a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-4 py-2 rounded-full text-sm font-semibold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="inline mr-2" />
              Code
            </motion.a>
          )}
        </motion.div>
      </div>

      <div className="flex-grow flex flex-col justify-between p-6">
        <div className="flex-grow">
          <h3 className="heading-4 text-primary text-shadow mb-2 group-hover:text-glow transition-all duration-300 line-clamp-2">{title}</h3>
          <p className="body-small text-secondary text-shadow-sm mb-4 line-clamp-3">{description}</p>

          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + 0.4 + i * 0.1, duration: 0.3 }}
                className="bg-gradient-primary text-white rounded-full px-3 py-1 font-semibold text-xs shadow-md hover:scale-105 transition-transform duration-200"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex gap-2 justify-center">
            <motion.a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-glow transition-colors duration-300 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Demo
            </motion.a>
            {code && (
              <>
                <span className="text-secondary">•</span>
                <motion.a
                  href={code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors duration-300 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Code
                </motion.a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const filters = ['All', 'Full Stack', 'Frontend', 'API Integration'];

  useEffect(() => {
    performanceMonitor.startTiming('projects-load');
    
    // Simulate loading projects data
    const timer = setTimeout(() => {
      setIsLoading(false);
      performanceMonitor.endTiming('projects-load');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  if (error) {
    return (
      <section 
        id="projects" 
        className="text-primary py-24 px-6"
        role="region"
        aria-label="Projects section"
      >
        <div className="max-w-6xl mx-auto">
          <ErrorState 
            message="Failed to load projects"
            onRetry={() => {
              setError(null);
              setIsLoading(true);
              // Retry logic here
            }}
          />
        </div>
      </section>
    );
  }

  return (
    <section 
      id="projects" 
      className="text-primary py-24 px-6"
      role="region"
      aria-label="Projects section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="heading-2 text-primary text-shadow-lg mb-12 text-center"
          role="heading"
          aria-level="2"
        >
          Projects
        </motion.h2>

        <ProjectFilter 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filters={filters}
        />

        <LoadingOverlay loading={isLoading} message="Loading projects...">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
            role="grid"
            aria-label="Projects grid"
          >
            {isLoading ? (
              // Skeleton loaders while loading
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonLoader
                  key={index}
                  variant="card"
                  className="h-96"
                />
              ))
            ) : (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} index={index} {...project} />
              ))
            )}
          </motion.div>
        </LoadingOverlay>
      </div>
    </section>
  );
};

export default Projects;
