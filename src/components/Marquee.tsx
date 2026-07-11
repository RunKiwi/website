'use client';

/**
 * Marquee — edge-masked, horizontally-scrolling strip of the REAL stack.
 * Fades at both edges via a CSS mask. Honest items only: no tool or
 * customer logos we don't actually integrate.
 */

type Item = { label: string };

// The genuine Kiwi stack & integrations.
const STACK: Item[] = [
  { label: 'Anthropic Claude' },
  { label: 'Go' },
  { label: 'Docker' },
  { label: 'GitHub' },
  { label: 'SQLite' },
];

function Spark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  );
}

export default function Marquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...STACK, ...STACK];

  return (
    <section className="marquee-section" aria-label="Kiwi's technology stack">
      <div className="container">
        <p className="marquee-heading">Built on a stack you already trust</p>
      </div>
      <div className="marquee-viewport">
        <ul className="marquee-track" aria-hidden="false">
          {loop.map((item, i) => (
            <li className="marquee-item" key={`${item.label}-${i}`} aria-hidden={i >= STACK.length}>
              <Spark />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
