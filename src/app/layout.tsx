import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import ClientLayout from '@/components/ClientLayout';
import { env } from '@/lib/env';

// Professional font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// SF Mono will be loaded via CSS (system font)

export const metadata: Metadata = {
  title: `${env.fullName} | ${env.title}`,
  description: env.siteDescription,
  keywords: 'Full-Stack Developer, React, Next.js, TypeScript, Node.js, AI Development, Web Development, Portfolio',
  authors: [{ name: env.fullName }],
  creator: env.fullName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: env.siteUrl,
    title: `${env.fullName} | ${env.title}`,
    description: env.siteDescription,
    siteName: env.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${env.fullName} | ${env.title}`,
    description: env.siteDescription,
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
  name: env.fullName,
  jobTitle: env.title,
  description: env.siteDescription,
  url: env.siteUrl,
  sameAs: [
    env.linkedin,
    env.github,
    ...(env.twitter ? [env.twitter] : []),
  ].filter(Boolean),
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
  email: env.email,
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
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
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
