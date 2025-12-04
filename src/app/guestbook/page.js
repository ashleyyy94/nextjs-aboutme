'use client';

import Guestbook from '@/components/Guestbook.js';
import TransitionEffect from '@/components/TransitionEffect.js';

export default function GuestbookPage() {
  return (
    <>
      <TransitionEffect />
      <Guestbook />
    </>
  );
}
