'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  Zap,
  Shield,
  Globe,
  Database,
  Smartphone,
  Server,
  Cpu,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  ExternalLink,
  X,
  Brain,
  Cloud,
  DollarSign,
  Rocket
} from 'lucide-react'

const technologies = [
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    icon: Code,
    color: '#61DAFB',
    description: 'Modern UI library for building interactive user interfaces',
    whyChoose: 'React provides excellent performance with virtual DOM, strong ecosystem, and component reusability. Perfect for scalable applications.',
    performance: {
      bundleSize: '42KB',
      loadTime: '< 100ms',
      memoryUsage: 'Low',
      rating: 4.8
    },
    features: ['Virtual DOM', 'Component-based', 'Hooks', 'JSX']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Framework',
    icon: Globe,
    color: '#000000',
    description: 'Full-stack React framework with SSR and static generation',
    whyChoose: 'Next.js offers server-side rendering, automatic code splitting, and built-in optimization. Essential for SEO and performance.',
    performance: {
      bundleSize: '85KB',
      loadTime: '< 50ms',
      memoryUsage: 'Optimized',
      rating: 4.9
    },
    features: ['SSR/SSG', 'API Routes', 'Image Optimization', 'Automatic Splitting']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    icon: Shield,
    color: '#3178C6',
    description: 'Type-safe JavaScript for large-scale applications',
    whyChoose: 'TypeScript catches errors at compile time, improves developer experience, and makes code more maintainable.',
    performance: {
      bundleSize: '0KB (compile-time)',
      loadTime: 'N/A',
      memoryUsage: 'N/A',
      rating: 4.7
    },
    features: ['Type Safety', 'IntelliSense', 'Refactoring', 'Error Prevention']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Styling',
    icon: Zap,
    color: '#06B6D4',
    description: 'Utility-first CSS framework for rapid UI development',
    whyChoose: 'Tailwind provides consistent design system, rapid prototyping, and optimized bundle sizes through purging.',
    performance: {
      bundleSize: '10KB (purged)',
      loadTime: '< 20ms',
      memoryUsage: 'Minimal',
      rating: 4.6
    },
    features: ['Utility-first', 'Responsive', 'Customizable', 'Optimized']
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'Backend',
    icon: Server,
    color: '#FF2D20',
    description: 'Elegant PHP framework for web artisans',
    whyChoose: 'Laravel provides elegant syntax, powerful ORM, built-in authentication, and extensive ecosystem. Perfect for rapid web application development.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Fast startup',
      memoryUsage: 'Efficient',
      rating: 4.7
    },
    features: ['Eloquent ORM', 'Artisan CLI', 'Blade Templates', 'Middleware']
  },
  {
    id: 'django',
    name: 'Django',
    category: 'Backend',
    icon: Server,
    color: '#339933',
    description: 'High-level Python web framework for rapid development',
    whyChoose: 'Django provides a robust ORM, built-in admin interface, and follows the "batteries included" philosophy. Perfect for complex web applications.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Fast startup',
      memoryUsage: 'Efficient',
      rating: 4.6
    },
    features: ['ORM', 'Admin Interface', 'Security', 'Scalable']
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'Mobile',
    icon: Smartphone,
    color: '#61DAFB',
    description: 'Cross-platform mobile app development framework',
    whyChoose: 'React Native enables code sharing between iOS and Android, native performance, and access to device APIs. Perfect for mobile-first applications.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Fast startup',
      memoryUsage: 'Native',
      rating: 4.5
    },
    features: ['Cross-platform', 'Native Performance', 'Hot Reload', 'Device APIs']
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    icon: Cloud,
    color: '#FF9900',
    description: 'Comprehensive cloud computing platform',
    whyChoose: 'AWS provides scalable infrastructure, global reach, and extensive services. Essential for enterprise-grade applications and global deployment.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Global CDN',
      memoryUsage: 'Scalable',
      rating: 4.8
    },
    features: ['Global Infrastructure', 'Auto Scaling', 'Security', 'Cost Effective']
  },
  {
    id: 'ai',
    name: 'AI/ML',
    category: 'Intelligence',
    icon: Brain,
    color: '#FF6B6B',
    description: 'Artificial Intelligence and Machine Learning solutions',
    whyChoose: 'AI/ML integration provides intelligent automation, predictive analytics, and enhanced user experiences. Essential for modern applications.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Real-time',
      memoryUsage: 'GPU Optimized',
      rating: 4.7
    },
    features: ['Predictive Analytics', 'Natural Language', 'Computer Vision', 'Automation']
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    icon: Server,
    color: '#339933',
    description: 'JavaScript runtime for server-side development',
    whyChoose: 'Node.js enables full-stack JavaScript development, excellent performance with V8 engine, and vast npm ecosystem.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Fast startup',
      memoryUsage: 'Efficient',
      rating: 4.5
    },
    features: ['V8 Engine', 'NPM Ecosystem', 'Non-blocking I/O', 'Scalable']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    icon: Database,
    color: '#47A248',
    description: 'NoSQL database for modern applications',
    whyChoose: 'MongoDB offers flexible schema, horizontal scaling, and excellent performance for document-based data.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Fast queries',
      memoryUsage: 'Optimized',
      rating: 4.4
    },
    features: ['Document Store', 'Scalable', 'Flexible Schema', 'High Performance']
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'Animation',
    icon: TrendingUp,
    color: '#FF0055',
    description: 'Production-ready motion library for React',
    whyChoose: 'Framer Motion provides declarative animations, gesture support, and excellent performance for smooth user experiences.',
    performance: {
      bundleSize: '45KB',
      loadTime: '< 80ms',
      memoryUsage: 'Optimized',
      rating: 4.7
    },
    features: ['Declarative', 'Gestures', 'Layout Animations', 'Performance']
  },
  {
    id: 'gsap',
    name: 'GSAP',
    category: 'Animation',
    icon: Zap,
    color: '#88CE02',
    description: 'Professional-grade animation library for the web',
    whyChoose: 'GSAP provides high-performance animations, timeline control, and cross-browser compatibility. Essential for complex animations and interactive experiences.',
    performance: {
      bundleSize: '25KB (core)',
      loadTime: '< 50ms',
      memoryUsage: 'Optimized',
      rating: 4.9
    },
    features: ['Timeline Control', 'High Performance', 'Cross-browser', 'Rich Ecosystem']
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    icon: Server,
    color: '#2496ED',
    description: 'Containerization platform for consistent deployments',
    whyChoose: 'Docker ensures consistent environments across development, staging, and production. Essential for scalable microservices and CI/CD pipelines.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Fast startup',
      memoryUsage: 'Efficient',
      rating: 4.8
    },
    features: ['Containerization', 'Microservices', 'CI/CD', 'Scalability']
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'DevOps',
    icon: Cloud,
    color: '#326CE5',
    description: 'Container orchestration for scalable applications',
    whyChoose: 'Kubernetes automates deployment, scaling, and management of containerized applications. Essential for enterprise-grade applications.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Auto-scaling',
      memoryUsage: 'Distributed',
      rating: 4.7
    },
    features: ['Auto-scaling', 'Load Balancing', 'Service Discovery', 'Rolling Updates']
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'Database',
    icon: Database,
    color: '#DC382D',
    description: 'In-memory data structure store for caching',
    whyChoose: 'Redis provides ultra-fast caching, session storage, and real-time features. Essential for high-performance applications and real-time systems.',
    performance: {
      bundleSize: 'N/A',
      loadTime: '< 1ms',
      memoryUsage: 'In-memory',
      rating: 4.6
    },
    features: ['In-memory', 'Caching', 'Real-time', 'High Performance']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    icon: Database,
    color: '#336791',
    description: 'Advanced open-source relational database',
    whyChoose: 'PostgreSQL offers ACID compliance, JSON support, and advanced features. Perfect for complex applications requiring robust data integrity.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Fast queries',
      memoryUsage: 'Optimized',
      rating: 4.8
    },
    features: ['ACID Compliance', 'JSON Support', 'Advanced Indexing', 'Extensibility']
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'API',
    icon: Globe,
    color: '#E10098',
    description: 'Query language and runtime for APIs',
    whyChoose: 'GraphQL provides efficient data fetching, type safety, and real-time subscriptions. Perfect for modern applications with complex data requirements.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Optimized queries',
      memoryUsage: 'Efficient',
      rating: 4.5
    },
    features: ['Type Safety', 'Real-time', 'Efficient Queries', 'Schema-first']
  },
  {
    id: 'jest',
    name: 'Jest',
    category: 'Testing',
    icon: Shield,
    color: '#C21325',
    description: 'JavaScript testing framework with zero configuration',
    whyChoose: 'Jest provides comprehensive testing tools, mocking capabilities, and excellent developer experience. Essential for maintaining code quality.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Fast execution',
      memoryUsage: 'Optimized',
      rating: 4.6
    },
    features: ['Zero Config', 'Mocking', 'Coverage', 'Snapshot Testing']
  },
  {
    id: 'cypress',
    name: 'Cypress',
    category: 'Testing',
    icon: CheckCircle,
    color: '#17202C',
    description: 'End-to-end testing framework for web applications',
    whyChoose: 'Cypress provides reliable E2E testing with real browser testing, time-travel debugging, and excellent developer experience.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Real browser',
      memoryUsage: 'Optimized',
      rating: 4.4
    },
    features: ['Real Browser', 'Time Travel', 'Automatic Waiting', 'Debugging']
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payment',
    icon: DollarSign,
    color: '#635BFF',
    description: 'Payment processing platform for online businesses',
    whyChoose: 'Stripe provides secure payment processing, subscription management, and global payment methods. Essential for e-commerce and SaaS applications.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Global CDN',
      memoryUsage: 'Optimized',
      rating: 4.8
    },
    features: ['Global Payments', 'Subscriptions', 'Fraud Protection', 'Developer API']
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'Backend',
    icon: Cloud,
    color: '#FFCA28',
    description: 'Google\'s mobile and web application development platform',
    whyChoose: 'Firebase provides real-time database, authentication, hosting, and analytics. Perfect for rapid prototyping and scalable applications.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Global CDN',
      memoryUsage: 'Scalable',
      rating: 4.5
    },
    features: ['Real-time DB', 'Authentication', 'Hosting', 'Analytics']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Deployment',
    icon: Rocket,
    color: '#000000',
    description: 'Platform for frontend frameworks and static sites',
    whyChoose: 'Vercel provides seamless deployment, edge functions, and global CDN. Perfect for modern web applications with optimal performance.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'Edge optimized',
      memoryUsage: 'Global CDN',
      rating: 4.7
    },
    features: ['Edge Functions', 'Global CDN', 'Automatic Deployments', 'Analytics']
  }
]

