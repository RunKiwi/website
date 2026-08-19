'use client';

// Removed unused import
import { useEffect as useReactEffect, useRef as useReactRef, useState } from 'react';

/**
 * HeroDemo — a diegetic, self-playing "live run" of a Kiwi session.
 *
 * It mirrors the "How it works" section beat for beat, so the hero and the
 * page below tell one coherent story (same task, same job branch, same PR):
 *   kiwi submit "Migrate auth to Postgres"
 *   [architect] sets round 1's objective, [implementer] edits the repo
 *   [architect] reviews the diff, asks for a revision — round 2 fixes it
 *   [verify] runs the full suite → opens ONE PR (#42)
 * Sequential rounds, not a parallel worker DAG — pkg/session (Architect
 * sets each round's objective and reviews the diff; Implementer edits with
 * real tools) is the only execution loop.
 * ...with a live-incrementing token + USD counter, then loops.
 *
 * Under prefers-reduced-motion it renders the full, legible end-state
 * (all steps shown, PASSED) with no animation.
 */

type StepKind = 'cmd' | 'actor' | 'info' | 'chip' | 'critic' | 'pass' | 'success';

type Step = {
  kind: StepKind;
  lead?: string;
  text?: string;
  atMs: number; // when this line appears in the timeline
};

// Timeline (ms offsets). Total loop ~ 8.6s then restart.
const STEPS: Step[] = [
  { kind: 'cmd',     lead: '$', text: 'kiwi submit "Migrate auth to Postgres"', atMs: 400 },
  { kind: 'actor',   lead: '[architect]', text: 'round 1 · reading every caller of the session store…', atMs: 1200 },
  { kind: 'chip',    text: '🌿 branch kiwi/job-42 · round 1', atMs: 2000 },
  { kind: 'info',    lead: '[implementer]', text: 'editing pkg/session/store.go…', atMs: 2700 },
  { kind: 'info',    lead: '[implementer]', text: 'writing migration 0002_sessions.sql…', atMs: 3400 },
  { kind: 'critic',  lead: '[architect]', text: 'Missing a rollback path — revise.', atMs: 4200 },
  { kind: 'info',    lead: '[implementer]', text: 'round 2 · adding rollback on migration failure…', atMs: 5000 },
  { kind: 'pass',    lead: '✓', text: 'round 2 · tests green, committed to job branch', atMs: 5800 },
  { kind: 'critic',  lead: '[verify]', text: 'Full suite green — 128 passed, 0 failed.', atMs: 6700 },
  { kind: 'success', lead: '●', text: 'Opened PR #42 → main · 2 rounds, 1 branch', atMs: 7500 },
];

const LOOP_MS = 8600;
const TOKENS_MAX = 3120;
const COST_MAX = 0.041;

function Line({ step }: { step: Step }) {
  if (step.kind === 'chip') return <span className="hero-demo-chip">{step.text}</span>;

  const cls =
    step.kind === 'cmd' ? 'hd-cmd'
    : step.kind === 'actor' ? 'hd-actor'
    : step.kind === 'info' ? 'hd-info'
    : step.kind === 'critic' ? 'hd-critic'
    : step.kind === 'pass' ? 'hd-pass'
    : 'hd-success';

  return (
    <div className={`hero-demo-line ${cls}`}>
      {step.lead && <span className="lead">{step.lead}</span>}
      <span>{step.text}</span>
    </div>
  );
}

import PixelKiwi from './PixelKiwi';

export default function HeroDemo() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [tokens, setTokens] = useState(0);
  const [cost, setCost] = useState(0);
  const consoleRef = useReactRef<HTMLDivElement>(null);

  useReactEffect(() => {
    // Check prefers-reduced-motion: if user prefers reduced motion, show full state
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      const timer = setTimeout(() => {
        setVisibleCount(STEPS.length);
        setTokens(TOKENS_MAX);
        setCost(COST_MAX);
      }, 0);
      return () => clearTimeout(timer);
    }

    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = (now - start) % LOOP_MS;

      // Count visible lines
      let count = 0;
      for (let i = 0; i < STEPS.length; i++) {
        if (elapsed >= STEPS[i].atMs) count = i + 1;
      }
      setVisibleCount(count);

      // Meter progress
      const progress = Math.min(1, elapsed / (LOOP_MS - 1000));
      setTokens(Math.round(progress * TOKENS_MAX));
      setCost(progress * COST_MAX);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Auto-scroll console as lines appear
  useReactEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const shown = STEPS.slice(0, visibleCount);
  const done = visibleCount >= STEPS.length;

  const status =
    done ? { cls: 'passed', label: 'PASSED' }
    : { cls: 'running', label: 'RUNNING' };

  return (
    <div className="hero-demo-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '560px' }}>
      <PixelKiwi action="vibing" position="perched" />
      <div className="hero-demo" role="img" aria-label="A live Kiwi run: the Architect sets round 1's objective for 'Migrate auth to Postgres', the Implementer edits the repo on branch kiwi/job-42, the Architect asks for a revision and round 2 fixes it, a final verify step runs the full suite, and it all lands as a single PR — with live token and cost counters.">
        <div className="hero-demo-titlebar">
          <div className="hero-demo-dots" aria-hidden="true"><span /><span /><span /></div>
          <span className="hero-demo-file">kiwi/job-42 · migrate-auth</span>
          <span className="hero-demo-live"><span className="live-dot" aria-hidden="true" />Live run</span>
        </div>

      <div className="hero-demo-console" ref={consoleRef} aria-hidden="true">
        {shown.map((step, i) => (
          <Line key={`${step.kind}-${i}`} step={step} />
        ))}
      </div>

      <div className="hero-demo-meters">
        <div className="hero-demo-meter">
          <span className="m-k">tokens</span>
          <span className="m-v">{tokens.toLocaleString()}</span>
        </div>
        <div className="hero-demo-meter">
          <span className="m-k">cost</span>
          <span className="m-v ok">${cost.toFixed(3)}</span>
        </div>
        <span className={`hero-demo-status ${status.cls}`}>
          <span className="st-dot" aria-hidden="true" />
          {status.label}
        </span>
      </div>
    </div>
  </div>
  );
}
