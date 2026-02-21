'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdContentCopy, MdDeleteOutline } from 'react-icons/md';
import { generateSixUnique, generateBonus, formatPick } from '@/lib/totoUtils';
import { NumberBall, BonusBall } from '@/components/ui/NumberBall';
import { SECONDARY_BUTTON_CLASSES, PRIMARY_BUTTON_CLASSES } from '@/lib/totoConstants';

function generatePick(includeBonus) {
  const main = generateSixUnique();
  const bonus = includeBonus ? generateBonus(main) : null;
  return { main, bonus };
}

export default function TotoGenerator() {
  const [includeBonus, setIncludeBonus] = useState(true);
  const [pick, setPick] = useState(() => generatePick(true));
  const [burstKey, setBurstKey] = useState(0);
  const [particles, setParticles] = useState([]);
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('toto_history');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('toto_history', JSON.stringify(history));
    } catch {}
  }, [history]);

  const handleGenerate = () => {
    const next = generatePick(includeBonus);
    setPick(next);
    setBurstKey((k) => k + 1);

    const entry = { id: Date.now(), ...next, ts: new Date().toISOString() };
    setHistory((h) => [entry, ...h].slice(0, 10));

    const p = Array.from({ length: 18 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 40,
      yOffset: 60 + Math.random() * 40,
      size: 6 + Math.random() * 8,
      hue: Math.floor(Math.random() * 360),
      duration: 0.6 + Math.random() * 0.6,
    }));
    setParticles(p);
    setTimeout(() => setParticles([]), 1200);
  };

  const handleCopy = (p = pick) => {
    navigator.clipboard.writeText(formatPick(p)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  const handleClearHistory = () => setHistory([]);

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  return (
    <motion.section initial="hidden" animate="show" variants={cardVariants} className="relative w-full mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-xl">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-white/10 to-transparent dark:via-white/5" />

        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              Singapore Toto Quick Pick
            </h2>
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
              {includeBonus ? '6 + 1 bonus • 1–49' : '6 numbers • 1–49'}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-gray-700 dark:text-gray-300">Include bonus</span>
            <button
              type="button"
              onClick={() => setIncludeBonus((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
                includeBonus ? 'bg-fuchsia-500' : 'bg-gray-300 dark:bg-zinc-700'
              }`}
              aria-pressed={includeBonus}
              aria-label="Toggle include bonus"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 shadow ${
                  includeBonus ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-3">
            {pick.main.map((n, idx) => (
              <NumberBall key={`${burstKey}-${n}-${idx}`} number={n} animate={true} animationDelay={idx * 0.04} />
            ))}
          </div>

          {pick.bonus != null && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Bonus</span>
              <BonusBall key={`${burstKey}-bonus-${pick.bonus}`} number={pick.bonus} animate={true} />
            </div>
          )}

          <p className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
            For entertainment purposes only. Not affiliated with Singapore Pools. No guarantee or financial advice.
            Please gamble responsibly.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <motion.button
              onClick={handleGenerate}
              whileTap={{ scale: 0.97 }}
              className={PRIMARY_BUTTON_CLASSES}
              aria-label="Generate Toto numbers"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-2"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Quick Pick
            </motion.button>

            <button onClick={() => handleCopy()} className={SECONDARY_BUTTON_CLASSES} aria-label="Copy current numbers">
              <MdContentCopy className="w-4 h-4" /> Copy
            </button>

            <button onClick={handleClearHistory} className={SECONDARY_BUTTON_CLASSES}>
              <MdDeleteOutline className="w-4 h-4" /> Clear history
            </button>

            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-sm text-emerald-600 dark:text-emerald-400"
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {history.length > 0 && (
            <div className="mt-8">
              <div className="mb-2 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                History (last 10)
              </div>
              <ul className="space-y-2 max-h-64 overflow-auto pr-1">
                {history.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 bg-black/3 dark:bg-white/4"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        {h.main.map((n) => (
                          <NumberBall key={n} number={n} size="small" />
                        ))}
                      </div>
                      {h.bonus != null && (
                        <>
                          <span className="text-xs text-gray-500 dark:text-gray-400">+</span>
                          <NumberBall number={h.bonus} isBonus={true} size="small" />
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(h)}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer"
                        aria-label="Copy this set"
                      >
                        <MdContentCopy className="w-3.5 h-3.5" /> Copy
                      </button>
                      <span className="hidden sm:inline text-[10px] text-gray-500 dark:text-gray-400">
                        {new Date(h.ts).toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], x: p.x, y: p.y - p.yOffset, scale: 1 }}
              transition={{ duration: p.duration, ease: 'easeOut' }}
              className="pointer-events-none absolute left-1/2 top-[58%]"
              style={{ filter: 'blur(0.2px)' }}
            >
              <span
                className="block rounded-full"
                style={{ width: p.size, height: p.size, background: `hsl(${p.hue} 85% 60%)` }}
              />
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
