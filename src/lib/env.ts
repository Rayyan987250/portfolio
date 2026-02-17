// Environment Configuration Helper
// Centralized access to environment variables with type safety

// Required environment variables for production
const requiredProdVars = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_FULL_NAME',
  'NEXT_PUBLIC_EMAIL',
  'NEXT_PUBLIC_GITHUB_URL',
  'NEXT_PUBLIC_LINKEDIN_URL',
] as const;

// Validate required environment variables in production
function validateRequiredEnvVars() {
  if (process.env.NODE_ENV === 'production') {
    const missing = requiredProdVars.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      const errorMessage = `❌ PRODUCTION BUILD FAILED: Missing required environment variables: ${missing.join(', ')}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

// Run validation immediately
validateRequiredEnvVars();

export const env = {
  // Personal Information
  email: process.env.NEXT_PUBLIC_EMAIL || (process.env.NODE_ENV === 'production' ? '' : 'rayyanali24792@gmail.com'),
  phone: process.env.NEXT_PUBLIC_PHONE || '',
  fullName: process.env.NEXT_PUBLIC_FULL_NAME || (process.env.NODE_ENV === 'production' ? '' : 'Rayyan Ali'),
  title: process.env.NEXT_PUBLIC_TITLE || 'Full-Stack Developer',
  location: process.env.NEXT_PUBLIC_LOCATION || 'Pakistan',

  // Social Media Links
  github: process.env.NEXT_PUBLIC_GITHUB_URL || (process.env.NODE_ENV === 'production' ? '' : 'https://github.com/Rayyan987250'),
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || (process.env.NODE_ENV === 'production' ? '' : 'https://www.linkedin.com/in/rayyan-ali-a57428259'),
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '',

  // Site Configuration
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'production' ? '' : 'https://rayyanali.dev'),
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Rayyan Ali Portfolio',
  siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Full-stack developer specializing in React/Next.js, Node.js, TypeScript, and AI-powered applications',

  // Analytics
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  vercelAnalytics: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true',

  // Development
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  debugMode: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',

  // Third-party Services
  emailjs: {
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
  },
} as const;

// Type-safe environment variable access
export type EnvConfig = typeof env;

// Validation helper
export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_EMAIL',
    'NEXT_PUBLIC_GITHUB_URL',
    'NEXT_PUBLIC_LINKEDIN_URL',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0 && env.isProduction) {
    console.warn('Missing required environment variables:', missing);
  }

  return missing.length === 0;
}

// Helper to get social links
export function getSocialLinks() {
  return [
    {
      name: 'Email',
      url: `mailto:${env.email}?subject=Portfolio%20Inquiry&body=Hi%20${env.fullName},%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss...`,
      icon: 'Mail',
      display: env.email,
    },
    {
      name: 'LinkedIn',
      url: env.linkedin,
      icon: 'LinkedIn',
      display: 'Connect with me',
    },
    {
      name: 'GitHub',
      url: env.github,
      icon: 'GitHub',
      display: 'View my work',
    },
    ...(env.twitter ? [{
      name: 'Twitter',
      url: env.twitter,
      icon: 'Twitter',
      display: 'Follow me',
    }] : []),
  ].filter(link => link.url);
}