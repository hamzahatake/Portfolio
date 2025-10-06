import { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ModernButton from './ModernButton';
import ModernCard from './ModernCard';
import { LoadingButton, ErrorState, SuccessState } from './LoadingStates';
import { AccessibleFormField, AccessibleButton } from './AccessibilityUtils';
import { errorHandler } from '../utils/errorHandler';
import { performanceMonitor } from '../utils/performanceMonitor';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    
    // Performance monitoring
    performanceMonitor.startTiming('contact-load');
    performanceMonitor.endTiming('contact-load');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      performanceMonitor.startTiming('contact-submit');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      performanceMonitor.endTiming('contact-submit');
      setSubmitStatus('success');
      setForm({ name: '', email: '', message: '' });
      
    } catch (error) {
      errorHandler.logError(error, { form: form });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="w-full px-6 py-24 text-primary relative"
    >
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="heading-2 text-primary text-shadow-lg mb-12 text-center">Contact Me</h2>

        <div className="flex flex-col lg:flex-row gap-12 justify-center items-center">
        {/* Contact Info */}
        <ModernCard
          variant="glass"
          className="w-full lg:w-[40%] space-y-6"
        >
          <h3 className="heading-3 text-primary text-shadow">Get in Touch</h3>
          <p className="body-base text-secondary text-shadow-sm">
            Email:{' '}
            <a
              href="mailto:hamzasarwarhs777@gmail.com"
              className="underline text-primary hover:text-secondary transition-colors duration-300 text-shadow-sm"
            >
              hamzasarwarhs777@gmail.com
            </a>
          </p>
          <div>
            <p className="heading-4 mb-2 text-primary text-shadow">Follow me</p>
            <div className="flex gap-6 text-2xl">
              <a
                href="https://www.linkedin.com/in/hamza-sarwar-474509263/"
                title="LinkedIn"
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/otakutheartist"
                title="Instagram"
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com/hamzahatake"
                title="GitHub"
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </ModernCard>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="w-full lg:w-[55%] bg-white rounded-2xl p-8 shadow-lg text-slate-700 space-y-5"
          role="form"
          aria-label="Contact form"
        >
          {submitStatus === 'success' && (
            <SuccessState message="Message sent successfully!" className="mb-4" />
          )}
          
          {submitStatus === 'error' && (
            <ErrorState 
              message="Failed to send message. Please try again." 
              onRetry={() => setSubmitStatus(null)}
              className="mb-4" 
            />
          )}

          <AccessibleFormField label="Name" error={errors.name} required>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition body-base ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
            />
          </AccessibleFormField>

          <AccessibleFormField label="Email" error={errors.email} required>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition body-base ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              }`}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
          </AccessibleFormField>

          <AccessibleFormField label="Message" error={errors.message} required>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className={`w-full py-3 px-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 transition body-base ${
                errors.message ? 'border-red-500' : 'border-slate-300'
              }`}
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={!!errors.message}
            />
          </AccessibleFormField>

          <LoadingButton
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full btn-primary py-3 px-6 rounded-lg font-semibold mt-2"
            aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </LoadingButton>
        </motion.form>
        </div>
      </div>

      {/* Scroll to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 btn-primary p-3 rounded-full shadow-xl hover:scale-110 transition-all duration-300 z-50"
          title="Back to top"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </motion.section>
  );
};

export default Contact;