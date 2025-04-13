import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeScript from '@/components/ThemeScript';
import '@/styles/globals.css';
import { Rubik } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

export const metadata = {
  title: {
    default: 'Ashley',
    template: '%s | Ashley',
  },
  description: 'Personal portfolio and experiments',
  icons: {
    icon: '/favicon.ico',
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
