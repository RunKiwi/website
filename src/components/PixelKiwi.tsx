'use client';

import { useState } from 'react';

type PixelKiwiAction = 'vibing' | 'reviewing' | 'guarding' | 'sleeping' | 'shipping';

interface PixelKiwiProps {
  action?: PixelKiwiAction;
  label?: string;
  className?: string;
  position?: 'perched' | 'top-right' | 'top-left' | 'inline';
}

export default function PixelKiwi({
  action = 'vibing',
  className = '',
  position = 'perched',
}: PixelKiwiProps) {
  const [clicked, setClicked] = useState(false);

  const positionClass = {
    'perched': 'pixel-kiwi-perched',
    'top-right': 'pixel-kiwi-top-right',
    'top-left': 'pixel-kiwi-top-left',
    'inline': 'pixel-kiwi-inline',
  }[position];

  return (
    <div
      className={`pixel-kiwi-wrapper ${positionClass} ${className}`}
      onClick={() => setClicked(!clicked)}
      title="8-bit Kiwi companion — click to poke"
      role="button"
      tabIndex={0}
      aria-label={`8-bit Kiwi ${action}`}
    >
      {/* 8-bit Sprite (Standing on window frame) */}
      <div className={`pixel-kiwi-sprite ${action} ${clicked ? 'hop' : ''}`}>
        <svg
          viewBox="0 0 16 16"
          className="pixel-kiwi-svg"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          {/* Feet (rests at y=14) */}
          <rect x="4" y="12" width="2" height="2" fill="#E8A13B" />
          <rect x="3" y="13" width="2" height="2" fill="#E8A13B" />
          <rect x="8" y="12" width="2" height="2" fill="#E8A13B" />
          <rect x="7" y="13" width="2" height="2" fill="#E8A13B" />

          {/* Kiwi Main Body (Round fuzzy shape) */}
          <rect x="4" y="2" width="6" height="1" fill="#78A832" />
          <rect x="3" y="3" width="8" height="1" fill="#88BC38" />
          <rect x="2" y="4" width="9" height="1" fill="#93C645" />
          <rect x="2" y="5" width="9" height="1" fill="#93C645" />
          <rect x="1" y="6" width="10" height="1" fill="#93C645" />
          <rect x="1" y="7" width="10" height="1" fill="#93C645" />
          <rect x="1" y="8" width="10" height="1" fill="#88BC38" />
          <rect x="2" y="9" width="9" height="1" fill="#78A832" />
          <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
          <rect x="4" y="11" width="5" height="1" fill="#5A8222" />

          {/* Eye */}
          {action === 'sleeping' ? (
            /* Closed eye (sleeping line) */
            <rect x="7" y="5" width="3" height="1" fill="#111816" />
          ) : (
            /* Open cute eye with sparkle */
            <>
              <rect x="7" y="4" width="2" height="2" fill="#111816" />
              <rect x="7" y="4" width="1" height="1" fill="#FFFFFF" />
            </>
          )}

          {/* Long Slender Kiwi Beak */}
          <rect x="11" y="5" width="4" height="1" fill="#E8A13B" />
          <rect x="12" y="6" width="2" height="1" fill="#D48822" />

          {/* Pose Accessories */}
          {action === 'vibing' && (
            /* 8-bit Cool Headphones & Shades */
            <>
              {/* Headphone band */}
              <rect x="4" y="1" width="5" height="1" fill="#FF4D6D" />
              <rect x="3" y="2" width="1" height="3" fill="#FF4D6D" />
              <rect x="9" y="2" width="1" height="3" fill="#FF4D6D" />
              {/* Ear cushions */}
              <rect x="2" y="4" width="1" height="3" fill="#00E5FF" />
              <rect x="9" y="4" width="1" height="3" fill="#00E5FF" />
              {/* 8-bit Pixel Sunglasses */}
              <rect x="6" y="4" width="4" height="2" fill="#090D0B" />
              <rect x="6" y="4" width="1" height="1" fill="#00E5FF" />
              <rect x="8" y="4" width="1" height="1" fill="#00E5FF" />
            </>
          )}

          {action === 'guarding' && (
            /* 8-bit Mini Shield */
            <>
              <rect x="0" y="5" width="2" height="4" fill="#4FB477" />
              <rect x="0" y="6" width="2" height="2" fill="#FFFFFF" />
            </>
          )}

          {action === 'reviewing' && (
            /* 8-bit Mini Magnifier / Monocle */
            <>
              <rect x="7" y="3" width="3" height="3" fill="none" stroke="#F3BA2F" strokeWidth="0.8" />
              <rect x="10" y="6" width="1" height="1" fill="#F3BA2F" />
            </>
          )}

          {action === 'shipping' && (
            /* 8-bit Mini Booster flame */
            <>
              <rect x="0" y="7" width="1" height="2" fill="#FF4D6D" />
              <rect x="1" y="7" width="1" height="2" fill="#FFB703" />
            </>
          )}
        </svg>

        {/* Floating 8-bit pixel music notes for vibing */}
        {action === 'vibing' && (
          <span className="pixel-note-fx" aria-hidden="true">♪</span>
        )}

        {/* Floating 8-bit pixel Z for sleeping */}
        {action === 'sleeping' && (
          <span className="pixel-zzz-fx" aria-hidden="true">z</span>
        )}
      </div>
    </div>
  );
}
