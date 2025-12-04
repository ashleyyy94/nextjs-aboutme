import React from 'react';
import TransitionEffect from '@/components/TransitionEffect.js';
import TotoGenerator from '@/components/TotoGenerator.js';
import TotoPrizeSimulator from '@/components/TotoPrizeSimulator.js';
import { Tabs } from '@/components/ui/tabs.js';
import { SINGAPORE_POOLS_URL } from '@/lib/totoConstants.js';

export const metadata = {
  title: 'Toto',
  description: 'Toto Page',
};

export default function Toto() {
  return (
    <>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <div className="pt-16 w-full px-4 sm:px-6">
          <h1 className="mb-3 text-6xl font-bold capitalize text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl">
            Toto Tools
          </h1>
          <p className="mb-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Learn more about Toto at
            <a
              href={SINGAPORE_POOLS_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="ml-1 underline decoration-dotted underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Singapore Pools
            </a>
          </p>

          <div className="max-w-4xl mx-auto">
            <Tabs
              items={[
                { key: 'generator', label: 'Generator', content: <TotoGenerator /> },
                { key: 'prize', label: 'Prize Simulator', content: <TotoPrizeSimulator /> },
              ]}
            />
          </div>
        </div>
      </main>
    </>
  );
}
