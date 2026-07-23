'use client';

import { Bug, Sparkles, Eye, Wrench, TestTube, ArrowUpCircle, ShieldCheck } from 'lucide-react';

/**
 * Marquee — edge-masked, horizontally-scrolling strip of the swarm's capabilities.
 * Fades at both edges via a CSS mask. Highlights the pain points Kiwi handles
 * so the user can focus on the architecture.
 */

type Item = { label: string; Icon: React.ElementType };

// The capabilities of the Kiwi swarm
const CAPABILITIES: Item[] = [
  { label: 'Bug Triage', Icon: Bug },
  { label: 'Feature Implementation', Icon: Sparkles },
  { label: 'Code Review', Icon: Eye },
  { label: 'Refactoring', Icon: Wrench },
  { label: 'Test Generation', Icon: TestTube },
  { label: 'Dependency Updates', Icon: ArrowUpCircle },
  { label: 'Security Patching', Icon: ShieldCheck },
];

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
          {loop.map((item, i) => {
            const Icon = item.Icon;
            return (
              <li className="marquee-item" key={`${item.label}-${i}`} aria-hidden={i >= half}>
                <Icon size={16} aria-hidden="true" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
