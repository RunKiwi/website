'use client';

/**
 * 8-Bit Chunky Chibi Kiwi Bird Logo Mark (v4-6).
 * Uses shapeRendering="crispEdges" and imageRendering="pixelated"
 * for razor-sharp rendering on all displays.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Body Greens */}
      <rect x="5" y="2" width="5" height="1" fill="#88BC38" />
      <rect x="3" y="3" width="8" height="1" fill="#93C645" />
      <rect x="2" y="4" width="9" height="1" fill="#93C645" />
      <rect x="2" y="5" width="9" height="1" fill="#93C645" />
      <rect x="1" y="6" width="10" height="1" fill="#93C645" />
      <rect x="1" y="7" width="10" height="1" fill="#93C645" />
      <rect x="2" y="8" width="9" height="1" fill="#88BC38" />
      <rect x="2" y="9" width="9" height="1" fill="#78A832" />
      <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
      <rect x="4" y="11" width="5" height="1" fill="#5A8222" />

      {/* Big Expressive Chibi Eye */}
      <rect x="7" y="4" width="2" height="2" fill="#111816" />
      <rect x="7" y="4" width="1" height="1" fill="#FFFFFF" />

      {/* Cute Chunky Amber Beak */}
      <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
      <rect x="14" y="6" width="1" height="1" fill="#E89115" />

      {/* Chubby Amber Feet */}
      <rect x="4" y="12" width="2" height="2" fill="#FFAA28" />
      <rect x="3" y="13" width="3" height="1" fill="#FFAA28" />
      <rect x="8" y="12" width="2" height="2" fill="#FFAA28" />
      <rect x="7" y="13" width="3" height="1" fill="#FFAA28" />
    </svg>
  );
}
