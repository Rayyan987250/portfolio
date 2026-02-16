'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Use setTimeout to avoid the cascading render warning
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-aer-bg-primary/90 backdrop-blur-md border-b border-aer-border-subtle'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-xl font-bold aer-headline"
          >
            <a href="#home" className="aer-logo-underline text-aer-text-primary">
              RAYYAN ALI
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <motion.div key={link.name} whileHover={{ y: -1 }}>
                <a 
                  href={link.href} 
                  className="aer-ui-text text-aer-text-secondary hover:text-aer-accent-gold transition-colors aer-nav-underline"
                  aria-label={`Navigate to ${link.name} section`}
                >
                  {link.name.toUpperCase()}
                </a>
              </motion.div>
            ))}
            <div className="w-px h-6 bg-aer-border-subtle mx-4" role="separator" aria-hidden="true" />
            {mounted && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className="p-2 border border-aer-border-subtle hover:border-aer-accent-gold transition-colors"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </motion.div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <button 
                className="p-2 border border-aer-border-subtle hover:border-aer-accent-gold transition-colors" 
                onClick={toggleTheme} 
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
            <button
              className="p-2 border border-aer-border-subtle hover:border-aer-accent-gold transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-aer-bg-secondary border-t border-aer-border-subtle"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="block py-2 aer-ui-text text-aer-text-secondary hover:text-aer-accent-gold transition-colors aer-nav-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name.toUpperCase()}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
