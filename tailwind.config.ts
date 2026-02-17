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
        // Aer Design System Colors - Dark Mode
        'aer-bg-primary': '#0A0A0A',
        'aer-bg-secondary': '#141414',
        'aer-bg-tertiary': '#1A1A1A',
        'aer-text-primary': '#FFFFFF',
        'aer-text-secondary': '#9CA3AF',
        'aer-text-muted': '#6B7280',
        'aer-accent-gold': '#C9A962',
        'aer-accent-gold-hover': '#D4B978',
        'aer-border-subtle': '#262626',
        
        // Aer Design System Colors - Light Mode
        'aer-light-bg-primary': '#FAFAFA',
        'aer-light-bg-secondary': '#FFFFFF',
        'aer-light-bg-tertiary': '#F5F5F5',
        'aer-light-text-primary': '#0A0A0A',
        'aer-light-text-secondary': '#4B5563',
        'aer-light-text-muted': '#6B7280',
        'aer-light-accent-gold': '#B8860B',
        'aer-light-accent-gold-hover': '#A0750A',
        'aer-light-border-subtle': '#E5E7EB',
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        'mono': ['var(--font-sf-mono)', 'SF Mono', 'ui-monospace', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Code', 'Droid Sans Mono', 'Courier New', 'monospace'],
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
