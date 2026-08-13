'use client';

import { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { GitPullRequest, ArrowRight } from 'lucide-react';

// CSS class suffixes are inherited from an earlier worker-DAG demo (analyze/impl/verify)
// and reused here for styling only — displayed labels are Architect/Implementer/Verify.
type Stage = 'analyze' | 'impl' | 'verify';
type Status = 'QUEUED' | 'RUNNING' | 'DONE';

type RoundCard = {
  id: string;
  round: number | null; // null = not tied to a specific round (verify)
  name: string;
  stage: Stage;
  status: Status;
  logs: string[];
};

// Kiwi has one execution loop: an Architect sets each round's objective and reviews
// the diff, an Implementer edits the repo with real tools. Sequential rounds, not a
// parallel worker DAG — pkg/loop (the DAG-based loop this demo used to show) was
// retired 2026-08-12. This sim: round 1 gets revised, round 2 fixes it, then verify.
const initialCards: RoundCard[] = [
  { id: 'r1-plan', round: 1, stage: 'analyze', status: 'DONE',
    name: 'round 1 · architect sets the objective',
    logs: ['[architect] Reading every caller of the session store…', '[architect] 3 call sites assume in-memory state', '✓ objective handed to implementer'] },
  { id: 'r1-impl', round: 1, stage: 'impl', status: 'RUNNING',
    name: 'round 1 · implementer edits the repo',
    logs: ['[implementer] Editing pkg/session/store.go…', '$ go test ./pkg/session', 'writing migration 0002_sessions.sql…'] },
  { id: 'r1-review', round: 1, stage: 'analyze', status: 'QUEUED',
    name: 'round 1 · architect reviews the diff',
    logs: ['waiting on the implementer to finish…'] },
  { id: 'r2-impl', round: 2, stage: 'impl', status: 'QUEUED',
    name: 'round 2 · implementer edits the repo',
    logs: ['waiting on round 1’s review…'] },
  { id: 'verify', round: null, stage: 'verify', status: 'QUEUED',
    name: 'verify · full suite + open PR',
    logs: ['waiting on round 2 to go green…'] },
];

const roundSnippets = [
  '[implementer] Reading AGENT.md for repo conventions…',
  '$ go test ./... -run TestSession',
  '[implementer] Re-running against test_cmd…',
  'commit → kiwi/job-42',
  'Tests green. Handing summary to the next round.',
];

const stageLabel: Record<Stage, string> = { analyze: 'ARCHITECT', impl: 'IMPLEMENTER', verify: 'VERIFY' };

export default function GodView() {
  const [cards, setCards] = useState<RoundCard[]>(initialCards);
  const [round, setRound] = useState(1);
  const [prOpen, setPrOpen] = useState(false);

  useEffect(() => {
    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      setCards(prev => {
        const next = prev.map(c => {
          if (c.status === 'RUNNING' && Math.random() > 0.55) {
            const line = roundSnippets[Math.floor(Math.random() * roundSnippets.length)];
            const logs = [...c.logs, line];
            if (logs.length > 4) logs.shift();
            return { ...c, logs };
          }
          return c;
        });

        // Round 1 implementer finishes; architect starts reviewing.
        if (ticks === 4) {
          return next.map(c => c.id === 'r1-impl' ? { ...c, status: 'DONE' as Status }
            : c.id === 'r1-review' ? { ...c, status: 'RUNNING' as Status, logs: ['[architect] Reviewing the diff…'] }
            : c);
        }
        // Review lands: revise, not approve. The rejected attempt is kept, not discarded.
        if (ticks === 6) {
          return next.map(c => c.id === 'r1-review'
            ? { ...c, status: 'DONE' as Status, logs: ['[architect] Missing a rollback path — revise.', '↺ rejected attempt kept, not discarded'] }
            : c.id === 'r2-impl'
            ? { ...c, status: 'RUNNING' as Status, logs: ['[implementer] Reading the architect’s review…', '[implementer] Adding rollback on migration failure…'] }
            : c);
        }
        // Round 2 finishes; verify starts.
        if (ticks === 9) {
          setRound(2);
          return next.map(c => c.id === 'r2-impl' ? { ...c, status: 'DONE' as Status }
            : c.id === 'verify' ? { ...c, status: 'RUNNING' as Status, logs: ['$ go test ./… (full suite)', '✓ 128 passed, 0 failed'] }
            : c);
        }
        if (ticks === 12) {
          return next.map(c => c.id === 'verify'
            ? { ...c, status: 'DONE' as Status, logs: ['✓ 128 passed, 0 failed', '● Opened PR #42 → main'] }
            : c);
        }
        return next;
      });
      if (ticks === 12) setPrOpen(true);
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="simulator-section">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-title">One task in. One PR out.</h2>
          <p className="section-subtitle">
            An Architect sets each round&rsquo;s objective and reviews the diff; an Implementer does the editing with real tools. When the Architect asks for a revision, the rejected attempt is kept, not discarded, and the next round picks up with the feedback attached. What you asked for is the objective; a final verify step runs the full suite to prove the change broke nothing before the PR opens.
          </p>
        </Reveal>

        {/* Pipeline rail */}
        <Reveal as="ol" className="pipeline-rail" aria-label="Execution pipeline">
          {[
            { k: 'kiwi submit', v: 'a plain-English task' },
            { k: 'Plan', v: 'Architect sets the round objective' },
            { k: 'Implement', v: 'Implementer edits with real tools' },
            { k: 'Review', v: 'Architect checks the diff' },
            { k: 'Verify', v: 'the suite still passes' },
            { k: 'Ship', v: 'one reviewable PR' },
          ].map((s, i, arr) => (
            <li key={s.k} className="pipeline-step">
              <span className="pipeline-k">{s.k}</span>
              <span className="pipeline-v">{s.v}</span>
              {i < arr.length - 1 && <ArrowRight className="pipeline-arrow" aria-hidden="true" />}
            </li>
          ))}
        </Reveal>

        <Reveal as="div" className="control-console" id="how-it-works-console">
          <div className="console-glow"></div>

          <div className="console-telemetry-bar">
            <div className="telemetry-item">
              <span className="t-dot active"></span>
              <span className="t-label">Control Plane</span>
              <span className="t-value text-gradient">LEASE QUEUE ONLINE</span>
            </div>
            <div className="telemetry-item">
              <span className="t-label">Job</span>
              <span className="t-value" style={{ fontFamily: 'var(--custom-font-mono)' }}>kiwi/job-42</span>
            </div>
            <div className="telemetry-item">
              <span className="t-label">Round</span>
              <span className="t-value">{round} of 2</span>
            </div>
          </div>

          <div className="swarm-grid">
            {cards.map(c => (
              <div key={c.id} className={`worker-card stage-${c.stage} status-${c.status.toLowerCase()}`}>
                <div className="worker-head">
                  <div className="worker-meta">
                    <span className={`worker-stage stage-${c.stage}`}>{stageLabel[c.stage]}</span>
                    <span className="worker-name">{c.name}</span>
                  </div>
                  <span className={`worker-status ${c.status.toLowerCase()}`}>{c.status}</span>
                </div>
                <div className="worker-dep">
                  {c.round === null ? <span className="dep-root">final step</span> : <>sequential · <code>round {c.round}</code></>}
                </div>
                <div className="worker-logs">
                  {c.logs.map((log, idx) => (
                    <div key={idx} className={`worker-log ${idx === c.logs.length - 1 && c.status === 'RUNNING' ? 'live' : ''}`}>{log}</div>
                  ))}
                  {c.status === 'RUNNING' && <span className="worker-caret">█</span>}
                </div>
              </div>
            ))}

            {/* Terminal outcome — the one PR */}
            <div className={`pr-outcome ${prOpen ? 'open' : ''}`}>
              <GitPullRequest className="pr-icon" aria-hidden="true" />
              <div className="pr-copy">
                <span className="pr-title">{prOpen ? 'PR #42 opened → main' : 'Composing one PR…'}</span>
                <span className="pr-sub">{prOpen ? '2 rounds · 1 branch · suite still green' : 'branch kiwi/job-42 · verify pending'}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
