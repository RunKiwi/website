'use client';

import { useId } from 'react';

/**
 * Geometric Kiwi-bird mark. Single-color via `currentColor` (set it with a `color:` on the
 * parent) and faceted with varied opacities.
 */
export function Logo({ className }: { className?: string }) {
  const maskId = `kiwi-eye-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <mask id={maskId}>
        <rect width="128" height="128" fill="#fff" />
        <polygon points="78,37 82,35 84,39 80,41" fill="#000" />
      </mask>
      <g mask={`url(#${maskId})`}>
        {/* Beak */}
        <polygon points="95,45 125,75 90,55" fill="currentColor" opacity="0.9" />
        <polygon points="125,75 120,80 90,55" fill="currentColor" opacity="0.6" />
        {/* Head */}
        <polygon points="75,30 90,30 70,45" fill="currentColor" opacity="0.85" />
        <polygon points="90,30 95,45 70,45" fill="currentColor" opacity="0.75" />
        {/* Neck */}
        <polygon points="70,45 95,45 80,55" fill="currentColor" opacity="0.95" />
        <polygon points="80,55 95,45 90,55" fill="currentColor" opacity="0.7" />
        <polygon points="80,55 90,55 85,75" fill="currentColor" opacity="0.8" />
        <polygon points="70,45 80,55 60,70" fill="currentColor" opacity="0.65" />
        <polygon points="80,55 85,75 60,70" fill="currentColor" opacity="1.0" />
        {/* Breast/Belly */}
        <polygon points="85,75 75,95 60,70" fill="currentColor" opacity="0.85" />
        <polygon points="75,95 55,105 60,70" fill="currentColor" opacity="0.7" />
        {/* Back/Tail */}
        <polygon points="75,30 70,45 50,35" fill="currentColor" opacity="0.9" />
        <polygon points="50,35 70,45 60,70" fill="currentColor" opacity="0.75" />
        <polygon points="50,35 60,70 30,50" fill="currentColor" opacity="0.85" />
        <polygon points="30,50 60,70 35,95" fill="currentColor" opacity="0.6" />
        <polygon points="30,50 35,95 20,70" fill="currentColor" opacity="0.8" />
        <polygon points="35,95 55,105 60,70" fill="currentColor" opacity="0.9" />
        {/* Legs */}
        <polygon points="55,105 45,125 50,125" fill="currentColor" opacity="0.85" />
        <polygon points="70,100 65,120 70,120" fill="currentColor" opacity="0.75" />
      </g>
    </svg>
  );
}
