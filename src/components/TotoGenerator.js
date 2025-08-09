'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdContentCopy, MdDeleteOutline } from 'react-icons/md';

function generateMainNumbers() {
  const set = new Set();
  while (set.size < 6) set.add(1 + Math.floor(Math.random() * 49));
  return Array.from(set).sort((a, b) => a - b);
}

function generatePick(includeBonus) {
  const main = generateMainNumbers();
  let bonus = null;
  if (includeBonus) {
    const pool = Array.from({ length: 49 }, (_, i) => i + 1).filter((n) => !main.includes(n));
    bonus = pool[Math.floor(Math.random() * pool.length)];
  }
  return { main, bonus };
}

function formatPick(pick) {
  return pick.bonus != null ? `${pick.main.join(' ')} ${pick.bonus}` : pick.main.join(' ');
}

const mainBallClasses =
  'bg-gradient-to-br from-indigo-200 to-sky-300 text-gray-900 ring-1 ring-white/60 shadow-[0_10px_30px] shadow-sky-400/50 dark:from-indigo-400 dark:to-cyan-500 dark:text-white dark:ring-white/20 dark:shadow-cyan-400/40';
const bonusBallClasses =
  'bg-gradient-to-br from-amber-200 to-rose-300 text-gray-900 ring-1 ring-white/60 shadow-[0_10px_30px] shadow-rose-400/50 dark:from-amber-400 dark:to-pink-500 dark:text-white dark:ring-white/20 dark:shadow-pink-400/40';

export default function TotoGenerator() {
  const [includeBonus, setIncludeBonus] = useState(true);
  const [pick, setPick] = useState(() => generatePick(true));
  const [burstKey, setBurstKey] = useState(0);
  const [particles, setParticles] = useState([]);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('toto_history');
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

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
    <motion.section
      initial="hidden"
      animate="show"
      variants={cardVariants}
      className="relative w-full max-w-2xl mx-auto"
    >
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
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
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
              <motion.div
                key={`${burstKey}-${n}-${idx}`}
                initial={{ y: 16, opacity: 0, rotate: -6 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: 'easeOut' }}
                className={`relative flex items-center justify-center aspect-square rounded-full ${mainBallClasses} select-none`}
              >
                <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold drop-shadow-sm">{n}</span>
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
              </motion.div>
            ))}
          </div>

          {pick.bonus != null && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Bonus</span>
              <motion.div
                key={`${burstKey}-bonus-${pick.bonus}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className={`relative flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 rounded-full ${bonusBallClasses} select-none`}
              >
                <span className="text-base sm:text-lg lg:text-xl font-bold drop-shadow-sm">{pick.bonus}</span>
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
              </motion.div>
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
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium shadow-lg shadow-fuchsia-500/20 hover:from-indigo-600 hover:to-fuchsia-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500/50 focus-visible:ring-offset-transparent"
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

            <button
              onClick={() => handleCopy()}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/15 text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
              aria-label="Copy current numbers"
            >
              <MdContentCopy className="w-4 h-4" /> Copy
            </button>

            <button
              onClick={handleClearHistory}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/15 text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
            >
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
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 bg-black/[.03] dark:bg-white/[.04]"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        {h.main.map((n) => (
                          <span
                            key={n}
                            className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold ${mainBallClasses}`}
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                      {h.bonus != null && (
                        <>
                          <span className="text-xs text-gray-500 dark:text-gray-400">+</span>
                          <span
                            className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold ${bonusBallClasses}`}
                          >
                            {h.bonus}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(h)}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 focus:outline-none"
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
              animate={{ opacity: [0, 1, 0], x: p.x, y: p.y - 60 - Math.random() * 40, scale: 1 }}
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
