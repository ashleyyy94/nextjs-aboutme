'use client';
import React from 'react';
import IframeResizer from '@iframe-resizer/react';
import TransitionEffect from '@/components/TransitionEffect';

export default function Collection() {
  return (
    <>
      <TransitionEffect />
      <div className="nftContainer">
        <IframeResizer log src="https://oncyber.io/ashleyyy" className="nftIframe" />
      </div>
    </>
  );
}
