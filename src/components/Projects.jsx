import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaCode, FaRocket, FaPlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ProjectFilter from './ProjectFilter';
import LazyImage from './LazyImage';
import { LoadingOverlay, ErrorState } from './LoadingStates';
import { errorHandler } from '../utils/errorHandler';
import { performanceMonitor } from '../utils/performanceMonitor';
import { useMagneticHover } from '../hooks/useMagneticHover';
import { DisplayText, BodyText, GlowText, AnimatedCounter } from './Typography';
import ProgressIndicator, { CircularProgress } from './ProgressIndicator';
import InteractiveDemo from './InteractiveDemo';
import GradientMesh from './GradientMesh';
import AnimatedTechIcon from './AnimatedTechIcon';
import ParticleSystem from './ParticleSystem';
import DynamicLighting from './DynamicLighting';
import SmoothTransition, { SmoothLink } from './SmoothTransition';
import { SuccessAnimation, ErrorAnimation, LoadingState, SkeletonLoader } from './InteractionFeedback';
import ProjectMetrics from './ProjectMetrics';
import ClientTestimonial, { TestimonialsCarousel } from './ClientTestimonial';
import BeforeAfterComparison from './BeforeAfterComparison';
import Project1 from '/image/Project1.png';
import Project2 from '/image/Project2.png';
import Project3 from '/image/Project3.png';
import Project4 from '/image/Project4.png';
import Project5 from '/image/Project5.png';
import Project6 from '/image/Project6.png';
import Project7 from '/image/Project7.png';
import Project8 from '/image/Project8.png';

