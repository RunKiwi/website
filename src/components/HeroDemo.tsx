'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect as useReactEffect, useRef as useReactRef, useState } from 'react';

/**
 * HeroDemo — a diegetic, self-playing "live run" of Kiwi's Actor–Critic loop.
 *
 * It steps through the real product story on a timer:
 *   initial_test → FAIL (panic: divide by zero)
 *   [Actor] proposes a 3-line diff (red/green)
 *   🔒 secret pulled just-in-time
 *   [Critic] approves (safe, minimal fix)
 *   go test ./... → PASS → SUCCESS
 * ...with a live-incrementing token + USD counter, then loops.
 *
 * Under prefers-reduced-motion it renders the full, legible end-state
 * (all steps shown, PASS) with no animation.
 */

type StepKind =
  | 'cmd' | 'fail' | 'actor' | 'diff' | 'chip' | 'critic' | 'pass' | 'success';

type Step = {
  kind: StepKind;
  lead?: string;
  text?: string;
  atMs: number; // when this line appears in the timeline
};

// Timeline (ms offsets). Total loop ~ 8.2s then restart.
const STEPS: Step[] = [
  { kind: 'cmd',    lead: '$', text: 'kiwi run --test "go test ./..."', atMs: 400 },
  { kind: 'cmd',    lead: '→', text: '[initial_test] go test ./...', atMs: 1100 },
  { kind: 'fail',   lead: '✗', text: 'panic: runtime error: integer divide by zero', atMs: 1900 },
  { kind: 'actor',  lead: '[actor]', text: 'proposing guard in math_utils.go:43', atMs: 2700 },
  { kind: 'diff',   atMs: 3300 },
  { kind: 'chip',   text: '🔒 secret pulled just-in-time', atMs: 4300 },
  { kind: 'critic', lead: '[critic]', text: 'approved — safe, minimal fix', atMs: 5100 },
  { kind: 'cmd',    lead: '→', text: '[verify] go test ./...', atMs: 5900 },
  { kind: 'pass',   lead: '✓', text: 'ok  demo_project  0.42s — 14/14 passing', atMs: 6700 },
  { kind: 'success',lead: '●', text: 'RESOLVED — diff synced back to your machine', atMs: 7400 },
];

const LOOP_MS = 8600;
const TOKENS_MAX = 3120;
const COST_MAX = 0.041;

function DiffCard() {
  return (
    <div className="hero-demo-diff" role="figure" aria-label="Proposed code diff">
      <div className="hd-diff-head">math_utils.go</div>
      <div className="hd-diff-line hd-diff-ctx"> func Divide(a, b int) int {'{'}</div>
      <div className="hd-diff-line hd-diff-del">-  return a / b</div>
      <div className="hd-diff-line hd-diff-add">+  if b == 0 {'{'} return 0 {'}'}</div>
      <div className="hd-diff-line hd-diff-add">+  return a / b</div>
      <div className="hd-diff-line hd-diff-ctx"> {'}'}</div>
    </div>
  );
}

function Line({ step }: { step: Step }) {
  if (step.kind === 'diff') return <DiffCard />;
  if (step.kind === 'chip') return <span className="hero-demo-chip">{step.text}</span>;

  const cls =
    step.kind === 'cmd' ? 'hd-cmd'
    : step.kind === 'fail' ? 'hd-fail'
    : step.kind === 'actor' ? 'hd-actor'
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
  const reduce = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduce ? STEPS.length : 0);
  const [tokens, setTokens] = useState(reduce ? TOKENS_MAX : 0);
  const [cost, setCost] = useState(reduce ? COST_MAX : 0);
  const consoleRef = useReactRef<HTMLDivElement>(null);
  const startRef = useReactRef<number>(0);
  const rafRef = useReactRef<number>(0);

  // Timeline driver (skipped entirely under reduced motion).
  useReactEffect(() => {
    if (reduce) return;

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
  }, [reduce]);

  // Keep newest line in view.
  useReactEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const shown = STEPS.slice(0, visibleCount);
  const done = visibleCount >= STEPS.length;
  const failed = visibleCount >= 3 && visibleCount < 7; // between FAIL and critic-approve

  const status =
    reduce || done ? { cls: 'passed', label: 'PASSED' }
    : failed ? { cls: 'failed', label: 'FIXING' }
    : { cls: 'running', label: 'RUNNING' };

  return (
    <div className="hero-demo" role="img" aria-label="A live Kiwi run: a failing test is fixed by an Actor agent, approved by a Critic agent, then passes — with just-in-time secrets and live token and cost counters.">
      <div className="hero-demo-titlebar">
        <div className="hero-demo-dots" aria-hidden="true"><span /><span /><span /></div>
        <span className="hero-demo-file">demo-api · task-3831</span>
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
