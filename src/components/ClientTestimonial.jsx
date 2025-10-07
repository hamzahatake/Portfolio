import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaUser } from 'react-icons/fa';

const ClientTestimonial = ({ 
  testimonial = {},
  className = "",
  animated = true
}) => {
  const {
    quote = "",
    author = "",
    role = "",
    company = "",
    rating = 5,
    avatar = null,
    verified = false
  } = testimonial;

  if (!quote) return null;

  const getStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        className={`text-sm ${
          i < rating ? 'text-yellow-400' : 'text-gray-400'
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, duration: 0.3 }}
      >
        ★
      </motion.span>
    ));
  };

  return (
    <motion.div
      className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Quote Icon */}
      <motion.div
        className="text-blue-400 text-2xl mb-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <FaQuoteLeft />
      </motion.div>

      {/* Quote Text */}
      <motion.p
        className="text-white text-sm leading-relaxed mb-4 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        "{quote}"
      </motion.p>

      {/* Rating */}
      <motion.div
        className="flex items-center gap-1 mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {getStars(rating)}
      </motion.div>

      {/* Author Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt={author}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaUser />
          )}
        </motion.div>

        {/* Author Details */}
        <div className="flex-1">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <h4 className="font-semibold text-white text-sm">{author}</h4>
            {verified && (
              <motion.div
                className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.2 }}
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            )}
          </motion.div>
          
          <motion.p
            className="text-gray-300 text-xs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {role} {company && `at ${company}`}
          </motion.p>
        </div>
      </div>

      {/* Animated Background Elements */}
      {animated && (
        <>
          <motion.div
            className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}
    </motion.div>
  );
};

// Testimonials Carousel Component
export const TestimonialsCarousel = ({ 
  testimonials = [],
  className = "",
  autoPlay = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex"
        animate={{ x: -currentIndex * 100 + '%' }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <ClientTestimonial testimonial={testimonial} />
          </div>
        ))}
      </motion.div>

      {/* Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
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

export default ClientTestimonial;

