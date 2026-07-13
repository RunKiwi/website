'use client';

import { useState, useEffect, useRef } from 'react';
import { Reveal } from './Reveal';

type Log = { text: string; type: string };
type SandboxCache = { GITHUB_TOKEN: string; DATABASE_URL: string; AWS_SECRET: string };
type SandboxStatus = 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'TRIPPED';

type Sandbox = {
  task: string;
  title: string;
  desc: string;
  tech: string;
  status: SandboxStatus;
  budgetSpent: number;
  budgetLimit: number;
  breakerStatus: 'STABLE' | 'TRIPPED';
  cache: SandboxCache;
  laptopOpen: boolean;
  logs: Log[];
};

const initialSandboxes: Record<string, Sandbox> = {
  'demo-api': {
    task: 'task-3831',
    title: 'demo-api (Actor–Critic)',
    desc: 'Fix division by zero inside Divide()',
    tech: 'Go • Docker sandbox • Claude',
    status: 'RUNNING',
    budgetSpent: 1.50,
    budgetLimit: 10.00,
    breakerStatus: 'STABLE',
    cache: { GITHUB_TOKEN: 'cached', DATABASE_URL: 'empty', AWS_SECRET: 'empty' },
    laptopOpen: true,
    logs: [
      { text: '[initial_test] go test ./demo_project/... — FAILED (division by zero)', type: 'cmd' },
      { text: 'Reverse tunnel established with local CLI. Handshake complete.', type: 'tunnel' },
      { text: 'Isolated Docker sandbox provisioned (golang base image).', type: 'success' },
      { text: '[actor] Proposing guard check in math_utils.go (L43).', type: 'info' },
      { text: '[critic] Reviewing diff for correctness and safety...', type: 'info' }
    ]
  },
  'web-app': {
    task: 'task-3832',
    title: 'web-app (resumable)',
    desc: 'Patch nil check in report exporter',
    tech: 'Go • Docker sandbox • Claude',
    status: 'PAUSED',
    budgetSpent: 0.45,
    budgetLimit: 5.00,
    breakerStatus: 'STABLE',
    cache: { GITHUB_TOKEN: 'cached', DATABASE_URL: 'empty', AWS_SECRET: 'empty' },
    laptopOpen: false,
    logs: [
      { text: 'Task state restored from checkpoint on daemon restart.', type: 'info' },
      { text: '[actor] Preparing edit that reads DATABASE_URL at runtime.', type: 'info' },
      { text: 'Sandbox requests just-in-time secret: DATABASE_URL', type: 'tunnel' },
      { text: 'Daemon memory cache miss. Requesting over reverse tunnel...', type: 'warning' },
      { text: 'Reverse tunnel offline (laptop closed). Cannot resolve DATABASE_URL.', type: 'warning' },
      { text: 'Task state: PAUSED. Will resume when the CLI reconnects.', type: 'warning' }
    ]
  },
  'api-service': {
    task: 'task-3833',
    title: 'api-service (headless)',
    desc: 'Add pagination to list endpoint',
    tech: 'Go • Docker sandbox • Claude',
    status: 'RUNNING',
    budgetSpent: 8.80,
    budgetLimit: 10.00,
    breakerStatus: 'STABLE',
    cache: { GITHUB_TOKEN: 'cached', DATABASE_URL: 'cached', AWS_SECRET: 'empty' },
    laptopOpen: true,
    logs: [
      { text: 'Isolated Docker sandbox initialized successfully.', type: 'info' },
      { text: 'Reverse credential tunnel connected on port 8080.', type: 'tunnel' },
      { text: 'Pulled GITHUB_TOKEN just-in-time; cached in daemon memory for this run.', type: 'success' },
      { text: '[test] go test ./... inside the sandbox container.', type: 'cmd' },
      { text: '[critic] Diff approved. Cost accrued this run: $8.80 of $10.00 cap.', type: 'info' }
    ]
  }
};

