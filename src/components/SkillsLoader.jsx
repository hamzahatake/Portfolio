import { motion } from 'framer-motion'

const SkillsLoader = () => {
  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-dark via-primary to-dark min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          className="text-light text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading Skills...
        </motion.p>
      </div>
    </section>
  )
}

export default SkillsLoader
