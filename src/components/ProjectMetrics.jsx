import { motion } from 'framer-motion';
import { FaUsers, FaClock, FaStar, FaTrophy, FaRocket, FaHeart } from 'react-icons/fa';

const ProjectMetrics = ({ 
  metrics = {},
  className = "",
  animated = true
}) => {
  const {
    users = 0,
    timeToComplete = 0,
    rating = 0,
    achievements = [],
    performance = 0,
    satisfaction = 0
  } = metrics;

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        className={`text-sm ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-400'
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
    <div className={`space-y-4 ${className}`}>
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Users Metric */}
        {users > 0 && (
          <motion.div
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="text-2xl font-bold text-white mb-1"
              animate={animated ? {
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {formatNumber(users)}
            </motion.div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <FaUsers className="text-blue-400" />
              <span>Users</span>
            </div>
          </motion.div>
        )}

        {/* Time Metric */}
        {timeToComplete > 0 && (
          <motion.div
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="text-2xl font-bold text-white mb-1"
              animate={animated ? {
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {timeToComplete}
            </motion.div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <FaClock className="text-green-400" />
              <span>Days</span>
            </div>
          </motion.div>
        )}

        {/* Rating Metric */}
        {rating > 0 && (
          <motion.div
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="text-2xl font-bold text-white mb-1"
              animate={animated ? {
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              {rating.toFixed(1)}
            </motion.div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {getRatingStars(rating)}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <FaStar className="text-yellow-400" />
              <span>Rating</span>
            </div>
          </motion.div>
        )}

        {/* Performance Metric */}
        {performance > 0 && (
          <motion.div
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="text-2xl font-bold text-white mb-1"
              animate={animated ? {
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >
              {performance}%
            </motion.div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <FaRocket className="text-purple-400" />
              <span>Performance</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <h4 className="text-sm font-semibold text-white mb-2">Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 py-1 text-xs font-semibold text-yellow-300 flex items-center gap-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <FaTrophy className="text-yellow-400" />
                {achievement}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Satisfaction Score */}
      {satisfaction > 0 && (
        <motion.div
          className="bg-gradient-to-r from-pink-500/20 to-red-500/20 backdrop-blur-sm border border-pink-400/30 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaHeart className="text-pink-400" />
              <span className="text-sm font-semibold text-white">Client Satisfaction</span>
            </div>
            <motion.div
              className="text-2xl font-bold text-pink-300"
              animate={animated ? {
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            >
              {satisfaction}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectMetrics;

