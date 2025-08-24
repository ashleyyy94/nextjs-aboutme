'use client';

import React, { useState, useMemo } from 'react';
import { MdInfo, MdTrendingUp, MdTrendingDown, MdClear } from 'react-icons/md';
import { FUTURES_MARKETS } from '@/lib/futuresConstants';

export default function FuturesCalculator() {
  const [selectedMarket, setSelectedMarket] = useState('ES');
  const [direction, setDirection] = useState('LONG');
  const [entryPrice, setEntryPrice] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [contracts, setContracts] = useState(1);

  const market = FUTURES_MARKETS[selectedMarket];

  // Calculate profit/loss metrics
  const calculations = useMemo(() => {
    if (!entryPrice || !market) return null;

    const entry = parseFloat(entryPrice);
    const profit = takeProfit ? parseFloat(takeProfit) : null;
    const loss = stopLoss ? parseFloat(stopLoss) : null;

    if (isNaN(entry)) return null;

    const results = {
      entry,
      profit,
      loss,
      contracts,
      market: market.name,
    };

    // Calculate potential profit
    if (profit !== null && !isNaN(profit)) {
      const profitPoints = direction === 'LONG' ? profit - entry : entry - profit;
      const profitTicks = profitPoints / market.tickSize;
      const profitDollar = profitTicks * market.tickValue * contracts;

      results.potentialProfit = {
        points: profitPoints.toFixed(4),
        ticks: profitTicks.toFixed(0),
        dollar: profitDollar.toFixed(2),
      };
    }

    // Calculate potential loss
    if (loss !== null && !isNaN(loss)) {
      const lossPoints = direction === 'LONG' ? entry - loss : loss - entry;
      const lossTicks = lossPoints / market.tickSize;
      const lossDollar = lossTicks * market.tickValue * contracts;

      results.potentialLoss = {
        points: lossPoints.toFixed(4),
        ticks: lossTicks.toFixed(0),
        dollar: lossDollar.toFixed(2),
      };
    }

    // Calculate risk/reward ratio
    if (results.potentialProfit && results.potentialLoss) {
      const ratio =
        Math.abs(parseFloat(results.potentialProfit.dollar)) / Math.abs(parseFloat(results.potentialLoss.dollar));
      results.riskRewardRatio = ratio.toFixed(2);
    }

    return results;
  }, [direction, entryPrice, takeProfit, stopLoss, contracts, market]);

  const handleClear = () => {
    setEntryPrice('');
    setTakeProfit('');
    setStopLoss('');
    setContracts(1);
  };

  return (
    <div className="space-y-8">
      {/* Market Selection */}
      <div className="bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Futures Market Selection</h2>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Market</label>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(FUTURES_MARKETS).map(([key, market]) => (
                <option key={key} value={key}>
                  {market.name} ({market.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Position Direction
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setDirection('LONG')}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                  direction === 'LONG'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <MdTrendingUp className="inline mr-2" />
                LONG
              </button>
              <button
                onClick={() => setDirection('SHORT')}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                  direction === 'SHORT'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <MdTrendingDown className="inline mr-2" />
                SHORT
              </button>
            </div>
          </div>
        </div>

        {/* Market Details */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Market Details: {market.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-800 dark:text-blue-200">Contract Size:</span>
              <br />
              <span className="text-blue-700 dark:text-blue-300">{market.contractSize}</span>
            </div>
            <div>
              <span className="font-medium text-blue-800 dark:text-blue-200">Tick Size:</span>
              <br />
              <span className="text-blue-700 dark:text-blue-300">{market.tickSize}</span>
            </div>
            <div>
              <span className="font-medium text-blue-800 dark:text-blue-200">Tick Value:</span>
              <br />
              <span className="text-blue-700 dark:text-blue-300">${market.tickValue}</span>
            </div>
            <div>
              <span className="font-medium text-blue-800 dark:text-blue-200">Margin:</span>
              <br />
              <span className="text-blue-700 dark:text-blue-300">${market.margin.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-3 text-sm">
            <span className="font-medium text-blue-800 dark:text-blue-200">Price Format Example:</span>
            <span className="text-blue-700 dark:text-blue-300 ml-2">{market.priceFormat}</span>
          </div>
        </div>
      </div>

      {/* Trading Parameters */}
      <div className="bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Trading Parameters</h2>

        <div className="space-y-4">
          {/* First Row: Entry Price and Number of Contracts */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Entry Price *</label>
              <input
                type="number"
                step="0.01"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder={market.priceFormat}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Contracts
              </label>
              <input
                type="number"
                min="1"
                value={contracts}
                onChange={(e) => setContracts(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Second Row: Take Profit and Stop Loss */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Take Profit</label>
              <input
                type="number"
                step="0.01"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                placeholder={market.priceFormat}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stop Loss</label>
              <input
                type="number"
                step="0.01"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder={market.priceFormat}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <MdClear />
            Clear All
          </button>
        </div>
      </div>

      {/* Results */}
      {calculations && (
        <div className="bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Profit/Loss Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calculations.potentialProfit && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">Potential Profit</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Points:</span>
                    <span className="ml-2 text-green-700 dark:text-green-300">
                      {calculations.potentialProfit.points}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Ticks:</span>
                    <span className="ml-2 text-green-700 dark:text-green-300">
                      {calculations.potentialProfit.ticks}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">USD:</span>
                    <span className="ml-2 text-green-700 dark:text-green-300 text-lg font-bold">
                      ${calculations.potentialProfit.dollar}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {calculations.potentialLoss && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">Potential Loss</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Points:</span>
                    <span className="ml-2 text-red-700 dark:text-red-300">{calculations.potentialLoss.points}</span>
                  </div>
                  <div>
                    <span className="font-medium">Ticks:</span>
                    <span className="ml-2 text-red-700 dark:text-red-300">{calculations.potentialLoss.ticks}</span>
                  </div>
                  <div>
                    <span className="font-medium">USD:</span>
                    <span className="ml-2 text-red-700 dark:text-red-300 text-lg font-bold">
                      -${calculations.potentialLoss.dollar}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {calculations.riskRewardRatio && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Risk/Reward Ratio</h3>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                1:{calculations.riskRewardRatio}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 p-6">
        <div className="flex items-start gap-3">
          <MdInfo className="text-yellow-600 dark:text-yellow-400 text-xl mt-1 flex-shrink-0" />
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <h3 className="font-semibold mb-2">Important Disclaimer</h3>
            <p className="mb-2">
              This calculator is for educational and informational purposes only. Futures trading involves substantial
              risk and is not suitable for all investors. You could lose more than your initial investment.
            </p>
            <p>
              Margin requirements and contract specifications may vary by broker. Always verify current market data and
              consult with a financial advisor before trading. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
