import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Aer Design System Colors
        'aer-bg-primary': '#0A0A0A',
        'aer-bg-secondary': '#141414',
        'aer-bg-tertiary': '#1A1A1A',
        'aer-text-primary': '#FFFFFF',
        'aer-text-secondary': '#9CA3AF',
        'aer-text-muted': '#6B7280',
        'aer-accent-gold': '#C9A962',
        'aer-accent-gold-hover': '#D4B978',
        'aer-border-subtle': '#262626',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
      letterSpacing: {
        'tight': '-0.02em',
        'wide': '0.1em',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      gridTemplateColumns: {
        'aer-asymmetric': '1fr 2fr',
        'aer-sidebar': '240px 1fr',
      },
    },
  },
  plugins: [],
};
export default config;
