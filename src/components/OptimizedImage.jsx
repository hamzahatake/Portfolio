import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Custom hook for intersection observer
const useInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, inView];
};

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/image/placeholder.jpg',
  fallback = '/image/fallback.jpg',
  lazy = true,
  priority = false,
  sizes = '100vw',
  quality = 75,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholder);
  const [imageRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Check if WebP is supported
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Generate optimized image URL
  const getOptimizedSrc = (originalSrc) => {
    if (originalSrc.startsWith('http') || originalSrc.startsWith('data:')) {
      return originalSrc;
    }
    
    // For local images, we'll use the original for now
    // In production, you'd integrate with an image optimization service
    return originalSrc;
  };

  useEffect(() => {
    if (!lazy || inView || priority) {
      const optimizedSrc = getOptimizedSrc(src);
      
      const img = new Image();
      img.onload = () => {
        setImageSrc(optimizedSrc);
        setIsLoading(false);
      };
      img.onerror = () => {
        setImageSrc(fallback);
        setHasError(true);
        setIsLoading(false);
      };
      img.src = optimizedSrc;
    }
  }, [src, inView, lazy, priority, fallback]);

  const handleImageError = () => {
    if (!hasError) {
      setImageSrc(fallback);
      setHasError(true);
    }
  };

  return (
    <div 
      ref={lazy ? imageRef : null}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
        >
          <div className="w-full h-full bg-gray-300 animate-shimmer" />
        </motion.div>
      )}

      {/* Main image */}
      <motion.img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: '300px 200px'
        }}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
