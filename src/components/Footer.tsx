'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aer-bg-secondary border-t border-aer-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Top Section - Asymmetric Layout */}
          <div className="aer-offset-grid-reverse">
            {/* Navigation & Connect */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="aer-ui-text text-aer-text-secondary">NAVIGATION</h4>
                <div className="space-y-3">
                  {['Home', 'Projects', 'Skills', 'Contact'].map((link) => (
                    <motion.div key={link} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <a 
                        href={`#${link.toLowerCase()}`} 
                        className="block aer-body hover:text-aer-accent-gold transition-colors aer-nav-underline"
                      >
                        {link}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Connect */}
              <div className="space-y-6">
                <h4 className="aer-ui-text text-aer-text-secondary">CONNECT</h4>
                <p className="aer-body">
                  Ready to collaborate on your next project?
                </p>
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                  <button className="aer-button-primary px-6 py-3 rounded-none">
                    <a href="#contact">START A PROJECT</a>
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-6">
              <h3 className="text-3xl aer-headline aer-gold-gradient">
                RAYYAN ALI
              </h3>
              <p className="aer-body max-w-md">
                Building modern web applications with AI-powered features and scalable architecture. 
                Always exploring new technologies and pushing creative boundaries.
              </p>
              <div className="flex items-center gap-4">
                <span className="aer-ui-text text-aer-text-muted">AVAILABLE FOR WORK</span>
                <div className="w-2 h-2 bg-aer-accent-gold animate-pulse" />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-aer-border-subtle" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8">
              <p className="text-sm aer-body">© {currentYear} Rayyan Ali. All rights reserved.</p>
              <span className="aer-numeral text-aer-text-muted text-sm">v2.0</span>
            </div>

            <div className="flex items-center gap-6 text-sm aer-body">
              <span>Built with Next.js & Tailwind CSS</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="w-4 h-4 border border-aer-accent-gold"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
