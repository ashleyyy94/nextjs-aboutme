'use client';

import React from 'react';
import { PRIZE_GROUPS, PRIZE_STRUCTURE_URL } from '@/lib/totoConstants';

/**
 * Reusable component for displaying Toto prize group information
 */
export function PrizeGroupsInfo({ className = '' }) {
  return (
    <div
      className={`p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/30 dark:border-blue-800/30 ${className}`}
    >
      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
        Prize Groups (Minimum 3 matches to win):
      </h3>
      <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
        {PRIZE_GROUPS.map(({ group, description, prize }) => (
          <div key={group}>
            <strong>Group {group}:</strong> {description} → {prize}
          </div>
        ))}
      </div>
      <div className="mt-2 text-center">
        <a
          href={PRIZE_STRUCTURE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-dotted underline-offset-2"
        >
          View official prize structure →
        </a>
      </div>
    </div>
  );
}
