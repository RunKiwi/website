'use client';

import { useState } from 'react';

export type PixelKiwiAction = 'idle' | 'vibing' | 'reviewing' | 'guarding' | 'sleeping' | 'shipping' | 'dancing' | 'flying';

interface PixelKiwiProps {
  action?: PixelKiwiAction;
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
      title="8-Bit Chunky Chibi Kiwi — click to interact"
      role="button"
      tabIndex={0}
      aria-label={`8-Bit Kiwi ${action}`}
    >
      {/* 8-Bit Chunky Chibi Sprite */}
      <div className={`pixel-kiwi-sprite ${action} ${clicked ? 'hop' : ''}`}>
        <svg
          viewBox="0 0 16 16"
          className="pixel-kiwi-svg"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          {/* Body Greens (Chunky Chibi Base) */}
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

          {/* Eye */}
          {action === 'sleeping' ? (
            /* Closed eye line */
            <rect x="7" y="5" width="3" height="1" fill="#111816" />
          ) : (
            /* Big Cute Chibi Eye */
            <>
              <rect x="7" y="4" width="2" height="2" fill="#111816" />
              <rect x="7" y="4" width="1" height="1" fill="#FFFFFF" />
            </>
          )}

          {/* Chunky Beak */}
          <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
          <rect x="14" y="6" width="1" height="1" fill="#E89115" />

          {/* Chubby Feet */}
          {action === 'dancing' ? (
            /* Dancing / Tapping Feet */
            <>
              <rect x="3" y="12" width="2" height="2" fill="#FFAA28" />
              <rect x="2" y="13" width="3" height="1" fill="#FFAA28" />
              <rect x="9" y="11" width="2" height="2" fill="#FFAA28" />
              <rect x="9" y="12" width="3" height="1" fill="#FFAA28" />
            </>
          ) : (
            /* Standing Feet */
            <>
              <rect x="4" y="12" width="2" height="2" fill="#FFAA28" />
              <rect x="3" y="13" width="3" height="1" fill="#FFAA28" />
              <rect x="8" y="12" width="2" height="2" fill="#FFAA28" />
              <rect x="7" y="13" width="3" height="1" fill="#FFAA28" />
            </>
          )}

          {/* Action Accessories */}
          {action === 'vibing' && (
            /* Headphones & Shades */
            <>
              <rect x="4" y="1" width="5" height="1" fill="#FF4D6D" />
              <rect x="3" y="2" width="1" height="3" fill="#FF4D6D" />
              <rect x="9" y="2" width="1" height="3" fill="#FF4D6D" />
              <rect x="2" y="4" width="1" height="3" fill="#00E5FF" />
              <rect x="9" y="4" width="1" height="3" fill="#00E5FF" />
              <rect x="6" y="4" width="4" height="2" fill="#090D0B" />
              <rect x="6" y="4" width="1" height="1" fill="#00E5FF" />
              <rect x="8" y="4" width="1" height="1" fill="#00E5FF" />
            </>
          )}

          {action === 'reviewing' && (
            /* Golden Monocle */
            <>
              <rect x="7" y="3" width="3" height="3" fill="none" stroke="#FFAA28" strokeWidth="0.8" />
              <rect x="10" y="6" width="1" height="1" fill="#FFAA28" />
            </>
          )}

          {action === 'guarding' && (
            /* Emerald Sentinel Shield */
            <>
              <rect x="0" y="5" width="2" height="4" fill="#4FB477" />
              <rect x="0" y="6" width="2" height="2" fill="#FFFFFF" />
            </>
          )}

          {(action === 'shipping' || action === 'flying') && (
            /* Booster Thrusters */
            <>
              <rect x="0" y="6" width="1" height="3" fill="#FF4D6D" />
              <rect x="1" y="7" width="1" height="1" fill="#FFAA28" />
            </>
          )}

          {action === 'dancing' && (
            /* Upraised Celebrating Wings */
            <>
              <rect x="1" y="4" width="1" height="2" fill="#88BC38" />
              <rect x="0" y="3" width="1" height="1" fill="#88BC38" />
            </>
          )}
        </svg>

        {/* Floating Effects */}
        {action === 'vibing' && (
          <span className="pixel-note-fx" aria-hidden="true">♪</span>
        )}
        {action === 'sleeping' && (
          <span className="pixel-zzz-fx" aria-hidden="true">z</span>
        )}
        {action === 'dancing' && (
          <span className="pixel-note-fx" style={{ color: '#FFB703' }} aria-hidden="true">✨</span>
        )}
      </div>
    </div>
  );
}