const projects = [
  {
    image: Project8,
    title: 'My Art Portfolio - OtakuTheArtist',
    description: 'A stunning art portfolio showcasing anime illustrations, character designs, and digital art. Features commission calculator, client testimonials, and interactive gallery with 120+ satisfied clients and 98% satisfaction rate.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Frontend'],
    code: null,
    live: 'https://my-art-portfolio-six.vercel.app',
    category: 'Frontend',
    featured: true,
    progress: 100,
    categoryColor: 'purple',
    priority: 'high',
    demo: {
      type: 'iframe',
      src: 'https://my-art-portfolio-six.vercel.app',
      title: 'Art Portfolio Demo',
      description: 'Interactive art portfolio showcase'
    },
    metrics: {
      users: 5000,
      timeToComplete: 21,
      rating: 4.9,
      performance: 96,
      satisfaction: 98,
      achievements: ['Best Art Portfolio 2024', 'Client Choice Award', 'Creative Excellence']
    },
    testimonial: {
      quote: "This portfolio perfectly showcases my artistic journey from traditional sketches to digital mastery. The commission calculator and interactive features have significantly increased my client inquiries and bookings.",
      author: "Hamza Sarwar",
      role: "2D Anime Illustrator",
      company: "OtakuTheArtist",
      rating: 5,
      verified: true
    },
    beforeAfter: {
      beforeImage: Project1,
      afterImage: Project8,
      beforeTitle: "Basic Portfolio",
      afterTitle: "Interactive Art Gallery"
    }
  },
  {
    image: Project7,
    title: 'From $0 to $2M: The Portfolio That Transformed a Multi-Industry Empire',
    description: 'A sophisticated portfolio website for a multi-industry entrepreneur showcasing 4 businesses generating $2M+ revenue across F&B, design, textiles, and software sectors.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    code: null,
    live: 'https://bilal-portfolio-jwwe.vercel.app',
    category: 'Full Stack',
    featured: true,
    progress: 100,
    categoryColor: 'blue',
    priority: 'high',
    demo: {
      type: 'iframe',
      src: 'https://bilal-portfolio-jwwe.vercel.app',
      title: 'Live Portfolio Demo',
      description: 'Interactive portfolio showcase'
    },
    metrics: {
      users: 50000,
      timeToComplete: 14,
      rating: 4.9,
      performance: 95,
      satisfaction: 98,
      achievements: ['Best Portfolio 2024', 'Client Choice Award', 'Design Excellence']
    },
    testimonial: {
      quote: "This portfolio completely transformed our business. We went from struggling startups to a $2M+ empire. The design and functionality are absolutely incredible.",
      author: "Bilal Ahmed",
      role: "CEO",
      company: "Multi-Industry Holdings",
      rating: 5,
      verified: true
    },
    beforeAfter: {
      beforeImage: Project1,
      afterImage: Project7,
      beforeTitle: "Old Website",
      afterTitle: "New Portfolio"
    }
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

const ProjectCard = ({ 
  image, 
  title, 
  description, 
  live, 
  code, 
  tags, 
  index, 
  featured, 
  demo,
  category,
  categoryColor = 'blue',
  priority = 'medium',
  metrics = {},
  testimonial = {},
  beforeAfter = {}
}) => {
  const { position, elementRef, handleMouseMove, handleMouseLeave } = useMagneticHover(0.2);
  const [showDemo, setShowDemo] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showTestimonial, setShowTestimonial] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    viewport={{ once: true }}
    className="group relative"
    whileHover={{ 
        y: -15,
        transition: { duration: 0.4, ease: "easeOut" }
    }}
  >
    <motion.div
        ref={elementRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-700 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ${
          priority === 'high' ? 'h-[550px]' : 
          tags.length > 6 ? 'h-[520px]' : 'h-[500px]'
        }`}
      style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transformStyle: 'preserve-3d',
          perspective: '1000px',
          boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1)'
        }}
        whileHover={{
          rotateY: position.x * 0.1,
          rotateX: -position.y * 0.1,
          scale: 1.03,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
      >
        {/* Performance-Optimized Background Effects */}
        {featured && (
          <>
            <GradientMesh 
              intensity="medium"
              colors={categoryColor === 'blue' ? ["#3b82f6", "#8b5cf6"] : 
                      categoryColor === 'purple' ? ["#8b5cf6", "#ec4899"] :
                      categoryColor === 'green' ? ["#10b981", "#3b82f6"] :
                      ["#f59e0b", "#ef4444"]}
            />
            
            <DynamicLighting 
              intensity="medium"
              color={categoryColor}
            />
            
            <ParticleSystem 
              count={15}
              featured={false}
              color={categoryColor}
            />
          </>
        )}
        
        {/* Simple gradient for non-featured cards */}
        {!featured && (
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${categoryColor === 'blue' ? '#3b82f620' : 
                          categoryColor === 'purple' ? '#8b5cf620' :
                          categoryColor === 'green' ? '#10b98120' : '#f59e0b20'}, transparent 70%)`
            }}
          />
        )}
        {/* Premium Glass Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-white/10 rounded-3xl" />
        
        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
            filter: 'blur(1px)'
          }}
          animate={{
            background: [
              'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
              'linear-gradient(225deg, transparent, rgba(255,255,255,0.1), transparent)',
              'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {/* Category Indicator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.2, duration: 0.4 }}
          className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20 ${
            categoryColor === 'blue' ? 'bg-blue-500/20 text-blue-300' :
            categoryColor === 'purple' ? 'bg-purple-500/20 text-purple-300' :
            categoryColor === 'green' ? 'bg-green-500/20 text-green-300' :
            'bg-orange-500/20 text-orange-300'
          }`}
        >
          {category}
        </motion.div>

      {/* Featured badge */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
            className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.05, rotate: 2 }}
        >
            ⭐ Featured
        </motion.div>
      )}

        {/* Enhanced Image Section with Dynamic Height */}
        <div className={`w-full overflow-hidden relative bg-gradient-to-br from-slate-900 to-slate-800 ${
          tags.length > 6 ? 'h-56' : 'h-48'
        }`}>
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)',
                'linear-gradient(225deg, rgba(255,255,255,0.1), transparent)',
                'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Single Image Only */}
          <motion.img
          src={image}
          alt={title}
            className="w-full h-full object-cover relative z-10"
          loading={index < 3 ? 'eager' : 'lazy'}
          onError={(e) => {
            e.target.src = '/image/placeholder.jpg';
          }}
            whileHover={{
              scale: 1.1,
              rotate: 1,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
            style={{
              transform: `translateZ(${position.y * 0.1}px)`,
            }}
          />
          
          {/* Parallax overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20"
            style={{
              transform: `translateY(${position.y * 0.05}px)`,
            }}
          />
          
          
          {/* Enhanced hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center gap-3 z-30"
            transition={{ duration: 0.3 }}
        >
            <motion.a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
          >
              <FaRocket className="inline mr-1" />
              Live
          </motion.a>
            
          {code && (
            <motion.a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
                className="bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl hover:bg-black/60 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
            >
                <FaCode className="inline mr-1" />
              Code
            </motion.a>
          )}
            
            {demo && (
              <motion.button
                onClick={() => setShowDemo(!showDemo)}
                className="bg-purple-500/40 backdrop-blur-md border border-purple-400/30 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl hover:bg-purple-500/60 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                <FaPlay className="inline mr-1" />
                Demo
              </motion.button>
            )}

            {/* Metrics Button */}
            {Object.keys(metrics).length > 0 && (
              <motion.button
                onClick={() => setShowMetrics(!showMetrics)}
                className="bg-green-500/40 backdrop-blur-md border border-green-400/30 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl hover:bg-green-500/60 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                📊 Metrics
              </motion.button>
            )}

            {/* Testimonial Button */}
            {Object.keys(testimonial).length > 0 && (
              <motion.button
                onClick={() => setShowTestimonial(!showTestimonial)}
                className="bg-yellow-500/40 backdrop-blur-md border border-yellow-400/30 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl hover:bg-yellow-500/60 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                💬 Review
              </motion.button>
            )}

            {/* Before/After Button */}
            {Object.keys(beforeAfter).length > 0 && (
              <motion.button
                onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                className="bg-pink-500/40 backdrop-blur-md border border-pink-400/30 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl hover:bg-pink-500/60 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
              >
                🔄 Compare
              </motion.button>
          )}
        </motion.div>
      </div>

        {/* Interactive Demo Modal */}
        {showDemo && demo && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <InteractiveDemo
                type={demo.type}
                src={demo.src}
                title={demo.title}
                description={demo.description}
                className="w-full h-96"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Metrics Modal */}
        {showMetrics && Object.keys(metrics).length > 0 && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMetrics(false)}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Project Metrics</h3>
              <ProjectMetrics metrics={metrics} />
            </motion.div>
          </motion.div>
        )}

        {/* Testimonial Modal */}
        {showTestimonial && Object.keys(testimonial).length > 0 && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTestimonial(false)}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Client Testimonial</h3>
              <ClientTestimonial testimonial={testimonial} />
            </motion.div>
          </motion.div>
        )}

        {/* Before/After Modal */}
        {showBeforeAfter && Object.keys(beforeAfter).length > 0 && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBeforeAfter(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Before & After Comparison</h3>
              <BeforeAfterComparison {...beforeAfter} className="h-96" />
            </motion.div>
          </motion.div>
        )}

        {/* Premium Content Section with Smart Spacing */}
        <div className="flex-grow flex flex-col justify-between p-6 relative z-10">
        <div className="flex-grow">
            {/* Clean Typography without Highlights */}
            <motion.h3 
              className="text-xl font-bold text-white leading-tight line-clamp-2"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontFamily: 'Space Grotesk, system-ui, sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em',
                marginBottom: tags.length > 6 ? '0.5rem' : '0.75rem'
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {title}
            </motion.h3>
            
            <BodyText
              variant="small"
              weight="normal"
              className="text-gray-300 line-clamp-3"
              style={{
                marginBottom: tags.length > 6 ? '1rem' : '1.5rem'
              }}
              animate={true}
              whileHover={{ 
                color: '#e2e8f0',
                transition: { duration: 0.3 }
              }}
            >
              {description}
            </BodyText>


            {/* Enhanced Tags with Smart Layout */}
            <div className={`flex flex-wrap justify-center ${
              tags.length > 6 ? 'gap-1.5' : 'gap-2'
            }`}>
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.2 + 0.4 + i * 0.1, 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className={`bg-gradient-to-r ${
                    categoryColor === 'blue' ? 'from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30' :
                    categoryColor === 'purple' ? 'from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30' :
                    categoryColor === 'green' ? 'from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30' :
                    'from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30'
                  } backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold text-xs shadow-lg hover:scale-110 transition-all duration-300 relative overflow-hidden ${
                    tags.length > 6 ? 'px-3 py-1.5' : 'px-4 py-2'
                  }`}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Animated background shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  
                  <span className={`relative z-10 flex items-center ${
                    tags.length > 6 ? 'gap-1' : 'gap-2'
                  }`}>
                    <AnimatedTechIcon 
                      technology={tag} 
                      size={tags.length > 6 ? 12 : 14}
                      className="flex-shrink-0"
                    />
                    <span className={tags.length > 6 ? 'text-xs' : 'text-xs'}>
                {tag}
                    </span>
                  </span>
              </motion.span>
            ))}
          </div>
        </div>

          {/* Enhanced Footer with Premium Styling */}
          <motion.div 
            className="mt-6 pt-4 border-t border-white/10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.8 }}
          >
            <div className="flex gap-3 justify-center">
              <SmoothLink
              href={live}
                className="flex-1 text-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl text-sm font-bold hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaRocket className="text-xs" />
                  <BodyText weight="bold" variant="xs" className="text-white">
              Live Demo
                  </BodyText>
                </span>
              </SmoothLink>
              
            {code && (
                <SmoothLink
                  href={code}
                  className="flex-1 text-center bg-gradient-to-r from-gray-700/20 to-gray-800/20 backdrop-blur-sm border border-white/10 text-white px-4 py-3 rounded-xl text-sm font-bold hover:from-gray-700/30 hover:to-gray-800/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-700/10 to-gray-800/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaCode className="text-xs" />
                    <BodyText weight="bold" variant="xs" className="text-white">
                      Source Code
                    </BodyText>
                  </span>
                </SmoothLink>
            )}
          </div>
          </motion.div>
      </div>
    </motion.div>
  </motion.div>
);
};

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
