'use client'

import { useState, useEffect, useRef, lazy, Suspense, memo, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillsLoader from './SkillsLoader'
import '../styles/skills.css'
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
  ArrowRight,
  ExternalLink,
  X,
  Brain,
  Cloud,
  DollarSign,
  Rocket,
  Palette,
  Layers,
  Container,
  CreditCard,
  Play
} from 'lucide-react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

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
    icon: Layers,
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
    icon: Code,
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
    icon: Palette,
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
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'Animation',
    icon: Play,
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
    id: 'ui-ux',
    name: 'UI/UX Design',
    category: 'Design',
    icon: Palette,
    color: '#FF6B6B',
    description: 'User interface and user experience design',
    whyChoose: 'UI/UX design focuses on creating intuitive, accessible, and engaging user experiences. Essential for modern applications that prioritize user satisfaction.',
    performance: {
      bundleSize: 'N/A',
      loadTime: 'User-focused',
      memoryUsage: 'Optimized',
      rating: 4.8
    },
    features: ['User Research', 'Wireframing', 'Prototyping', 'Accessibility']
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
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    icon: Container,
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
    id: 'vercel',
    name: 'Vercel',
    category: 'Deployment',
    icon: Cloud,
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
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payment',
    icon: CreditCard,
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
  }
]

// Lazy load the component for better performance
const SkillsComponent = () => {
  const [hoveredTech, setHoveredTech] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  
  // Refs for GSAP animations
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // GSAP animations setup with performance optimization
  useEffect(() => {
    if (!isVisible) return

    // Use requestAnimationFrame for better performance
    const animate = () => {
      const ctx = gsap.context(() => {
        // Header animation with reduced complexity
        gsap.fromTo(headerRef.current, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power2.out"
          }
        )

        // Enhanced staggered entry animations with wave effect
        gsap.fromTo(gridRef.current.children,
          { 
            opacity: 0, 
            y: 50, 
            scale: 0.8,
            rotationX: -15,
            rotationY: 10
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
              fastScrollEnd: true,
              refreshPriority: -1
            }
          }
        )

        // Remove floating animation to prevent content reloading
      }, sectionRef)

      return () => {
        ctx.revert()
      }
    }

    // Use requestAnimationFrame for smooth performance
    const rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [isVisible])

  // Detail panel removed

  // Remove click functionality - cards are now display-only

  // Memoized tech card component for better performance
  const TechCard = memo(({ tech, isHovered, onHover }) => {
    const IconComponent = tech.icon
    const iconRef = useRef(null)
    const cardRef = useRef(null)

    // Enhanced hover with magnetic effect and glow
    const handleMouseEnter = () => {
      onHover(tech.id)
      if (iconRef.current && cardRef.current) {
        // Enhanced 3D icon rotation with multiple axes
        gsap.to(iconRef.current, {
          rotationY: 360,
          rotationX: 15,
          scale: 1.2,
          duration: 0.8,
          ease: "power2.out"
        })
        
        // Glow effect on card
        gsap.to(cardRef.current, {
          boxShadow: "0 0 40px rgba(230, 179, 37, 0.6)",
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }

    // Remove text reveal animation to prevent content reloading

    const handleMouseLeave = () => {
      onHover(null)
      if (iconRef.current && cardRef.current) {
        // Reset icon with elastic bounce
        gsap.to(iconRef.current, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        })
        
        // Reset card glow
        gsap.to(cardRef.current, {
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }

    // Magnetic hover effect that follows mouse movement
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(cardRef.current, {
          rotationY: x * 0.1,
          rotationX: -y * 0.1,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }

    const handleMouseLeaveCard = () => {
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "power2.out"
        })
      }
    }

    return (
      <div
        className="relative group h-full perspective-1000"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          ref={cardRef}
          className="tech-card tech-transition w-full h-full min-h-[280px] p-6 rounded-2xl border-2 flex flex-col justify-between relative"
          style={{
            borderColor: 'rgba(230, 179, 37, 0.3)',
            backgroundColor: 'rgba(30, 41, 59, 0.2)',
            boxShadow: isHovered ? '0 0 30px rgba(230, 179, 37, 0.2)' : '0 0 20px rgba(0, 0, 0, 0.1)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={(e) => {
            handleMouseLeave()
            handleMouseLeaveCard()
          }}
          onMouseMove={handleMouseMove}
        >
          {/* Tech Icon with Enhanced 3D Animation */}
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ 
                backgroundColor: tech.id === 'nextjs' 
                  ? '#1C3163' 
                  : `${tech.color}20`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              <IconComponent
                ref={iconRef}
                size={32}
                style={{ 
                  color: tech.id === 'nextjs' 
                    ? '#FFFFFF' 
                    : tech.color
                }}
                className="tech-icon"
              />
            </div>
          </div>

          {/* Tech Info - Static Content */}
          <div className="text-center flex-1 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-light mb-2">
              {tech.name}
            </h3>
            <p className="text-sm text-text-secondary mb-3">
              {tech.category}
            </p>
            <p className="text-xs text-meta leading-relaxed line-clamp-3">
              {tech.description}
            </p>
          </div>


          {/* Enhanced Hover Effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
            style={{
              background: isHovered
                ? "linear-gradient(135deg, rgba(230, 179, 37, 0.1) 0%, rgba(60, 90, 100, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(230, 179, 37, 0.05) 0%, rgba(60, 90, 100, 0.05) 100%)",
              opacity: isHovered ? 1 : 0
            }}
          />
        </div>
      </div>
    )
  })

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 lg:px-8 skills-section skills-gradient min-h-screen"
      id="skills"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-light mb-6">
            Technology Stack
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Cutting-edge technologies powering modern web applications with
            exceptional performance and user experience.
          </p>
        </div>

        {/* Tech Grid with GSAP Animations */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {technologies.map((tech) => (
            <TechCard
              key={tech.id}
              tech={tech}
              isHovered={hoveredTech === tech.id}
              onHover={setHoveredTech}
            />
          ))}
        </div>

        {/* Detail panel removed - cards are display-only */}
      </div>
    </section>
  )
}

// Export with lazy loading and Suspense
const Skills = () => {
  return (
    <Suspense fallback={<SkillsLoader />}>
      <SkillsComponent />
    </Suspense>
  )
}

export default Skills
