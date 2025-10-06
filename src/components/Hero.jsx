import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import TypingAnimation from './TypingAnimation';
import ProfileImage from './ProfileImage';
import ModernButton from './ModernButton';
import AnimatedIcon from './AnimatedIcon';
import { FaArrowDown, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SkipLink, Announcement } from './AccessibilityUtils';
import { LoadingOverlay, SkeletonLoader } from './LoadingStates';
import { performanceMonitor } from '../utils/performanceMonitor';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [announcement, setAnnouncement] = useState('');

  // Apply smooth scroll behavior globally (for copy-paste simplicity)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Performance monitoring
    performanceMonitor.startTiming('hero-load');
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
      performanceMonitor.endTiming('hero-load');
      setAnnouncement('Hero section loaded successfully');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const typingTexts = [
    "Full-Stack Developer",
    "React Specialist", 
    "Django Expert",
    "Problem Solver"
  ];

  return (
    <section 
      className="min-h-screen flex items-center justify-center text-primary relative overflow-hidden" 
      id="hero"
      role="banner"
      aria-label="Hero section"
    >
      {/* Skip Link */}
      <SkipLink href="#projects" />
      
      {/* Announcement for screen readers */}
      <Announcement message={announcement} />
      
      {/* Loading Overlay */}
      <LoadingOverlay loading={isLoading} message="Loading hero section...">
        {/* Animated Background */}
        <AnimatedBackground />
      
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 px-4 relative z-10">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Greeting */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="heading-display text-primary text-glow-md mb-4"
            role="heading"
            aria-level="1"
          >
            Hi, I'm Hamza
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="heading-1 text-primary text-glow mb-6"
          >
            <TypingAnimation texts={typingTexts} />
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="body-large text-secondary text-shadow-md max-w-2xl mb-8"
          >
            Creating modern, interactive web experiences with a passion for clean code and beautiful design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex gap-4 flex-wrap justify-center lg:justify-start"
          >
            <ModernButton
              variant="gradient"
              size="large"
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                  setAnnouncement('Navigating to projects section');
                }
              }}
              aria-label="View my projects"
            >
              View Projects
            </ModernButton>
            <ModernButton
              variant="glass"
              size="large"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                  setAnnouncement('Navigating to contact section');
                }
              }}
              aria-label="Contact me"
            >
              Contact Me
            </ModernButton>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex gap-6 justify-center lg:justify-start mt-8"
          >
            <AnimatedIcon
              icon={<FaGithub />}
              size="large"
              animation="pulse"
              onClick={() => {
                window.open('https://github.com/hamzahatake', '_blank');
                setAnnouncement('Opening GitHub profile in new tab');
              }}
              aria-label="Visit my GitHub profile"
            />
            <AnimatedIcon
              icon={<FaLinkedin />}
              size="large"
              animation="float"
              onClick={() => {
                window.open('https://www.linkedin.com/in/hamza-sarwar-474509263/', '_blank');
                setAnnouncement('Opening LinkedIn profile in new tab');
              }}
              aria-label="Visit my LinkedIn profile"
            />
          </motion.div>
        </div>

        {/* Right Content - Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="flex-shrink-0"
        >
          <div className="w-80 h-80 lg:w-96 lg:h-96">
            <ProfileImage />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        role="button"
        tabIndex="0"
        aria-label="Scroll down to see more content"
        onClick={() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          setAnnouncement('Scrolling to projects section');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            setAnnouncement('Scrolling to projects section');
          }
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-secondary"
        >
          <span className="body-small mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
      </LoadingOverlay>
    </section>
  );
};

export default Hero;