import React from 'react';
import TransitionEffect from '@/components/TransitionEffect.js';
import BlackjackSimulator from '@/components/BlackjackSimulator.js';

export const metadata = {
  title: 'Blackjack Simulator',
  description:
    'Play and practice blackjack with our interactive simulator. Learn basic strategy, count cards, and test different betting systems.',
  keywords: 'blackjack simulator, blackjack game, card counting, basic strategy, casino games, blackjack practice',
};

export default function BlackjackPage() {
  return (
    <>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <div className="pt-16 w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="mb-4 text-6xl font-bold capitalize xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl">
                Blackjack Simulator
              </h1>
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Practice your blackjack skills with our interactive simulator. Learn basic strategy and test your card
                counting abilities.
              </p>
            </div>

            <BlackjackSimulator />
          </div>
        </div>
      </main>
    </>
  );
}
