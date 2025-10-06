import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import { performanceMonitor } from './utils/performanceMonitor';
import { useEffect } from 'react';
import ParallaxElement from './components/ParallaxElement';

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.monitorWebVitals();
    performanceMonitor.monitorResources();
    
    // Log performance report on page unload
    const handleBeforeUnload = () => {
      const report = performanceMonitor.getReport();
      console.log('Performance Report:', report);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      performanceMonitor.cleanup();
    };
  }, []);

  return (
    <ThemeProvider>
      <LoadingScreen />
      <PageTransition>
        <Navbar />
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
