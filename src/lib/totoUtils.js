/**
 * Shared utilities for Toto number generation and validation
 */

/**
 * Generates 6 unique random numbers between 1-49, sorted
 * @returns {number[]} Array of 6 unique sorted numbers
 */
export function generateSixUnique() {
  const set = new Set();
  while (set.size < 6) {
    set.add(1 + Math.floor(Math.random() * 49));
  }
  return Array.from(set).sort((a, b) => a - b);
}

/**
 * Generates a single random number between 1-49
 * @returns {number} Random number 1-49
 */
export function generateNumber() {
  return 1 + Math.floor(Math.random() * 49);
}

/**
 * Generates a bonus number that doesn't conflict with main numbers
 * @param {number[]} mainNumbers - Array of main numbers to avoid
 * @returns {number} Random bonus number not in mainNumbers
 */
export function generateBonus(mainNumbers) {
  const pool = Array.from({ length: 49 }, (_, i) => i + 1).filter((n) => !mainNumbers.includes(n));
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Counts matching numbers between two arrays
 * @param {number[]} a - First array
 * @param {number[]} b - Second array
 * @returns {number} Number of matches
 */
export function countMatches(a, b) {
  const bSet = new Set(b);
  return a.reduce((acc, n) => acc + (bSet.has(n) ? 1 : 0), 0);
}

/**
 * Formats a pick object for display/copying
 * @param {Object} pick - Pick object with main and bonus numbers
 * @param {number[]} pick.main - Main numbers
 * @param {number|null} pick.bonus - Bonus number
 * @returns {string} Formatted string
 */
export function formatPick(pick) {
  return pick.bonus != null ? `${pick.main.join(' ')} ${pick.bonus}` : pick.main.join(' ');
}

/**
 * Validates and clamps a number input to 1-49 range
 * @param {string} value - Input value
 * @returns {string} Cleaned and clamped value
 */
export function validateTotoNumber(value) {
  const cleaned = value.replace(/[^0-9]/g, '');
  return cleaned === '' ? '' : String(Math.max(1, Math.min(49, Number(cleaned))));
}

/**
 * Checks for prize group based on official Singapore Pools Toto rules
 * @param {number[]} userMain - User's main numbers
 * @param {number|null} userAdditional - User's additional number
 * @param {number[]} drawMain - Draw main numbers
 * @param {number} drawAdditional - Draw additional number
 * @returns {Object} Prize group result
 */
export function checkPrizeGroup(userMain, userAdditional, drawMain, drawAdditional) {
  const mainMatches = countMatches(userMain, drawMain);
  const additionalMatch = userAdditional != null && userAdditional === drawAdditional;

  // Group 1: 6 winning numbers
  if (mainMatches === 6) return { group: 1, matches: mainMatches, additionalMatch };

  // Group 2: 5 winning numbers + additional
  if (mainMatches === 5 && additionalMatch) return { group: 2, matches: mainMatches, additionalMatch };

  // Group 3: 5 winning numbers
  if (mainMatches === 5) return { group: 3, matches: mainMatches, additionalMatch };

  // Group 4: 4 winning numbers + additional
  if (mainMatches === 4 && additionalMatch) return { group: 4, matches: mainMatches, additionalMatch };

  // Group 5: 4 winning numbers
  if (mainMatches === 4) return { group: 5, matches: mainMatches, additionalMatch };

  // Group 6: 3 winning numbers + additional
  if (mainMatches === 3 && additionalMatch) return { group: 6, matches: mainMatches, additionalMatch };

  // Group 7: 3 winning numbers
  if (mainMatches === 3) return { group: 7, matches: mainMatches, additionalMatch };

  // No prize
  return { group: null, matches: mainMatches, additionalMatch };
}
