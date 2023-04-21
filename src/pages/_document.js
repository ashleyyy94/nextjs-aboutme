import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* FontAwesome JS */}
        <Script src="https://kit.fontawesome.com/c12b96b94f.js" crossorigin="anonymous"></Script>
      </Head>
      <body>
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }`}
        </Script>
        <Main />
        <NextScript />

        {/* <!-- OpenSea embedding -->  */}
        <Script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></Script>
      </body>
    </Html>
  );
}
