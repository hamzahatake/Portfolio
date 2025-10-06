import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Hamza's attention to detail and creative approach to problem-solving makes him an exceptional developer. His anime-inspired designs are both functional and visually stunning.",
      author: "Sarah Johnson",
      role: "UI/UX Designer",
      company: "Creative Studio"
    },
    {
      text: "Working with Hamza was a pleasure. He delivered a complex full-stack application on time with clean, maintainable code. His passion for development really shows in his work.",
      author: "Michael Chen",
      role: "Project Manager",
      company: "Tech Solutions Inc."
    },
    {
      text: "Hamza's ability to translate complex requirements into beautiful, user-friendly interfaces is impressive. His artistic background really enhances his development skills.",
      author: "Emily Rodriguez",
      role: "Product Owner",
      company: "Digital Innovations"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="heading-2 text-primary text-shadow-lg mb-12 text-center"
      >
        What People Say
      </motion.h3>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="card-glass p-8 rounded-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-6xl text-primary mb-6"
          >
            "
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="body-large text-secondary text-shadow-sm mb-8 italic"
          >
            {testimonials[currentTestimonial].text}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <h4 className="heading-4 text-primary text-shadow mb-1">
              {testimonials[currentTestimonial].author}
            </h4>
            <p className="body-small text-secondary">
              {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
            </p>
          </motion.div>
        </motion.div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-gradient-primary scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
