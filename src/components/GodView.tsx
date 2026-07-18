'use client';

import { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { GitPullRequest, ArrowRight } from 'lucide-react';

type Stage = 'analyze' | 'impl' | 'verify';
type Status = 'QUEUED' | 'RUNNING' | 'DONE';

type Worker = {
  id: string;
  name: string;
  stage: Stage;
  dependsOn: string[];
  status: Status;
  logs: string[];
};

// One job → one branch → a DAG of workers. w1 (analyze) unblocks the three
// parallel impl workers; w5 (verify) depends on all of them and opens the PR.
const initialWorkers: Worker[] = [
  { id: 'w1', name: 'analyze · locate the bug', stage: 'analyze', dependsOn: [], status: 'DONE',
    logs: ['[actor] Reading call sites of Divide()…', '[finding] 3 call sites assume non-nil', '✓ summary handed to dependents'] },
  { id: 'w2', name: 'impl · auth handler', stage: 'impl', dependsOn: ['w1'], status: 'RUNNING',
    logs: ['[actor] Applying nil-guard patch…', '$ go test ./pkg/auth', '[critic] Reviewing diff…'] },
  { id: 'w3', name: 'impl · session store', stage: 'impl', dependsOn: ['w1'], status: 'RUNNING',
    logs: ['[actor] Migrating store to Postgres…', '$ go test ./pkg/session', '[critic] minimal, scoped — approve'] },
  { id: 'w4', name: 'impl · migration script', stage: 'impl', dependsOn: ['w1'], status: 'RUNNING',
    logs: ['[actor] Writing 0002_sessions.sql…', 'commit → kiwi/job-42', '✓ committed to job branch'] },
  { id: 'w5', name: 'verify · full suite + open PR', stage: 'verify', dependsOn: ['w2', 'w3', 'w4'], status: 'QUEUED',
    logs: ['waiting on w2, w3, w4 to go green…'] },
];

const implSnippets = [
  '[actor] Reading AGENT.md for repo conventions…',
  '[critic] Diff rejected: add a rollback path.',
  '$ go test ./... -run TestAuth',
  '[actor] Re-running against test_cmd…',
  'commit → kiwi/job-42',
  '[critic] Scoped and minimal — approve.',
  'Tests green. Handing summary to verify.',
];

const stageLabel: Record<Stage, string> = { analyze: 'ANALYZE', impl: 'IMPL', verify: 'VERIFY' };

export default function GodView() {
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [prOpen, setPrOpen] = useState(false);

  useEffect(() => {
    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      setWorkers(prev => {
        const next = prev.map(w => {
          if (w.status === 'RUNNING' && Math.random() > 0.6) {
            const line = implSnippets[Math.floor(Math.random() * implSnippets.length)];
            const logs = [...w.logs, line];
            if (logs.length > 4) logs.shift();
            return { ...w, logs };
          }
          return w;
        });
        // After a beat, the impl workers finish and verify runs → PR opens.
        if (ticks === 6) return next.map(w => (w.stage === 'impl' ? { ...w, status: 'DONE' as Status } : w));
        if (ticks === 8) return next.map(w => (w.id === 'w5'
          ? { ...w, status: 'RUNNING' as Status, logs: ['$ go test ./… (full suite)', '✓ 128 passed, 0 failed'] }
          : w));
        if (ticks === 11) return next.map(w => (w.id === 'w5'
          ? { ...w, status: 'DONE' as Status, logs: ['✓ 128 passed, 0 failed', '● Opened PR #42 → main'] }
          : w));
        return next;
      });
      if (ticks === 11) setPrOpen(true);
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  const runningCount = workers.filter(w => w.status === 'RUNNING').length;
  const doneCount = workers.filter(w => w.status === 'DONE').length;

  return (
    <section id="how-it-works" className="simulator-section">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-title">One issue in. One PR out.</h2>
          <p className="section-subtitle">
            Kiwi plans your task into a graph of scoped workers, runs them in parallel on a single job branch, and lets the dependencies carry findings forward. Nothing merges until a terminal verify worker proves it green.
          </p>
        </Reveal>

        {/* Pipeline rail */}
        <Reveal as="ol" className="pipeline-rail" aria-label="Execution pipeline">
          {[
            { k: 'kiwi submit', v: 'a plain-English task' },
            { k: 'Plan', v: 'issue → worker DAG' },
            { k: 'Swarm', v: 'workers run in parallel' },
            { k: 'Compose', v: 'commits to one branch' },
            { k: 'Verify', v: 'full suite must pass' },
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
              <span className="t-label">Workers</span>
              <span className="t-value">{runningCount} RUNNING · {doneCount} DONE</span>
            </div>
          </div>

          <div className="swarm-grid">
            {workers.map(w => (
              <div key={w.id} className={`worker-card stage-${w.stage} status-${w.status.toLowerCase()}`}>
                <div className="worker-head">
                  <div className="worker-meta">
                    <span className={`worker-stage stage-${w.stage}`}>{stageLabel[w.stage]}</span>
                    <span className="worker-name">{w.name}</span>
                  </div>
                  <span className={`worker-status ${w.status.toLowerCase()}`}>{w.status}</span>
                </div>
                <div className="worker-dep">
                  {w.dependsOn.length === 0
                    ? <span className="dep-root">root node</span>
                    : <>depends_on <code>{w.dependsOn.join(', ')}</code></>}
                </div>
                <div className="worker-logs">
                  {w.logs.map((log, idx) => (
                    <div key={idx} className={`worker-log ${idx === w.logs.length - 1 && w.status === 'RUNNING' ? 'live' : ''}`}>{log}</div>
                  ))}
                  {w.status === 'RUNNING' && <span className="worker-caret">█</span>}
                </div>
              </div>
            ))}

            {/* Terminal outcome — the one PR */}
            <div className={`pr-outcome ${prOpen ? 'open' : ''}`}>
              <GitPullRequest className="pr-icon" aria-hidden="true" />
              <div className="pr-copy">
                <span className="pr-title">{prOpen ? 'PR #42 opened → main' : 'Composing one PR…'}</span>
                <span className="pr-sub">{prOpen ? '4 workers · 1 branch · verified green' : 'branch kiwi/job-42 · verify pending'}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
