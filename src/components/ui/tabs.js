'use client';

import React, { useState } from 'react';

export function Tabs({ items, defaultIndex = 0 }) {
  const [active, setActive] = useState(defaultIndex);

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Toto features"
        className="relative mb-4 flex border-b border-gray-200 dark:border-gray-800"
      >
        {items.map((item, i) => (
          <button
            key={item.key ?? i}
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${item.key ?? i}`}
            className={`px-4 py-2 -mb-px border-b-2 transition-colors cursor-pointer ${
              active === i
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            onClick={() => setActive(i)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${items[active]?.key ?? active}`} className="pt-1">
        {items[active]?.content}
      </div>
    </div>
  );
}
