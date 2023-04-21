import React from 'react';
import IframeResizer from 'iframe-resizer-react';
import TransitionEffect from '@/components/TransitionEffect';
import Head from 'next/head';

function Collection() {
  return (
    <>
      <Head>
        <title>Ashley | NFTs</title>
        <meta name="description" content="NFT Collection"></meta>
      </Head>
      <TransitionEffect />
      <div className="nftContainer">
        <IframeResizer log src="https://oncyber.io/ashleyyy" className="nftIframe" />
      </div>
    </>
  );
}

export default Collection;
