'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      className={`theme-toggle relative inline-flex h-8 w-14 items-center justify-center rounded-full bg-aer-bg-secondary border border-aer-border-subtle hover:border-aer-accent-gold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aer-accent-gold focus:ring-offset-2 focus:ring-offset-aer-bg-primary ${className}`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={isDark}
    >
      {/* Background Track */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? '#C9A962' : '#B8860B',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      
      {/* Sliding Circle */}
      <motion.div
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg"
        animate={{
          x: isDark ? 8 : -8,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon Animation */}
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={12} className="text-aer-bg-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={12} className="text-aer-bg-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: isDark ? 0.2 : 0.15,
          boxShadow: isDark 
            ? '0 0 20px rgba(201, 169, 98, 0.5)' 
            : '0 0 20px rgba(184, 134, 11, 0.5)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Stars Animation for Dark Mode */}
      <AnimatePresence>
        {isDark && (
          <>
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ top: '8px', left: '18px' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ top: '18px', left: '12px' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            />
            <motion.div
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ top: '12px', left: '38px' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.5,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Sun Rays Animation for Light Mode */}
      <AnimatePresence>
        {!isDark && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-1 bg-yellow-300 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '50% 16px',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}