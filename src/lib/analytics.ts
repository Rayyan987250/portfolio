// Web Vitals and Performance Monitoring
import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }

  // In production, you could send to analytics service
  // Example: sendToAnalytics(metric);
  
  // You can also send to Google Analytics, Vercel Analytics, etc.
  // gtag('event', metric.name, {
  //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //   event_label: metric.id,
  //   non_interaction: true,
  // });
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  onCLS(reportWebVitals);
  onINP(reportWebVitals);
  onFCP(reportWebVitals);
  onLCP(reportWebVitals);
  onTTFB(reportWebVitals);
}

// Performance observer for additional metrics
export function initPerformanceObserver() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      // Monitor long tasks (> 50ms)
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });

      // Monitor layout shifts
      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            value: number;
            sources: unknown[];
          };
          if (layoutShiftEntry.value > 0.1) {
            console.warn('Layout shift detected:', {
              value: layoutShiftEntry.value,
              sources: layoutShiftEntry.sources,
            });
          }
        }
      });
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }
}