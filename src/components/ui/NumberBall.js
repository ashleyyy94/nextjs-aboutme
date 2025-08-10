'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MAIN_BALL_CLASSES, BONUS_BALL_CLASSES } from '@/lib/totoConstants';

/**
 * Reusable number ball component for displaying Toto numbers
 */
export function NumberBall({
  number,
  isBonus = false,
  size = 'medium',
  animate = false,
  animationDelay = 0,
  className = '',
}) {
  const sizeClasses = {
    small: 'h-7 w-7 text-xs',
    medium: 'aspect-square text-lg sm:text-xl lg:text-2xl xl:text-3xl',
    large: 'h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 text-base sm:text-lg lg:text-xl',
  };

  const ballClasses = `
    relative flex items-center justify-center rounded-full font-bold drop-shadow-sm select-none
    ${isBonus ? BONUS_BALL_CLASSES : MAIN_BALL_CLASSES}
    ${sizeClasses[size]}
    ${className}
  `;

  if (animate) {
    return (
      <motion.div
        initial={{ y: 16, opacity: 0, rotate: -6 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.35, delay: animationDelay, ease: 'easeOut' }}
        className={ballClasses}
      >
        <span>{number}</span>
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
      </motion.div>
    );
  }

  return (
    <div className={ballClasses}>
      <span>{number}</span>
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
    </div>
  );
}

/**
 * Bonus ball with scale animation
 */
export function BonusBall({ number, animate = false, className = '' }) {
  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        <NumberBall number={number} isBonus={true} size="large" className={className} />
      </motion.div>
    );
  }

  return <NumberBall number={number} isBonus={true} size="large" className={className} />;
}
