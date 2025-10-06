// Performance Monitoring Utilities
export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isEnabled = process.env.NODE_ENV === 'development';
  }

  // Start timing a performance metric
  startTiming(name) {
    if (!this.isEnabled) return;
    
    this.metrics.set(name, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    });
  }

  // End timing and calculate duration
  endTiming(name) {
    if (!this.isEnabled) return null;
    
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`No timing found for metric: ${name}`);
      return null;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    
    console.log(`Performance: ${name} took ${metric.duration.toFixed(2)}ms`);
    return metric.duration;
  }

  // Measure function execution time
  measureFunction(name, fn) {
    return async (...args) => {
      this.startTiming(name);
      try {
        const result = await fn(...args);
        this.endTiming(name);
        return result;
      } catch (error) {
        this.endTiming(name);
        throw error;
      }
    };
  }

  // Monitor Core Web Vitals
  monitorWebVitals() {
    if (!this.isEnabled || typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // First Contentful Paint (FCP)
    this.observeFCP();
  }

  observeLCP() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.metrics.set('LCP', {
        value: lastEntry.startTime,
        rating: this.getLCPRating(lastEntry.startTime)
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.set('LCP', observer);
  }

  observeFID() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.set('FID', {
          value: entry.processingStart - entry.startTime,
          rating: this.getFIDRating(entry.processingStart - entry.startTime)
        });
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
    this.observers.set('FID', observer);
  }

  observeCLS() {
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      this.metrics.set('CLS', {
        value: clsValue,
        rating: this.getCLSRating(clsValue)
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.set('CLS', observer);
  }

  observeFCP() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      
      if (fcpEntry) {
        this.metrics.set('FCP', {
          value: fcpEntry.startTime,
          rating: this.getFCPRating(fcpEntry.startTime)
        });
      }
    });

    observer.observe({ entryTypes: ['paint'] });
    this.observers.set('FCP', observer);
  }

  // Rating functions for Core Web Vitals
  getLCPRating(value) {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  getFIDRating(value) {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  getCLSRating(value) {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  getFCPRating(value) {
    if (value <= 1800) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  }

  // Monitor resource loading
  monitorResources() {
    if (!this.isEnabled || typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'resource') {
          this.metrics.set(`resource-${entry.name}`, {
            duration: entry.duration,
            size: entry.transferSize,
            type: entry.initiatorType
          });
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
    this.observers.set('resources', observer);
  }

  // Monitor memory usage
  monitorMemory() {
    if (!this.isEnabled || !performance.memory) return;

    const memoryInfo = {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit,
      usage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
    };

    this.metrics.set('memory', memoryInfo);
    return memoryInfo;
  }

  // Get performance report
  getReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: Object.fromEntries(this.metrics),
      userAgent: navigator.userAgent,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null
    };

    return report;
  }

  // Clean up observers
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.metrics.clear();
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Performance optimization utilities
export const optimizeImages = {
  // Generate responsive image sources
  generateSrcSet: (baseSrc, widths = [320, 640, 768, 1024, 1280, 1536]) => {
    return widths
      .map(width => `${baseSrc}?w=${width} ${width}w`)
      .join(', ');
  },

  // Generate sizes attribute
  generateSizes: (breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }) => {
    return Object.entries(breakpoints)
      .map(([bp, width]) => `(min-width: ${width}) ${width}px`)
      .concat(['100vw'])
      .join(', ');
  },

  // Lazy load images with intersection observer
  lazyLoadImages: () => {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Bundle size optimization (non-React utilities)
export const bundleOptimization = {
  // Preload critical resources
  preloadCritical: (resources) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as || 'script';
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      document.head.appendChild(link);
    });
  },

  // Prefetch non-critical resources
  prefetchResources: (resources) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource.href;
      document.head.appendChild(link);
    });
  }
};

// Caching strategies
export const cachingStrategies = {
  // Service Worker registration
  registerServiceWorker: async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  },

  // Cache API utilities
  cacheResponse: async (cacheName, request, response) => {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
  },

  getCachedResponse: async (cacheName, request) => {
    const cache = await caches.open(cacheName);
    return await cache.match(request);
  }
};

// Performance budget monitoring
export const performanceBudget = {
  // Define performance budgets
  budgets: {
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    fcp: 1800, // 1.8s
    tti: 3800, // 3.8s
    tbt: 200   // 200ms
  },

  // Check if metrics are within budget
  checkBudget: (metrics) => {
    const violations = [];
    
    Object.entries(this.budgets).forEach(([metric, budget]) => {
      const value = metrics[metric];
      if (value && value > budget) {
        violations.push({
          metric,
          value,
          budget,
          overage: value - budget
        });
      }
    });

    return violations;
  }
};

export default {
  PerformanceMonitor,
  performanceMonitor,
  optimizeImages,
  bundleOptimization,
  cachingStrategies,
  performanceBudget
};
