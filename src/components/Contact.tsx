'use client';

import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aer-text-secondary">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aer-text-secondary">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const socialLinks = [
  {
    name: 'Email',
    icon: <Mail size={24} className="text-aer-accent-gold" />,
    href: 'mailto:rayyanali24792@gmail.com',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    href: 'https://www.linkedin.com/in/rayyan-ali-a57428259',
  },
  {
    name: 'GitHub',
    icon: <GitHubIcon />,
    href: 'https://github.com/Rayyan987250',
  },
];

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Form submission not yet implemented. Please email directly at rayyanali24792@gmail.com');
  };

  return (
    <section id="contact" className="py-32 bg-aer-bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Asymmetric Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="aer-offset-grid items-start">
            <div>
              <p className="aer-ui-text text-aer-text-muted mb-4">GET IN TOUCH</p>
              <h2 className="text-5xl md:text-6xl aer-headline mb-6">
                LET&apos;S{' '}
                <span className="aer-gold-gradient">COLLABORATE</span>
              </h2>
            </div>
            <p className="text-lg aer-body">
              Ready to bring your next project to life? Let&apos;s discuss how we can work together 
              to create something exceptional that pushes boundaries and delivers results.
            </p>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="aer-card p-6 text-center group"
            >
              <div className="mb-4 flex justify-center">
                {social.icon}
              </div>
              <h3 className="aer-ui-text text-aer-text-primary mb-2">{social.name.toUpperCase()}</h3>
              <p className="text-sm aer-body group-hover:text-aer-accent-gold transition-colors">
                {social.name === 'Email' ? 'rayyanali24792@gmail.com' : 
                 social.name === 'LinkedIn' ? 'Connect with me' : 
                 'View my work'}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="aer-card p-8">
            <div className="mb-8">
              <h3 className="text-2xl aer-headline mb-2">Send a Message</h3>
              <p className="aer-body">
                Fill out the form below and I&apos;ll get back to you within 24 hours.
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="aer-ui-text text-aer-text-secondary">NAME</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="aer-input w-full px-4 py-3 rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="aer-ui-text text-aer-text-secondary">EMAIL</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="aer-input w-full px-4 py-3 rounded-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="aer-ui-text text-aer-text-secondary">SUBJECT</label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  className="aer-input w-full px-4 py-3 rounded-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="aer-ui-text text-aer-text-secondary">MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  className="aer-input w-full px-4 py-3 rounded-none resize-none"
                />
              </div>
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  className="aer-button-primary w-full px-8 py-4 rounded-none flex items-center justify-center"
                >
                  <Send className="mr-2 h-4 w-4" />
                  SEND MESSAGE
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
