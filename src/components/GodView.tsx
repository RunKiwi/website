'use client';

import { useState, useEffect } from 'react';
import { Reveal } from './Reveal';

type TaskStatus = 'RUNNING' | 'PAUSED' | 'RESOLVED' | 'QUEUED';

type Task = {
  id: string;
  name: string;
  status: TaskStatus;
  logs: string[];
};

const initialTasks: Task[] = [
  { id: 'T-381', name: 'Refactor Auth Middleware', status: 'RUNNING', logs: ['[system] Provisioning sandboxed container...', '[system] Mounting git worktree (22ms)...', '$ go test ./pkg/auth'] },
  { id: 'T-382', name: 'Migrate User Schema', status: 'PAUSED', logs: ['[system] Executing migration script...', '[system] Reverse tunnel offline.', 'Waiting for CLI reconnection to resolve DATABASE_URL...'] },
  { id: 'T-383', name: 'Update Payment Webhook', status: 'RUNNING', logs: ['[system] Sandbox active.', '$ npm run build', 'Build successful. Running integration tests...'] },
  { id: 'T-384', name: 'Fix Memory Leak', status: 'RESOLVED', logs: ['[actor] Patch applied.', '[critic] Review passed. Cost: $0.42', '[system] Changes synced to local worktree. Container destroyed.'] },
  { id: 'T-385', name: 'Add Rate Limiting', status: 'RUNNING', logs: ['[actor] Generating token bucket implementation...', '$ go test ./pkg/ratelimit -bench=.', 'Benchmark passed.'] },
  { id: 'T-386', name: 'Sync Stripe Webhooks', status: 'QUEUED', logs: ['[system] Waiting for available concurrency slot...'] },
];

const logSnippets = [
  '[actor] Reading documentation for Stripe API...',
  '[critic] Diff rejected: Missing nil check on pointer.',
  '$ go test ./... -v',
  '[system] Requesting STRIPE_SECRET_KEY over encrypted tunnel...',
  '[system] Credentials received and cached in-memory.',
  '[actor] Writing patch to payment_handler.go',
  'Test run successful. 0 failures.',
];

export default function GodView() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prev => prev.map(task => {
        if (task.status !== 'RUNNING') return task;
        if (Math.random() > 0.7) {
          const newLog = logSnippets[Math.floor(Math.random() * logSnippets.length)];
          const updatedLogs = [...task.logs, newLog];
          if (updatedLogs.length > 5) updatedLogs.shift();
          return { ...task, logs: updatedLogs };
        }
        return task;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="god-view" className="simulator-section">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">The God View</span>
          <h2 className="section-title">Massive Swarm Parallelization</h2>
          <p className="section-subtitle">
            Watch the Orchestrator break down your epic into 50+ concurrent tasks. Every agent runs in its own isolated git worktree, streaming logs live back to the control plane.
          </p>
        </Reveal>

        <Reveal as="div" className="control-console" id="god-view-console">
          <div className="console-glow"></div>
          
          <div className="console-telemetry-bar">
            <div className="telemetry-item">
              <span className="t-dot active"></span>
              <span className="t-label">Control Plane:</span>
              <span className="t-value text-gradient">ONLINE</span>
            </div>
            <div className="telemetry-item">
              <span className="t-label">Swarm Agents:</span>
              <span className="t-value">3 RUNNING · 1 PAUSED · 1 QUEUED</span>
            </div>
          </div>

          <div 
            className="console-body" 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '16px', 
              padding: '24px', 
              background: 'var(--bg-inset)',
              minHeight: 'auto'
            }}
          >
            {tasks.map(task => (
              <div key={task.id} style={{ 
                background: 'var(--bg-panel)', 
                border: '1px solid var(--border)', 
                borderRadius: '8px', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '240px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                <div style={{ 
                  background: 'var(--bg-card)', 
                  padding: '10px 14px', 
                  borderBottom: '1px solid var(--border)', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'var(--custom-font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{task.id}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>{task.name}</span>
                  </div>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    fontFamily: 'var(--custom-font-mono)',
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    background: task.status === 'RUNNING' ? 'var(--primary-glow)' : 'rgba(255,255,255,0.05)', 
                    color: task.status === 'RUNNING' ? 'var(--primary)' : 'var(--text-muted)',
                    border: task.status === 'RUNNING' ? '1px solid var(--border-glow)' : '1px solid transparent'
                  }}>
                    {task.status}
                  </span>
                </div>
                <div style={{ 
                  padding: '14px', 
                  flex: 1, 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'flex-end', 
                  fontFamily: 'var(--custom-font-mono)', 
                  fontSize: '0.75rem', 
                  lineHeight: '1.5',
                  color: 'var(--text-dim)' 
                }}>
                   {task.logs.map((log, idx) => (
                     <div key={idx} style={{ 
                       color: idx === task.logs.length - 1 && task.status === 'RUNNING' ? 'var(--text-main)' : 'inherit', 
                       marginBottom: '6px', 
                       whiteSpace: 'nowrap', 
                       overflow: 'hidden', 
                       textOverflow: 'ellipsis' 
                     }}>
                       {log}
                     </div>
                   ))}
                   {task.status === 'RUNNING' && (
                      <div style={{ color: 'var(--primary)', animation: 'pulse-dot 1s infinite alternate', marginTop: '4px' }}>█</div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
