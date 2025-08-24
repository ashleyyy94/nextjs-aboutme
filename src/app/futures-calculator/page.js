import React from 'react';
import TransitionEffect from '@/components/TransitionEffect';
import FuturesCalculator from '@/components/FuturesCalculator';

export const metadata = {
  title: 'Futures Calculator',
  description:
    'Calculate potential profits, losses, and risk for futures trading positions. Professional trading calculator with support for major futures markets.',
  keywords:
    'futures calculator, trading calculator, profit loss calculator, risk management, futures trading, position sizing',
};

export default function FuturesCalculatorPage() {
  return (
    <>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <div className="pt-16 w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="mb-4 text-6xl font-bold capitalize xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl">
                Futures Calculator
              </h1>
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Calculate potential profits, losses, and risk for your futures trading positions.
              </p>
            </div>

            <FuturesCalculator />
          </div>
        </div>
      </main>
    </>
  );
}
