import { ThemeProvider } from './contexts/ThemeContext';
import LeftNavbar from './components/LeftNavbar';
import RightNavbar from './components/RightNavbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import PerformanceMonitor from './components/PerformanceMonitor';
import { performanceMonitor } from './utils/performanceMonitor';
import { useEffect, useState } from 'react';
import ParallaxElement from './components/ParallaxElement';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.monitorWebVitals();
    performanceMonitor.monitorResources();
    
    // Log performance report on page unload
    const handleBeforeUnload = () => {
      const report = performanceMonitor.getReport();
      console.log('Performance Report:', report);
    };
    
    // Handle scroll for profile picture
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      performanceMonitor.cleanup();
    };
  }, []);

  return (
    <ThemeProvider>
      <LoadingScreen />
      <PerformanceMonitor />
      
      {/* Fixed Left and Right Navbars */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="flex justify-between items-center h-full min-h-screen px-6 py-4">
          {/* Left Navbar */}
          <div className="pointer-events-auto">
            <LeftNavbar />
          </div>
          
          {/* Right Navbar */}
          <div className="pointer-events-auto">
            <RightNavbar />
          </div>
        </div>
      </div>

      {/* Scroll-triggered Profile Picture */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: -100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-4 left-4 z-40 w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-lg backdrop-blur-sm"
          >
            <img
              src="/image/Hamza.jpg"
              alt="Hamza Sarwar"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <PageTransition>
        <Hero />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </PageTransition>
    </ThemeProvider>
  );
}

export default App;
