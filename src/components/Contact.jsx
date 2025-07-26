import { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks for reaching out!');
    setForm({ name: '', email: '', message: '' });
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
      className="w-full bg-sky-600 px-6 py-16 text-white relative"
    >
      <h2 className="text-4xl font-extrabold mb-12 text-center">Contact Me</h2>

      <div className="flex flex-col lg:flex-row gap-12 justify-center items-center max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-sky-700/40 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full lg:w-[40%] space-y-6"
        >
          <h3 className="text-2xl font-semibold">Get in Touch</h3>
          <p>
            Email:{' '}
            <a
              href="mailto:hamzasarwarhs777@gmail.com"
              className="underline text-white hover:text-slate-200"
            >
              hamzasarwarhs777@gmail.com
            </a>
          </p>
          <div>
            <p className="font-semibold mb-2">Follow me</p>
            <div className="flex gap-6 text-2xl">
              <a
                href="https://www.linkedin.com/in/hamza-sarwar-474509263/"
                title="LinkedIn"
                className="hover:text-slate-300 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/otakutheartist"
                title="Instagram"
                className="hover:text-slate-300 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com/hamzahatake"
                title="GitHub"
                className="hover:text-slate-300 transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="w-full lg:w-[55%] bg-white rounded-2xl p-8 shadow-lg text-slate-700 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-semibold mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full py-3 px-4 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-full font-semibold shadow transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>

      {/* Scroll to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-white text-sky-600 p-3 rounded-full shadow-xl hover:bg-slate-100 transition-all duration-300 z-50"
          title="Back to top"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </motion.section>
  );
};

export default Contact;
