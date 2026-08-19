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
// the diff, an Implementer edits the repo with real tools. Sequential rounds.
// This sim: round 1 finishes, PR opens, reviewer comments, it resumes, merges, watches.
const initialCards: RoundCard[] = [
  { id: 'r1-plan', round: 1, stage: 'analyze', status: 'DONE',
    name: 'round 1 · architect sets the objective',
    logs: ['[architect] Reading every caller of the session store…', '[architect] 3 call sites assume in-memory state', '✓ objective handed to implementer'] },
  { id: 'r1-impl', round: 1, stage: 'impl', status: 'DONE',
    name: 'round 1 · implementer edits the repo',
    logs: ['[implementer] Editing pkg/session/store.go…', '$ go test ./pkg/session', 'writing migration 0002_sessions.sql…'] },
  { id: 'r1-verify', round: 1, stage: 'verify', status: 'DONE',
    name: 'round 1 · verify full suite',
    logs: ['$ go test ./… (full suite)', '✓ 128 passed, 0 failed'] },
  { id: 'r1-pr', round: null, stage: 'analyze', status: 'DONE',
    name: 'PR open · human review',
    logs: ['● Opened PR #42 → main', '@reviewer: "Can we add a rollback path?"'] },
  { id: 'r2-impl', round: 2, stage: 'impl', status: 'QUEUED',
    name: 'round 2 · resume from comment',
    logs: ['waiting for resume trigger…'] },
  { id: 'post-merge', round: null, stage: 'verify', status: 'QUEUED',
    name: 'post-merge · watch for regressions',
    logs: ['waiting for merge…'] },
];

const roundSnippets = [
  '[implementer] Reading the reviewer’s comment…',
  '[implementer] Adding rollback on migration failure…',
  '$ go test ./... -run TestSession',
  'commit → kiwi/job-42',
  'Tests green. Handing summary to the next round.',
];

const stageLabel: Record<Stage, string> = { analyze: 'ARCHITECT', impl: 'IMPLEMENTER', verify: 'VERIFY' };

export default function GodView() {
  const [cards, setCards] = useState<RoundCard[]>(initialCards);
  const [round] = useState(2);
  const [prOpen, setPrOpen] = useState(false);

  useEffect(() => {
    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      setCards(prev => {
        const next = prev.map(c => {
          if (c.status === 'RUNNING' && Math.random() > 0.55 && c.id === 'r2-impl') {
            const line = roundSnippets[Math.floor(Math.random() * roundSnippets.length)];
            const logs = [...c.logs, line];
            if (logs.length > 4) logs.shift();
            return { ...c, logs };
          }
          return c;
        });

        // Resume round 2 from comment
        if (ticks === 2) {
          return next.map(c => c.id === 'r2-impl'
            ? { ...c, status: 'RUNNING' as Status, logs: ['[architect] Resume triggered by PR comment.', '[implementer] Adding rollback on migration failure…'] }
            : c);
        }
        // Round 2 finishes;
        if (ticks === 6) {
          return next.map(c => c.id === 'r2-impl' ? { ...c, status: 'DONE' as Status, logs: ['✓ tests pass, pushed to branch'] }
            : c.id === 'post-merge' ? { ...c, status: 'RUNNING' as Status, logs: ['● PR #42 merged', 'watching for 24 hours…'] }
            : c);
        }
        // Verdict lands
        if (ticks === 10) {
          return next.map(c => c.id === 'post-merge'
            ? { ...c, status: 'DONE' as Status, logs: ['● PR #42 merged', 'watching for 24 hours…', '✓ window elapsed, no regression signal'] }
            : c);
        }
        return next;
      });
      if (ticks === 10) setPrOpen(true);
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="simulator-section">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-title">Beyond the merge.</h2>
          <p className="section-subtitle">
            Most agents disappear the moment a PR opens. Kiwi plans, edits, and sandbox-verifies your change — but then it stays. Comment on the PR and it resumes with full context. Merge the PR and it keeps watching for 24 hours, returning a final verdict on whether the commit caused a regression.
          </p>
        </Reveal>

        {/* Pipeline rail */}
        <Reveal as="ol" className="pipeline-rail" aria-label="Execution pipeline">
          {[
            { k: 'Plan', v: 'task objective' },
            { k: 'Edit', v: 'sandbox tools' },
            { k: 'Verify', v: 'test command' },
            { k: 'PR', v: 'human review' },
            { k: 'Resume', v: 'from comment' },
            { k: 'Merge', v: 'code lands' },
            { k: 'Watch', v: 'post-merge window' },
            { k: 'Verdict', v: 'regression free' },
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
              <span className="t-value text-gradient">SESSION ONLINE</span>
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
