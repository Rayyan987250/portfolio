import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Rayyan Ali | Full-Stack Developer',
  description: 'Full-stack developer specializing in React/Next.js, Node.js, TypeScript, and AI-powered applications. Building modern, scalable web solutions.',
  keywords: 'Full-Stack Developer, React, Next.js, TypeScript, Node.js, AI Development, Web Development, Portfolio',
  authors: [{ name: 'Rayyan Ali' }],
  creator: 'Rayyan Ali',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rayyanali.dev',
    title: 'Rayyan Ali | Full-Stack Developer',
    description: 'Full-stack developer specializing in React/Next.js, Node.js, TypeScript, and AI-powered applications.',
    siteName: 'Rayyan Ali Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rayyan Ali | Full-Stack Developer',
    description: 'Full-stack developer specializing in React/Next.js, Node.js, TypeScript, and AI-powered applications.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Structured Data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rayyan Ali',
  jobTitle: 'Full-Stack Developer',
  description: 'Full-stack developer specializing in React/Next.js, Node.js, TypeScript, and AI-powered applications.',
  url: 'https://rayyanali.dev',
  sameAs: [
    'https://www.linkedin.com/in/rayyan-ali-a57428259',
    'https://github.com/Rayyan987250',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Full-Stack Development',
    'AI Development',
    'Web Development',
    'JavaScript',
    'PostgreSQL',
    'MongoDB',
  ],
  email: 'rayyanali24792@gmail.com',
  alumniOf: {
    '@type': 'Organization',
    name: 'Software Development',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance Developer',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        {/* Skip Navigation Link for Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-aer-accent-gold focus:text-aer-bg-primary focus:rounded focus:font-medium focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
