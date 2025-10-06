import { motion } from 'framer-motion';

const Timeline = () => {
  const timelineData = [
    {
      year: 'Nov 2024 - Present',
      title: 'Full Stack Developer (React/Django)',
      company: 'Current Position',
      description: 'Building end-to-end web applications with React frontend and Django backend. Creating modern, interactive user experiences with full-stack expertise.',
      type: 'work'
    },
    {
      year: 'Apr 2024 - Oct 2024',
      title: 'Frontend Developer (Mid-Level)',
      company: 'Professional Experience',
      description: 'Advanced frontend development with React, focusing on complex user interfaces, state management, and performance optimization.',
      type: 'work'
    },
    {
      year: 'Oct 2023 - Mar 2024',
      title: 'Junior Frontend Developer',
      company: 'Professional Experience',
      description: 'Started professional journey in frontend development, learning React fundamentals and building responsive web applications.',
      type: 'work'
    },
    {
      year: 'Jul 2023 - Sep 2023',
      title: 'Self Learning at Home',
      company: 'Self-Taught',
      description: 'Intensive self-study of web development fundamentals, HTML, CSS, JavaScript, and modern frameworks. Built foundation for professional career.',
      type: 'education'
    }
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary"></div>
      
      {timelineData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="relative flex items-start mb-12"
        >
          {/* Timeline dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
            viewport={{ once: true }}
            className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10 ${
              item.type === 'work' ? 'bg-gradient-primary' : 'bg-gradient-secondary'
            }`}
          />
          
          {/* Content */}
          <div className="ml-16 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
              viewport={{ once: true }}
              className="card-glass p-6 rounded-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div>
                  <h4 className="heading-4 text-primary text-shadow mb-1">{item.title}</h4>
                  <p className="body-base text-secondary">{item.company}</p>
                </div>
                <span className="body-small text-secondary font-medium mt-2 sm:mt-0">
                  {item.year}
                </span>
              </div>
              <p className="body-small text-secondary text-shadow-sm">
                {item.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
