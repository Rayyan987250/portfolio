'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { env } from '@/lib/env';

// Terminal lines data - moved outside component to prevent re-creation
const terminalLines = [
  { type: 'prompt', content: '~/portfolio $', delay: 1000 },
  { type: 'command', content: 'npm run build', delay: 2000 },
  { type: 'output', content: '✓ Building optimized bundle...', delay: 1500 },
  { type: 'output', content: '✓ TypeScript compilation complete', delay: 1200 },
  { type: 'success', content: '🚀 Deploy successful', delay: 2000 },
  { type: 'prompt', content: '~/portfolio $', delay: 1000 },
  { type: 'command', content: 'git status', delay: 1800 },
  { type: 'output', content: 'On branch main', delay: 1000 },
  { type: 'success', content: 'nothing to commit, working tree clean', delay: 2500 },
];

// Terminal Animation Component
function TerminalAnimation() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      
      if (currentChar < line.content.length) {
        const timeout = setTimeout(() => {
          setCurrentChar(prev => prev + 1);
        }, 50 + Math.random() * 50); // Realistic typing speed with variation
        
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }, line.delay);
        
        return () => clearTimeout(timeout);
      }
    } else {
      // Reset animation after completion
      const resetTimeout = setTimeout(() => {
        setCurrentLine(0);
        setCurrentChar(0);
      }, 3000);
      
      return () => clearTimeout(resetTimeout);
    }
  }, [currentLine, currentChar]);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'prompt': return 'text-aer-accent-gold';
      case 'command': return 'text-aer-text-primary';
      case 'output': return 'text-aer-text-secondary';
      case 'success': return 'text-green-400';
      default: return 'text-aer-text-secondary';
    }
  };

  return (
    <div className="space-y-1">
      {terminalLines.slice(0, currentLine + 1).map((line, index) => (
        <div key={index} className={`${getLineColor(line.type)} flex items-center`}>
          <span>
            {index === currentLine 
              ? line.content.slice(0, currentChar)
              : line.content
            }
          </span>
          {index === currentLine && showCursor && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-1 bg-aer-accent-gold w-2 h-4 inline-block"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-aer-bg-primary"
      aria-label="Hero section"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-aer-bg-secondary/20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 relative z-10">
        <div className="aer-offset-grid min-h-[70vh] items-center">
          {/* Text Content - Left Side (1.2fr) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <motion.div 
              variants={textVariants} 
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-aer-accent-gold"></div>
                <p className="aer-ui-text text-aer-text-muted"></p>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl aer-headline leading-none">
                {env.fullName.split(' ')[0].toUpperCase()}
                <br />
                <span className="aer-gold-gradient">{env.fullName.split(' ')[1]?.toUpperCase() || ''}</span>
              </h1>
            </motion.div>

            <motion.div 
              variants={textVariants} 
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-xl md:text-2xl aer-ui-text text-aer-accent-gold">
                {env.title.toUpperCase()}
              </h2>
              
              <div className="space-y-4 max-w-lg">
                <p className="text-lg aer-body leading-relaxed">
                  Crafting modern, production-ready web applications with scalable backend systems, 
                  AI-powered features, and responsive, interactive frontends.
                </p>
                
                <p className="text-base aer-body leading-relaxed opacity-80">
                  Specializing in React/Next.js, Node.js, TypeScript, and agentic AI workflows 
                  that enhance user experiences.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={textVariants}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="flex flex-wrap gap-6 pt-8"
            >
              <motion.a 
                href="#projects"
                whileHover={{ y: -2 }} 
                whileTap={{ scale: 0.98 }}
                className="aer-button-primary px-10 py-4 rounded-none inline-block text-center"
              >
                VIEW WORK
              </motion.a>
              <motion.a 
                href="#contact"
                whileHover={{ y: -2 }} 
                whileTap={{ scale: 0.98 }}
                className="aer-button-secondary px-10 py-4 rounded-none inline-block text-center"
              >
                GET IN TOUCH
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Visual Element - Right Side (0.8fr) */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm">
                {/* Aer-style sophisticated terminal simulation */}
                <div className="relative w-80 h-80 flex items-center justify-center">
                  {/* Terminal Window */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="w-full h-full bg-aer-bg-secondary border border-aer-border-subtle overflow-hidden"
                  >
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-aer-border-subtle bg-aer-bg-tertiary">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                      </div>
                      <span className="aer-ui-text text-aer-text-muted text-xs">TERMINAL</span>
                      <div className="w-12"></div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-4 font-mono text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sf-mono)' }}>
                      <TerminalAnimation />
                    </div>
                  </motion.div>
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{ 
                      x: [0, 10, 0],
                      y: [0, -15, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute top-12 right-12 w-3 h-3 bg-aer-accent-gold opacity-60"
                  />
                  
                  <motion.div
                    animate={{ 
                      x: [0, -8, 0],
                      y: [0, 12, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute bottom-16 left-16 w-2 h-2 border border-aer-accent-gold opacity-40"
                  />
                </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Bottom Left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-6 hidden lg:flex flex-col items-start"
        >
          <span className="aer-ui-text text-aer-text-muted mb-6 -rotate-90 origin-left text-xs">
            SCROLL
          </span>
          <motion.div
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-20 bg-aer-accent-gold origin-top"
          />
        </motion.div>

        {/* Page indicator - Bottom Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-12 right-6 hidden lg:block"
        >
          <span className="aer-numeral text-aer-text-muted text-sm">01 / 04</span>
        </motion.div>
      </div>
    </section>
  );
}