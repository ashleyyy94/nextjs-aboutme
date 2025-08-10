/**
 * Shared styling constants for Toto components
 */

// Ball styling classes
export const MAIN_BALL_CLASSES =
  'bg-gradient-to-br from-indigo-200 to-sky-300 text-gray-900 ring-1 ring-white/60 shadow-[0_10px_30px] shadow-sky-400/50 dark:from-indigo-400 dark:to-cyan-500 dark:text-white dark:ring-white/20 dark:shadow-cyan-400/40';

export const BONUS_BALL_CLASSES =
  'bg-gradient-to-br from-amber-200 to-rose-300 text-gray-900 ring-1 ring-white/60 shadow-[0_10px_30px] shadow-rose-400/50 dark:from-amber-400 dark:to-pink-500 dark:text-white dark:ring-white/20 dark:shadow-pink-400/40';

// Button styling classes
export const PRIMARY_BUTTON_CLASSES =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium shadow-lg shadow-fuchsia-500/20 hover:from-indigo-600 hover:to-fuchsia-600 focus:outline-none cursor-pointer';

export const SECONDARY_BUTTON_CLASSES =
  'inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/15 text-sm text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer';

export const ACTION_BUTTON_CLASSES =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 font-medium shadow-lg focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer';

// Card styling
export const CARD_CLASSES =
  'rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-xl';

// Input styling
export const INPUT_BASE_CLASSES =
  'w-full text-center rounded-xl border bg-white/70 dark:bg-white/10 px-3 py-2 text-base font-semibold outline-none focus:ring-2';

export const INPUT_VALID_CLASSES = 'border-black/10 dark:border-white/10 focus:ring-blue-400/40';

export const INPUT_ERROR_CLASSES = 'border-rose-400 focus:ring-rose-400/40';

// Prize group information
export const PRIZE_GROUPS = [
  { group: 1, description: '6 winning numbers', prize: 'Jackpot (min $1M)' },
  { group: 2, description: '5 winning numbers + additional', prize: '8% of prize pool' },
  { group: 3, description: '5 winning numbers', prize: '5.5% of prize pool' },
  { group: 4, description: '4 winning numbers + additional', prize: '3% of prize pool' },
  { group: 5, description: '4 winning numbers', prize: '$50' },
  { group: 6, description: '3 winning numbers + additional', prize: '$25' },
  { group: 7, description: '3 winning numbers', prize: '$10' },
];

// URLs
export const SINGAPORE_POOLS_URL = 'https://online.singaporepools.com/en/lottery/how-play-toto';
export const PRIZE_STRUCTURE_URL = 'https://online.singaporepools.com/en/lottery/toto-prize-structure';
