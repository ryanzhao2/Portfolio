import StyledComponentsRegistry from '../lib/registry'
import { ThemeProvider } from 'next-themes'
import React from 'react';

export const metadata = {
  title: 'Ryan Zhao',
  description: 'Welcome to my personal website!',
  metadataBase: new URL('https://ryanzhao.com'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: ['Ryan Zhao', 'Software Engineer', 'Web Developer', 'Portfolio', 'Full Stack Developer', 'Software Development', 'Ryan Zhao Portfolio', 'Ryan Zhao Website', 'Ryan Zhao Personal Website', 'University of Toronto'],
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
  openGraph: {
    title: 'Ryan Zhao',
    description: 'Welcome to my personal website!',
    url: 'https://ryanzhao.com',
    siteName: 'Ryan Zhao\'s Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/favicon.svg',
        width: 32,
        height: 32,
        alt: 'Ryan Zhao Portfolio'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ryan Zhao',
    description: 'Welcome to my personal website!',
    images: ['/favicon.svg'],
  },
  alternates: {
    canonical: 'https://ryanzhao.com'
  },
  verification: {
    google: 'add-your-google-site-verification-here', 
  }
}

// Remove BodyWithTheme and rely on next-themes to add the class to <html>

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-zinc-900 bg-white dark:text-white text-zinc-700">
        <ThemeProvider attribute="class" enableSystem={true}>
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 