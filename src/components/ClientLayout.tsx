'use client';

import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import { initWebVitals, initPerformanceObserver } from '@/lib/analytics';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitals();
    
    // Initialize Performance Observer
    initPerformanceObserver();
  }, []);

  return (
    <ErrorBoundary>
      <Navbar />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer />
    </ErrorBoundary>
  );
}
