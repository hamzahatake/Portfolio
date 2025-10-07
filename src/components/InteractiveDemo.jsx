import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaPlay, FaPause, FaExpand, FaCompress, FaExternalLinkAlt } from 'react-icons/fa';

const InteractiveDemo = ({ 
  type = "iframe",
  src,
  title,
  description,
  thumbnail,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openExternal = () => {
    window.open(src, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Demo Container */}
      <motion.div
        className={`relative bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden ${
          isFullscreen ? 'fixed inset-4 z-50' : 'w-full h-64'
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Thumbnail/Preview */}
        {!isPlaying && (
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <motion.button
                onClick={togglePlay}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className="text-2xl" />
              </motion.button>
            </div>

            {/* Demo info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
              <p className="text-white/80 text-xs">{description}</p>
            </div>
          </motion.div>
        )}

        {/* Interactive Content */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {type === "iframe" && (
                <iframe
                  src={src}
                  className="w-full h-full border-0"
                  allowFullScreen
                  title={title}
                />
              )}
              
              {type === "video" && (
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute top-2 right-2 flex gap-2">
          <motion.button
            onClick={togglePlay}
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
          </motion.button>

          <motion.button
            onClick={toggleFullscreen}
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFullscreen ? <FaCompress className="text-sm" /> : <FaExpand className="text-sm" />}
          </motion.button>

          <motion.button
            onClick={openExternal}
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt className="text-sm" />
          </motion.button>
        </div>
      </motion.div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleFullscreen}
        >
          <motion.div
            className="relative w-full h-full max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fullscreen content will be rendered here */}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveDemo;

