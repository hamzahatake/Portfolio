import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from 'react-icons/fa';
import hamzaImg from '/image/Hamza.png';

const skills = [
  'React.js',
  'Redux Toolkit',
  'RTK Query',
  'Tailwind CSS',
  'Framer Motion',
  'Django',
  'Django REST Framework',
  'REST API Development',
  'Authentication (Token-Based)',
  'PostgreSQL',
  'Full Stack Web Development',
];

const About = () => (
  <section className="w-[92%] max-w-[1100px] mx-auto mt-16 bg-gradient-to-br from-white/90 to-slate-100 backdrop-blur-sm rounded-3xl shadow-2xl border border-sky-200 p-10 flex flex-wrap items-start gap-12 animate-fadeIn">

    {/* Profile Image */}
    <div className="flex-shrink-0 flex items-center justify-center w-[160px] h-[160px] relative group">
      <img
        src={hamzaImg}
        alt="Hamza Profile"
        className="w-[160px] h-[160px] rounded-full object-cover border-4 border-sky-400 shadow-xl bg-white group-hover:scale-105 transition-transform duration-300 ease-out"
      />
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-sky-300/30 animate-pulse opacity-60 group-hover:opacity-100" />
    </div>

    {/* About Text */}
    <div className="flex-1 min-w-[300px]">
      <h2 className="text-4xl font-bold text-slate-800 mb-4 tracking-wide">About Me</h2>

      <div className="bg-white/80 border-l-[6px] border-sky-400 rounded-xl p-6 shadow-lg mb-10">
        <p className="text-lg text-slate-700 mb-4 leading-relaxed">
          <span className="block text-sky-600 font-bold text-xl mb-2">Full Stack Developer (React + Django)</span>
          <span className="italic text-slate-600">
            “Coding is just another way to create art, and that’s what keeps me excited about every project.”
          </span>
        </p>
        <p className="text-base text-slate-700 mb-3 leading-relaxed">
          With an <a href="https://www.instagram.com/otakutheartist" target="_blank" className="text-sky-500 underline hover:text-sky-600 transition-colors duration-200">artistic background</a>, I gravitate toward websites that feel alive—infused with color, motion, and anime/gaming aesthetics. I build interfaces that don’t just function—they tell stories.
        </p>
        <p className="text-base text-slate-700 leading-relaxed">
          I enjoy frontend creativity, but I also love getting my hands dirty in backend logic. I don't choose between aesthetics and functionality—I build the entire experience.
        </p>
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="text-2xl font-semibold text-slate-800 mb-4 tracking-tight">Skills & Tools</h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full px-4 py-1.5 font-medium text-sm shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out animate-glow"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
