'use client';

/**
 * Marquee — edge-masked, horizontally-scrolling strip of the swarm's capabilities.
 * Fades at both edges via a CSS mask. Highlights the pain points Kiwi handles
 * so the user can focus on the architecture.
 */

type Item = { label: string };

// The capabilities of the Kiwi swarm
const CAPABILITIES: Item[] = [
  { label: 'Bug Triage' },
  { label: 'Feature Implementation' },
  { label: 'Code Review' },
  { label: 'Refactoring' },
  { label: 'Test Generation' },
  { label: 'Dependency Updates' },
  { label: 'Security Patching' },
];

function Spark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  );
}

export default function Marquee() {
  // One "group" repeated enough to overflow any viewport, then duplicated so the
  // -50% translate wraps seamlessly — a circular, never-ending loop.
  const group = [...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES];
  const loop = [...group, ...group];
  const half = loop.length / 2;

  return (
    <section className="marquee-section" aria-label="Kiwi's swarm capabilities">
      <div className="container">
        <p className="marquee-heading">Offload the grind · Focus on the architecture</p>
      </div>
      <div className="marquee-viewport">
        <ul className="marquee-track" aria-hidden="false">
          {loop.map((item, i) => (
            <li className="marquee-item" key={`${item.label}-${i}`} aria-hidden={i >= half}>
              <Spark />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
