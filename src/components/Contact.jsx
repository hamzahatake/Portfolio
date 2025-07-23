import { useState } from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! (Form handling to be implemented)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="w-[90%] max-w-[1000px] mx-auto mt-16 bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl shadow-2xl p-10 flex flex-col items-stretch animate-fadeIn">
      <h2 className="text-4xl font-bold text-slate-800 mb-10 text-center tracking-wide drop-shadow-sm">Contact Me</h2>

      <div className="flex flex-wrap gap-16 justify-between items-start">
        {/* Contact Form */}
        <form
          className="flex-1 min-w-[320px] flex flex-col gap-6 animate-slideUp"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-slate-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="py-3 px-4 border border-slate-300 rounded-xl text-base bg-slate-100 focus:border-sky-400 focus:outline-none focus:shadow-md transition duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-slate-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="py-3 px-4 border border-slate-300 rounded-xl text-base bg-slate-100 focus:border-sky-400 focus:outline-none focus:shadow-md transition duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-semibold text-slate-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="py-3 px-4 border border-slate-300 rounded-xl text-base bg-slate-100 focus:border-sky-400 focus:outline-none focus:shadow-md transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-sky-400 to-sky-500 text-white py-3 px-8 rounded-full font-bold text-lg shadow-lg transition hover:from-sky-500 hover:to-sky-600"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info & Socials */}
        <div className="flex-1 min-w-[220px] flex flex-col gap-5 animate-fadeIn text-slate-800">
          <h3 className="text-2xl font-semibold">Let’s Connect</h3>
          <p className="text-slate-700 leading-relaxed">
            Feel free to reach out to me through the form or directly via email.
          </p>
          <p>
            Email:{' '}
            <a
              href="mailto:hamzasarwarhs777@gmail.com"
              className="text-sky-500 hover:text-sky-600 transition font-medium"
            >
              hamzasarwarhs777@gmail.com
            </a>
          </p>
          <div className="flex gap-6 mt-2">
            <a
              href="#"
              title="LinkedIn"
              className="text-slate-700 hover:text-sky-400 text-3xl transition-transform hover:scale-110 hover:-rotate-3"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              title="Instagram"
              className="text-slate-700 hover:text-pink-500 text-3xl transition-transform hover:scale-110 hover:rotate-3"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              title="GitHub"
              className="text-slate-700 hover:text-slate-900 text-3xl transition-transform hover:scale-110 hover:-rotate-3"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
