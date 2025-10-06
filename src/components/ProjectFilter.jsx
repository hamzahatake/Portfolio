import { motion } from 'framer-motion';

const ProjectFilter = ({ activeFilter, onFilterChange, filters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap gap-3 justify-center mb-12"
    >
      {filters.map((filter) => (
        <motion.button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeFilter === filter
              ? 'btn-primary text-white shadow-lg'
              : 'btn-secondary text-primary hover:scale-105'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: activeFilter === filter ? 1.05 : 1,
          }}
        >
          {filter}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ProjectFilter;
