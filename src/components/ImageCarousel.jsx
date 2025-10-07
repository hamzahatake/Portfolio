import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';

const ImageCarousel = ({ 
  images, 
  autoPlay = true, 
  interval = 3000,
  className = "",
  showControls = true,
  showIndicators = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, images.length, interval]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative"
        >
          <img
            src={images[currentIndex]}
            alt={`Preview ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {showControls && images.length > 1 && (
        <>
          <motion.button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft className="text-sm" />
          </motion.button>

          <motion.button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronRight className="text-sm" />
          </motion.button>

          <motion.button
            onClick={togglePlayPause}
            className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
          </motion.button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