export default function Simulator() {
  const [sandboxes, setSandboxes] = useState<Record<string, Sandbox>>(initialSandboxes);
  const [activeSandboxKey, setActiveSandboxKey] = useState<string>('demo-api');

  const logsRef = useRef<HTMLDivElement>(null);
  const isUserScrolledUp = useRef(false);

  const handleLogsScroll = () => {
    if (!logsRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = logsRef.current;
    isUserScrolledUp.current = scrollTop + clientHeight < scrollHeight - 10;
  };
  
  // Auto-scroll logs
  useEffect(() => {
    if (logsRef.current && !isUserScrolledUp.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [sandboxes, activeSandboxKey]);

  // Background random requests
  useEffect(() => {
    const interval = setInterval(() => {
      setSandboxes(prev => {
        const next = { ...prev };
        let updated = false;
        Object.keys(next).forEach(k => {
          const sb = { ...next[k], cache: { ...next[k].cache }, logs: [...next[k].logs] };
          if (sb.status === 'RUNNING' && Math.random() > 0.8) {
            const emptyKeys = Object.keys(sb.cache).filter(key => sb.cache[key as keyof SandboxCache] === 'empty') as (keyof SandboxCache)[];
            if (emptyKeys.length > 0) {
              const keyNeeded = emptyKeys[Math.floor(Math.random() * emptyKeys.length)];
              const timeStr = new Date().toLocaleTimeString();
              sb.logs.push({ text: `[${timeStr}] Sandbox requests just-in-time secret: ${keyNeeded}`, type: 'tunnel' });
              
              if (sb.laptopOpen) {
                sb.cache[keyNeeded] = 'cached';
                sb.logs.push({ text: `[${timeStr}] CLI client resolved ${keyNeeded} over tunnel. Storing in cache.`, type: 'success' });
              } else {
                sb.status = 'PAUSED';
                sb.logs.push({ text: `[${timeStr}] Daemon memory cache miss for: ${keyNeeded}. Reverse tunnel is offline.`, type: 'warning' });
                sb.logs.push({ text: `[${timeStr}] Task execution state paused. Awaiting CLI client resume.`, type: 'warning' });
              }
              if (sb.logs.length > 100) sb.logs = sb.logs.slice(-100);
              next[k] = sb;
              updated = true;
            }
          }
        });
        return updated ? next : prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sb = sandboxes[activeSandboxKey];

  const log = (text: string, type = 'info') => {
    const timeStr = new Date().toLocaleTimeString();
    setSandboxes(prev => {
      const newLogs = [...prev[activeSandboxKey].logs, { text: `[${timeStr}] ${text}`, type }];
      if (newLogs.length > 100) newLogs.splice(0, newLogs.length - 100);
      return {
        ...prev,
        [activeSandboxKey]: {
          ...prev[activeSandboxKey],
          logs: newLogs
        }
      };
    });
  };

  const handleToggleLaptop = () => {
    setSandboxes(prev => {
      const next = { ...prev };
      const currentSb = { ...next[activeSandboxKey], logs: [...next[activeSandboxKey].logs] };
      currentSb.laptopOpen = !currentSb.laptopOpen;
      const timeStr = new Date().toLocaleTimeString();

      if (currentSb.laptopOpen) {
        currentSb.logs.push({ text: `[${timeStr}] Local client re-established tunnel stream.`, type: 'tunnel' });
        if (currentSb.status === 'PAUSED') {
          currentSb.status = 'RUNNING';
          currentSb.logs.push({ text: `[${timeStr}] Resuming paused sandbox execution thread.`, type: 'success' });
        }
      } else {
        currentSb.logs.push({ text: `[${timeStr}] Laptop tunnel connection severed (Laptop Closed).`, type: 'warning' });
        if (currentSb.status === 'RUNNING') {
          const missingKey = Object.keys(currentSb.cache).find(k => currentSb.cache[k as keyof SandboxCache] === 'empty');
          if (missingKey) {
            currentSb.status = 'PAUSED';
            currentSb.logs.push({ text: `[${timeStr}] Daemon lookup failed for: ${missingKey}. Reverse tunnel offline.`, type: 'warning' });
            currentSb.logs.push({ text: `[${timeStr}] Task state paused. Daemon awaiting tunnel reconnection.`, type: 'warning' });
          } else {
            currentSb.logs.push({ text: `[${timeStr}] All required credentials cached in-memory. Execution loops continue headless.`, type: 'success' });
          }
        }
      }
      next[activeSandboxKey] = currentSb;
      return next;
    });
  };

  const handleStepLoop = () => {
    if (sb.status !== 'RUNNING') return;

    if (sb.budgetSpent >= sb.budgetLimit) {
      setSandboxes(prev => ({
        ...prev,
        [activeSandboxKey]: { ...prev[activeSandboxKey], status: 'PAUSED' }
      }));
      log('Budget limit reached. Pausing loop.', 'warning');
      return;
    }

    setSandboxes(prev => ({
      ...prev,
      [activeSandboxKey]: { ...prev[activeSandboxKey], budgetSpent: prev[activeSandboxKey].budgetSpent + 0.50 }
    }));

    const stepsPool = [
      { text: '[ACTOR] Evaluating test logs. Editing main code block...', type: 'info' },
      { text: '[SANDBOX] Docker compiling codebase... compilation success.', type: 'cmd' },
      { text: '[SANDBOX] Spawning Docker Go check: `go test ./...`', type: 'cmd' }
    ];

    stepsPool.forEach((s, idx) => {
      setTimeout(() => {
        log(s.text, s.type);
        if (idx === stepsPool.length - 1) {
          if (Math.random() > 0.6) {
            setSandboxes(prev => ({
              ...prev,
              [activeSandboxKey]: { ...prev[activeSandboxKey], status: 'COMPLETED' }
            }));
            log('[CRITIC] TDD Loop verification PASSED. Compiler exit: 0. Tests passed.', 'success');
            log('Task RESOLVED. Saving fixed codebase ZIP archive.', 'success');
          } else {
            log('[CRITIC] Compiler stdout matched failure: nil pointer check. Refining diff.', 'warning');
          }
        }
      }, idx * 400 + 100);
    });
  };

  const handleTriggerBreaker = () => {
    if (sb.status !== 'RUNNING') return;
    log('[ACTOR] Pushing modified loop statements.', 'info');
    log('[SANDBOX] Running: `go test ./pkg/...`', 'cmd');
    
    setTimeout(() => {
      log('[CRITIC] Test output matched previous failure signature (Loop #3).', 'warning');
      log('[SAFETY] Infinite loop recursion alert tripped by identical test failures!', 'warning');
      setSandboxes(prev => ({
        ...prev,
        [activeSandboxKey]: { ...prev[activeSandboxKey], breakerStatus: 'TRIPPED', status: 'TRIPPED' }
      }));
      log('Circuit Breaker TRIPPED. Docker container killed to prevent CPU/token drainage.', 'warning');
    }, 800);
  };

  const handleTriggerBudget = () => {
    if (sb.status !== 'RUNNING') return;
    setSandboxes(prev => ({
      ...prev,
      [activeSandboxKey]: { ...prev[activeSandboxKey], budgetSpent: prev[activeSandboxKey].budgetLimit, status: 'PAUSED' }
    }));
    log(`[BUDGET] Cost threshold exceeded.`, 'warning');
    log('Safety Cap triggered: Budget limit exceeded. Pausing container execution.', 'warning');
  };

  const handleClearLogs = () => {
    setSandboxes(prev => ({
      ...prev,
      [activeSandboxKey]: { ...prev[activeSandboxKey], logs: [{ text: `[${new Date().toLocaleTimeString()}] Logs cleared.`, type: 'info' }] }
    }));
  };

  const liveTunnels = Object.values(sandboxes).filter(s => s.laptopOpen).length;
  const hasAlerts = Object.values(sandboxes).some(s => s.breakerStatus === 'TRIPPED' || s.budgetSpent >= s.budgetLimit);

  // Compute styles dynamically
  const containerGlowActive = sb.status === 'RUNNING' || sb.status === 'PAUSED' || sb.status === 'COMPLETED';
  const containerGlowColor = sb.status === 'PAUSED' ? 'var(--warning)' : sb.status === 'COMPLETED' ? 'var(--success)' : '';
  const containerGlowShadow = sb.status === 'PAUSED' ? '0 0 15px rgba(245, 158, 11, 0.4)' : sb.status === 'COMPLETED' ? '0 0 15px rgba(16, 185, 129, 0.4)' : '';

  return (
    <section id="how-it-works" className="simulator-section">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-title">Submit, run, resume</h2>
          <p className="section-subtitle">
            From your terminal to a fixed codebase — in three moves.
          </p>
        </Reveal>

        <Reveal as="div" className="how-it-works-triad" stagger>
          <div className="hiw-step">
            <span className="hiw-step-index" aria-hidden="true">01</span>
            <span className="hiw-step-num">1</span>
            <h3 className="hiw-step-title">Submit</h3>
            <p className="hiw-step-desc">
              Point the CLI at your repo, give it a goal. Kiwi takes it from there.
            </p>
          </div>
          <div className="hiw-step">
            <span className="hiw-step-index" aria-hidden="true">02</span>
            <span className="hiw-step-num">2</span>
            <h3 className="hiw-step-title">Run</h3>
            <p className="hiw-step-desc">
              A sandbox spins up. One agent fixes, another reviews — secrets pulled only when needed.
            </p>
          </div>
          <div className="hiw-step">
            <span className="hiw-step-index" aria-hidden="true">03</span>
            <span className="hiw-step-num">3</span>
            <h3 className="hiw-step-title">Watch &amp; resume</h3>
            <p className="hiw-step-desc">
              Stream every step, review the diff, and never lose a run.
            </p>
          </div>
        </Reveal>

        <p className="simulator-preview-note">
          Preview of the live Actor–Critic timeline. The web console is a monitoring board today — task submission runs through the CLI.
        </p>

        <div className="control-console" id="simulator-section">
          <div className="console-glow"></div>
          
          <div className="console-telemetry-bar">
            <div className="telemetry-item">
              <span className="t-dot active"></span>
              <span className="t-label">Control Plane:</span>
              <span className="t-value text-gradient">ONLINE</span>
            </div>
            <div className="telemetry-item">
              <span className="t-label">Sandboxes:</span>
              <span className="t-value">3 Active</span>
            </div>
            <div className="telemetry-item">
              <span className="t-label">Active Tunnels:</span>
              <span className="t-value">{liveTunnels} / 3 Connected</span>
            </div>
            {hasAlerts && (
              <div className="telemetry-item text-warning">
                <span className="t-dot warn"></span>
                <span className="t-value">ALERT DETECTED</span>
              </div>
            )}
          </div>

          <div className="console-body">
            <div className="console-sidebar">
              <h4 className="sidebar-title">Active Sandboxes</h4>
              <div className="sandbox-list">
                {Object.entries(sandboxes).map(([key, data]) => (
                  <div 
                    key={key}
                    className={`sandbox-item ${activeSandboxKey === key ? 'active' : ''}`}
                    onClick={() => setActiveSandboxKey(key)}
                  >
                    <div className="sb-header">
                      <span className="sb-id">{data.task}</span>
                      <span className={`sb-badge ${data.status.toLowerCase()}`}>{data.status}</span>
                    </div>
                    <h5 className="sb-title">{data.title}</h5>
                    <p className="sb-desc">{data.desc}</p>
                    <div className="sb-tech">{data.tech}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="console-main-visual">
              <div className="visual-card">
                <div className="visual-card-header">
                  <span className="v-title">SANDBOX: {sb.task} ({activeSandboxKey})</span>
                  <span className={`v-status-pill ${sb.status.toLowerCase()}`}>{sb.status}</span>
                </div>
                
                <div className="visual-card-body">
                  <div className="sandbox-graphic-container w-full flex flex-col md:flex-row items-center justify-between relative py-4">
                    <div className="graphic-node flex flex-row md:flex-col items-center gap-4 md:gap-2 w-full max-w-[280px] md:max-w-none md:w-auto bg-white/5 md:bg-transparent border border-white/10 md:border-transparent rounded-lg p-3 md:p-0 relative">
                      <div className={`node-glow-wrapper laptop-glow ${sb.laptopOpen ? 'active' : ''}`}></div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2" className="relative z-10">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      <div className="flex flex-col text-left md:text-center relative z-10 flex-1 md:flex-auto">
                        <span className="node-name text-sm md:text-base">Local CLI</span>
                        <span className="node-sub text-xs md:text-sm" style={{ color: sb.laptopOpen ? 'var(--secondary)' : 'var(--error)' }}>
                          {sb.laptopOpen ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>

                    <div className="graphic-tunnel-wrapper w-1 md:w-32 h-12 md:h-auto my-4 md:my-0 flex items-center justify-center relative">
                      <div className={`graphic-tunnel-line absolute inset-0 ${sb.laptopOpen ? 'active' : ''}`}></div>
                      {sb.laptopOpen && <div className="graphic-tunnel-pulse"></div>}
                      <span className="graphic-tunnel-label absolute left-6 md:left-1/2 md:-translate-x-1/2 md:-top-6 text-[10px] md:text-xs whitespace-nowrap text-muted font-mono">REVERSE TUNNEL</span>
                    </div>

                    <div className="graphic-node flex flex-row md:flex-col items-center gap-4 md:gap-2 w-full max-w-[280px] md:max-w-none md:w-auto bg-white/5 md:bg-transparent border border-white/10 md:border-transparent rounded-lg p-3 md:p-0 relative">
                      <div className={`node-glow-wrapper container-glow ${containerGlowActive ? 'active' : ''}`} style={{ borderColor: containerGlowColor, boxShadow: containerGlowShadow }}></div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" className="relative z-10">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                      <div className="flex flex-col text-left md:text-center relative z-10 flex-1 md:flex-auto">
                        <span className="node-name text-sm md:text-base">Docker Sandbox</span>
                        <span className="node-sub text-xs md:text-sm">{sb.status === 'RUNNING' ? 'Active Loop' : sb.status === 'PAUSED' ? 'Paused' : sb.status === 'COMPLETED' ? 'Resolved' : 'Stopped'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="metrics-grid">
                    <div className="metric-box">
                      <span className="m-label">Daemon Memory Cache:</span>
                      <div className="m-cache-slots">
                        <span className={`cache-pill ${sb.cache.GITHUB_TOKEN === 'cached' ? 'cached' : 'empty'}`}>GITHUB_TOKEN: {sb.cache.GITHUB_TOKEN}</span>
                        <span className={`cache-pill ${sb.cache.DATABASE_URL === 'cached' ? 'cached' : 'empty'}`}>DATABASE_URL: {sb.cache.DATABASE_URL}</span>
                        <span className={`cache-pill ${sb.cache.AWS_SECRET === 'cached' ? 'cached' : 'empty'}`}>AWS_SECRET: {sb.cache.AWS_SECRET}</span>
                      </div>
                    </div>
                    <div className="metric-box">
                      <span className="m-label">Safety Budget Cap:</span>
                      <div className="m-progress-bar">
                        <div className="m-progress-fill" style={{width: `${(sb.budgetSpent / sb.budgetLimit) * 100}%`}}></div>
                      </div>
                      <div className="m-progress-labels">
                        <span>${sb.budgetSpent.toFixed(2)} spent</span>
                        <span>${sb.budgetLimit.toFixed(2)} Limit</span>
                      </div>
                    </div>
                    <div className="metric-box">
                      <span className="m-label">Circuit Breaker:</span>
                      <div className={`m-breaker-status ${sb.breakerStatus === 'STABLE' ? 'status-stable' : 'status-alert'}`}>
                        <span className="breaker-dot"></span>
                        <span className="breaker-txt">{sb.breakerStatus === 'STABLE' ? 'STABLE (No loops)' : 'TRIPPED (Recursion)'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="console-controls">
              <h4 className="controls-title">Trigger Controls</h4>
              <p className="controls-desc">Trigger system actions on the active sandbox.</p>
              
              <div className="control-actions-list">
                <div className="control-card">
                  <span className="control-card-label">Reverse Tunnel</span>
                  <button
                    className={`btn btn-primary btn-sm btn-full ${sb.laptopOpen ? 'active' : ''}`}
                    onClick={handleToggleLaptop}
                  >
                    <span className="btn-text">{sb.laptopOpen ? 'Close laptop (sever tunnel)' : 'Reconnect tunnel'}</span>
                  </button>
                </div>

                <div className="control-card">
                  <span className="control-card-label">Actor–Critic Loop</span>
                  <button
                    className="btn btn-secondary btn-sm btn-full"
                    onClick={handleStepLoop}
                    disabled={sb.status !== 'RUNNING'}
                  >
                    Step the loop
                  </button>
                </div>

                <div className="control-card">
                  <span className="control-card-label">Safety & Security Systems</span>
                  <div className="dual-btn-group">
                    <button 
                      className="btn btn-outline btn-sm btn-half"
                      onClick={handleTriggerBreaker}
                      disabled={sb.status !== 'RUNNING'}
                    >
                      Loop Crash
                    </button>
                    <button 
                      className="btn btn-outline btn-sm btn-half"
                      onClick={handleTriggerBudget}
                      disabled={sb.status !== 'RUNNING'}
                    >
                      Cap Limit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="console-footer-logs">
            <div className="logs-header-bar">
              <span>Diagnostic Logs Console Output</span>
              <button className="btn-clear-logs" onClick={handleClearLogs}>Clear</button>
            </div>
            <div className="logs-window-content" ref={logsRef} onScroll={handleLogsScroll}>
              {sb.logs.map((l, i) => (
                <div key={i} className={`log-row ${l.type}`}>{l.text}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
