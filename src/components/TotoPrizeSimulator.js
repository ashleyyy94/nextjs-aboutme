'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { generateSixUnique, generateBonus, countMatches, checkPrizeGroup, validateTotoNumber } from '@/lib/totoUtils';
import { PrizeGroupsInfo } from '@/components/ui/PrizeGroupsInfo';
import {
  ACTION_BUTTON_CLASSES,
  SECONDARY_BUTTON_CLASSES,
  INPUT_BASE_CLASSES,
  INPUT_VALID_CLASSES,
  INPUT_ERROR_CLASSES,
} from '@/lib/totoConstants';

export function TotoPrizeSimulator() {
  const [mains, setMains] = useState(['', '', '', '', '', '']);
  const [bonus, setBonus] = useState('');
  const [simCount, setSimCount] = useState(0);
  const [wonAt, setWonAt] = useState(null);
  const [lastDraw, setLastDraw] = useState([]);
  const [lastMatch, setLastMatch] = useState(0);
  const [autoRunning, setAutoRunning] = useState(false);
  const [winningDraw, setWinningDraw] = useState(null);
  const [winningGroup, setWinningGroup] = useState(null);

  const rafRef = useRef(null);
  const autoRunningRef = useRef(false);

  const parsedMain = useMemo(() => mains.map((v) => (v === '' ? null : Math.max(1, Math.min(49, Number(v))))), [mains]);
  const parsedBonus = useMemo(() => (bonus === '' ? null : Math.max(1, Math.min(49, Number(bonus)))), [bonus]);

  const mainHasEmpty = parsedMain.some((n) => n == null || Number.isNaN(n));
  const mainDup = useMemo(() => {
    const filled = parsedMain.filter((n) => n != null);
    return new Set(filled).size !== filled.length;
  }, [parsedMain]);
  const bonusClash = useMemo(() => parsedBonus != null && parsedMain.includes(parsedBonus), [parsedBonus, parsedMain]);
  const inputsValid = !mainHasEmpty && !mainDup && parsedBonus != null && !bonusClash;

  function handleMainChange(i, val) {
    const next = [...mains];
    next[i] = validateTotoNumber(val);
    setMains(next);
  }

  function handleBonusChange(val) {
    setBonus(validateTotoNumber(val));
  }

  function reset() {
    setSimCount(0);
    setWonAt(null);
    setLastDraw([]);
    setLastMatch(0);
    setWinningDraw(null);
    setWinningGroup(null);
    stopAuto();
  }

  function simulateOnce() {
    if (!inputsValid || wonAt != null || autoRunning) return;
    const drawMain = generateSixUnique();
    const drawAdditional = generateBonus(drawMain);

    const result = checkPrizeGroup(parsedMain, parsedBonus, drawMain, drawAdditional);

    setLastDraw(drawMain);
    setLastMatch(result.matches);
    setSimCount((c) => {
      const next = c + 1;
      if (result.group != null) {
        setWonAt((prev) => (prev == null ? next : prev));
        setWinningDraw(drawMain);
        setWinningGroup(result.group);
      }
      return next;
    });
  }

  function runBatch() {
    if (!autoRunningRef.current || wonAt != null || !inputsValid) return;
    const BATCH = 500;
    let localLastDraw = lastDraw;
    let localLastMatch = lastMatch;
    let wonAtCount = null;
    let localWinningDraw = null;
    let localWinningGroup = null;

    // Run the batch
    let currentCount = simCount;
    for (let i = 0; i < BATCH; i++) {
      const drawMain = generateSixUnique();
      const drawAdditional = generateBonus(drawMain);

      const result = checkPrizeGroup(parsedMain, parsedBonus, drawMain, drawAdditional);

      localLastDraw = drawMain;
      localLastMatch = result.matches;
      currentCount += 1;

      if (result.group != null) {
        wonAtCount = currentCount;
        localWinningDraw = drawMain;
        localWinningGroup = result.group;
        break;
      }
    }

    // Update all state together
    setSimCount(currentCount);
    setLastDraw(localLastDraw);
    setLastMatch(localLastMatch);

    if (wonAtCount != null) {
      setWonAt((prev) => (prev == null ? wonAtCount : prev));
      setWinningDraw(localWinningDraw);
      setWinningGroup(localWinningGroup);
    }

    if (wonAtCount == null && autoRunningRef.current) {
      rafRef.current = requestAnimationFrame(runBatch);
    } else {
      stopAuto();
    }
  }

  function startAuto() {
    if (autoRunning || !inputsValid || wonAt != null) return;
    setAutoRunning(true);
    autoRunningRef.current = true;
    rafRef.current = requestAnimationFrame(runBatch);
  }

  function stopAuto() {
    autoRunningRef.current = false;
    setAutoRunning(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (wonAt != null && autoRunning) stopAuto();
  }, [wonAt, autoRunning]);

  return (
    <section className="w-full mx-auto">
      <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-xl p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">Prize Simulator</h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter the 6 winning numbers and 1 additional number (1–49).
        </p>

        <PrizeGroupsInfo className="mt-4" />

        <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {mains.map((v, i) => (
            <div key={i} className="relative">
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                type="text"
                value={v}
                onChange={(e) => handleMainChange(i, e.target.value)}
                className={`${INPUT_BASE_CLASSES} ${mainDup ? INPUT_ERROR_CLASSES : INPUT_VALID_CLASSES}`}
                placeholder={`${i + 1}`}
                aria-label={`Main number ${i + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Additional</span>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            type="text"
            value={bonus}
            onChange={(e) => handleBonusChange(e.target.value)}
            className={`w-16 text-center rounded-xl border bg-white/70 dark:bg-white/10 px-3 py-2 text-base font-semibold outline-none focus:ring-2 ${
              bonusClash ? INPUT_ERROR_CLASSES : INPUT_VALID_CLASSES
            }`}
            placeholder="A"
            aria-label="Additional number"
          />
        </div>

        <div className="mt-2 min-h-5 text-center text-xs">
          {!inputsValid && (
            <span className="text-rose-500">All numbers must be 1–49, unique, and additional not overlapping.</span>
          )}
          {inputsValid && (
            <span className="text-gray-600 dark:text-gray-400">
              Simulation checks for minimum 3 winning number matches to win.
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3">
          <button
            onClick={simulateOnce}
            disabled={!inputsValid || wonAt != null || autoRunning}
            className={`${ACTION_BUTTON_CLASSES} bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-fuchsia-500/20 hover:from-indigo-600 hover:to-fuchsia-600`}
          >
            {wonAt == null ? 'Simulate' : 'Won'}
          </button>
          {!autoRunning ? (
            <button
              onClick={startAuto}
              disabled={!inputsValid || wonAt != null}
              className={`${ACTION_BUTTON_CLASSES} bg-blue-600 text-white hover:bg-blue-700`}
            >
              Auto-run until win
            </button>
          ) : (
            <button onClick={stopAuto} className={`${ACTION_BUTTON_CLASSES} bg-rose-600 text-white hover:bg-rose-700`}>
              Stop
            </button>
          )}
          <button onClick={reset} className={SECONDARY_BUTTON_CLASSES}>
            Reset
          </button>
        </div>

        <div className="mt-6 grid gap-2 text-center">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Simulations: <span className="font-semibold">{simCount}</span>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Last matches: <span className="font-semibold">{lastMatch}</span>
          </div>
          {winningDraw ? (
            <div className="grid gap-1">
              <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Winning draw</div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {winningDraw.map((n) => (
                  <span
                    key={n}
                    className="inline-flex h-8 min-w-8 px-2 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 text-sm font-semibold"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            lastDraw.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {lastDraw.map((n) => (
                  <span
                    key={n}
                    className="inline-flex h-8 min-w-8 px-2 items-center justify-center rounded-full bg-black/[.03] dark:bg-white/[.06] text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    {n}
                  </span>
                ))}
              </div>
            )
          )}
          {wonAt != null && (
            <div className="mt-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              You won Group {winningGroup} after {wonAt} simulations!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TotoPrizeSimulator;
