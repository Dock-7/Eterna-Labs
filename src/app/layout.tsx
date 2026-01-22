/**
 * Root layout component with performance optimizations
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Topbar } from '@/src/components/layout/Topbar';
import { BottomBar } from '@/src/components/layout/BottomBar';
import { MobileBottomBar } from '@/src/components/layout/MobileBottomBar';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: 'Eterna Labs',
  description: 'Pixel-perfect replica of Axiom Trade token discovery table',
  icons: {
    icon: '/logo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020617',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
  <Providers>
    {/* Top Navigation */}

    {/* Main Page Content */}
    
      <div id="elastic-root">
        {children}
      </div>

  
    {/* Mobile Bottom Bar ( ≤ 640px ) */}
    <MobileBottomBar />
    </Providers>
</body>

    </html>
  );
}
