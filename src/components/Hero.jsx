import hamzaImg from '/image/Hamza.png';

const Hero = () => (
  <section className="flex flex-wrap items-center justify-between min-h-[60vh] py-16 w-[90%] max-w-[1200px] mx-auto">
    {/* Text Section */}
    <div className="flex-1 min-w-[320px] z-10 space-y-6 animate-fadeIn">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
        Hi, I'm <span className="text-sky-400">Hamza</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-700 animate-slideUp">
        A Full-stack <span className="text-sky-400">Web Developer</span> crafting modern, interactive experiences.
      </p>
    </div>

    {/* Image Section with Tilt */}
    <div className="flex-1 min-w-[250px] flex items-center justify-center relative">
      <img
        src={hamzaImg}
        alt="Hamza"
        className="w-[260px] h-[260px] rounded-full object-cover shadow-2xl border-4 border-sky-400 bg-white transition-transform duration-500 hover:rotate-3 hover:scale-105 animate-float"
      />
    </div>
  </section>
);

export default Hero;
