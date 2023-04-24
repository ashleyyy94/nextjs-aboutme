import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { Rubik } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico"></link>
      </Head>

      <main className={`${rubik.variable} font-rubik bg-light dark:bg-dark w-full min-h-screen`}>
        <Header></Header>
        <AnimatePresence mode="wait">
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
        <Footer />
      </main>
      <Analytics />
    </>
  );
}