export default function TechStack() {
  const [selectedTech, setSelectedTech] = useState(null)
  const [hoveredTech, setHoveredTech] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleTechClick = (tech) => {
    setSelectedTech(selectedTech?.id === tech.id ? null : tech)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const techVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      rotateX: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const detailVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-dark via-primary to-dark">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-light mb-6">
            Technology Stack
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Cutting-edge technologies powering modern web applications with
            exceptional performance and user experience.
          </p>
        </motion.div>

        {/* Tech Grid with Enhanced 3D Effects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {technologies.map((tech) => {
            const IconComponent = tech.icon
            const isSelected = selectedTech?.id === tech.id
            const isHovered = hoveredTech === tech.id

            return (
              <motion.div
                key={tech.id}
                className="relative group h-full perspective-1000"
                variants={techVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredTech(tech.id)}
                onHoverEnd={() => setHoveredTech(null)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.button
                  onClick={() => handleTechClick(tech)}
                  className={`
                    w-full h-full min-h-[280px] p-6 rounded-2xl border-2 transition-all duration-500 flex flex-col justify-between
                    ${isSelected
                      ? 'border-secondary bg-secondary/10 shadow-2xl'
                      : 'border-secondary/30 bg-primary/20 hover:border-secondary/60 hover:bg-primary/30'
                    }
                    ${isHovered ? 'shadow-neon' : 'shadow-lg'}
                  `}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                  animate={{
                    rotateY: isHovered ? 5 : 0,
                    rotateX: isHovered ? 5 : 0,
                    z: isHovered ? 20 : 0
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {/* Tech Icon with Enhanced Animation */}
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: tech.id === 'nextjs' 
                          ? '#1C3163' 
                          : `${tech.color}20` 
                      }}
                      animate={{
                        rotateY: isHovered ? 180 : 0,
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent
                        size={32}
                        style={{ 
                          color: tech.id === 'nextjs' 
                            ? '#FFFFFF' 
                            : tech.color 
                        }}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </motion.div>
                  </div>

                  {/* Tech Info */}
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <motion.h3
                      className="text-lg font-semibold text-light mb-2"
                      animate={{
                        y: isHovered ? -2 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech.name}
                    </motion.h3>
                    <p className="text-sm text-text-secondary mb-3">
                      {tech.category}
                    </p>
                    <p className="text-xs text-meta leading-relaxed line-clamp-3">
                      {tech.description}
                    </p>
                  </div>

                  {/* Performance Badge with Enhanced Animation */}
                  <motion.div
                    className="mt-4 flex items-center justify-center"
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      y: isHovered ? -2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center space-x-1 bg-accent/20 px-3 py-1 rounded-full">
                      <Star size={12} className="text-accent" />
                      <span className="text-xs font-medium text-accent">
                        {tech.performance.rating}/5
                      </span>
                    </div>
                  </motion.div>

                  {/* Enhanced Hover Effect with 3D Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      background: isHovered
                        ? "linear-gradient(135deg, rgba(230, 179, 37, 0.1) 0%, rgba(60, 90, 100, 0.1) 100%)"
                        : "linear-gradient(135deg, rgba(230, 179, 37, 0.05) 0%, rgba(60, 90, 100, 0.05) 100%)"
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* 3D Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2"
                    animate={{
                      borderColor: isHovered
                        ? `rgba(230, 179, 37, 0.3)`
                        : `rgba(230, 179, 37, 0)`,
                      boxShadow: isHovered
                        ? '0 0 30px rgba(230, 179, 37, 0.2)'
                        : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Selected Tech Details with Enhanced Animation */}
        <AnimatePresence mode="wait">
          {selectedTech && (
            <motion.div
              className="bg-gradient-to-r from-primary/30 to-primary/20 border border-secondary/30 rounded-2xl p-8 mb-12"
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Why Choose */}
                <div>
                  <h3 className="text-2xl font-serif font-bold text-light mb-4">
                    Why We Choose {selectedTech.name}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {selectedTech.whyChoose}
                  </p>

                  {/* Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-light mb-3">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedTech.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-2 text-sm text-text-secondary"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle size={16} className="text-accent" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Performance Metrics */}
                <div>
                  <h4 className="text-lg font-semibold text-light mb-4">
                    Performance Metrics
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(selectedTech.performance).map(([key, value], index) => {
                      if (key === 'rating') return null

                      const getIcon = (key) => {
                        switch (key) {
                          case 'bundleSize': return <Cpu size={16} />
                          case 'loadTime': return <Clock size={16} />
                          case 'memoryUsage': return <Database size={16} />
                          default: return <TrendingUp size={16} />
                        }
                      }

                      const getLabel = (key) => {
                        switch (key) {
                          case 'bundleSize': return 'Bundle Size'
                          case 'loadTime': return 'Load Time'
                          case 'memoryUsage': return 'Memory Usage'
                          default: return key
                        }
                      }

                      return (
                        <motion.div
                          key={key}
                          className="flex items-center justify-between p-3 bg-primary/20 rounded-lg border border-secondary/20"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-accent">
                              {getIcon(key)}
                            </div>
                            <span className="text-sm font-medium text-light">
                              {getLabel(key)}
                            </span>
                          </div>
                          <span className="text-sm text-accent font-semibold">
                            {value}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Rating */}
                  <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-light">Overall Rating</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < Math.floor(selectedTech.performance.rating)
                                ? 'text-accent fill-current'
                                : 'text-accent/30'
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-accent">
                          {selectedTech.performance.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedTech(null)}
                className="absolute top-4 right-4 text-text-secondary hover:text-light transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}