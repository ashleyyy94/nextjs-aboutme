import Footer from '@/components/Footer.js';
import Header from '@/components/Header.js';
import ThemeScript from '@/components/ThemeScript.js';
import '@/styles/globals.css';
import { Rubik } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

export const metadata = {
  metadataBase: new URL('https://www.ashleyong.xyz'),
  title: {
    default: 'Ashley | Frontend Web Developer & UI/UX Designer',
    template: '%s | Ashley - Web Developer',
  },
  description:
    'Ashley is a Frontend Web Developer and UI/UX Designer specializing in React, Next.js, and modern web technologies. Explore my portfolio of projects, experiments, and creative work.',
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`font-rubik bg-light dark:bg-dark w-full min-h-screen`}>
        <ThemeScript />
        <Header />
        {children}
        <Footer />
        <Analytics />
        <Script src="https://kit.fontawesome.com/c12b96b94f.js" strategy="lazyOnload" crossOrigin="anonymous" />
        <Script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
