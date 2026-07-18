'use client';

// Removed unused import
import { useEffect as useReactEffect, useRef as useReactRef, useState } from 'react';

/**
 * HeroDemo — a diegetic, self-playing "live run" of a Kiwi swarm.
 *
 * It mirrors the "How it works" section beat for beat, so the hero and the
 * page below tell one coherent story (same task, same job branch, same PR):
 *   kiwi submit "Migrate auth to Postgres"
 *   [planner] decomposes it into a worker DAG on branch kiwi/job-42
 *   w1 analyze hands findings to the parallel impl workers (w2–w4)
 *   each impl worker commits to the one job branch
 *   [w5 verify] runs the full suite → opens ONE PR (#42)
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
  { kind: 'actor',   lead: '[planner]', text: 'Decomposing into a worker DAG… 5 workers.', atMs: 1400 },
  { kind: 'chip',    text: '🌿 branch kiwi/job-42 · workers fan out in parallel', atMs: 2500 },
  { kind: 'info',    lead: '[w1·analyze]', text: '3 call sites assume non-nil → findings passed on', atMs: 3300 },
  { kind: 'info',    lead: '[w2·impl]', text: 'auth handler → commit to job branch', atMs: 4000 },
  { kind: 'info',    lead: '[w3·impl]', text: 'session store → commit to job branch', atMs: 4500 },
  { kind: 'pass',    lead: '✓', text: 'w4·impl migration script → committed', atMs: 5300 },
  { kind: 'critic',  lead: '[w5·verify]', text: 'Full suite green — 128 passed, 0 failed.', atMs: 6300 },
  { kind: 'success', lead: '●', text: 'Opened PR #42 → main · 4 workers, 1 branch', atMs: 7200 },
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

export default function HeroDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [cost, setCost] = useState(0);

  const consoleRef = useReactRef<HTMLDivElement>(null);
  const startRef = useReactRef<number>(0);
  const rafRef = useReactRef<number>(0);

  // Timeline driver.
  useReactEffect(() => {
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) % LOOP_MS;

      // reset at loop boundary
      if (elapsed < 40) {
        setVisibleCount(0);
        setTokens(0);
        setCost(0);
      }

      const count = STEPS.filter((s) => elapsed >= s.atMs).length;
      setVisibleCount(count);

      // Ramp token + cost counters up to the point of "success".
      const successAt = STEPS[STEPS.length - 1].atMs;
      const p = Math.min(1, elapsed / successAt);
      setTokens(Math.round(TOKENS_MAX * p));
      setCost(Number((COST_MAX * p).toFixed(3)));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Keep newest line in view.
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
    <div className="hero-demo" role="img" aria-label="A live Kiwi run: the planner decomposes 'Migrate auth to Postgres' into a DAG of workers on branch kiwi/job-42, they run in parallel and commit to one branch, a verify worker runs the full suite, and it all lands as a single PR — with live token and cost counters.">
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
  );
}
