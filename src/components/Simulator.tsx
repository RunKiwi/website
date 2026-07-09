'use client';

import { useState, useEffect, useRef } from 'react';

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
  steelwing: {
    task: 'task-3831',
    title: 'steelwing (TDD loop)',
    desc: 'Fix division by zero inside Divide()',
    tech: 'Golang • Docker v1.21',
    status: 'RUNNING',
    budgetSpent: 1.50,
    budgetLimit: 10.00,
    breakerStatus: 'STABLE',
    cache: { GITHUB_TOKEN: 'cached', DATABASE_URL: 'empty', AWS_SECRET: 'empty' },
    laptopOpen: true,
    logs: [
      { text: 'Initializing task-3831 sandbox context...', type: 'info' },
      { text: 'Local CLI tunnel established. Handshake complete.', type: 'tunnel' },
      { text: 'Golang compiler environment loaded in Docker container.', type: 'success' },
      { text: 'Executing tests: `go test ./pkg/math...` - Output: FAILED (Division by zero)', type: 'cmd' },
      { text: 'Actor editing codebase math_utils.go (L43: add guard check).', type: 'info' }
    ]
  },
  microfish: {
    task: 'task-3832',
    title: 'microfish (data analysis)',
    desc: 'Upload datasets & generate visual charts',
    tech: 'Python • E2B Cloud Sandbox',
    status: 'PAUSED',
    budgetSpent: 0.45,
    budgetLimit: 5.00,
    breakerStatus: 'STABLE',
    cache: { GITHUB_TOKEN: 'cached', DATABASE_URL: 'empty', AWS_SECRET: 'empty' },
    laptopOpen: false,
    logs: [
      { text: 'Task 3832 state restored from db checkpoints.', type: 'info' },
      { text: 'Boto3 client attempting initialization inside sandbox...', type: 'info' },
      { text: 'Sandbox requests credentials vault: AWS_SECRET', type: 'tunnel' },
      { text: 'Cache lookup failed. Requesting credentials via local tunnel...', type: 'warning' },
      { text: 'Tunnel is offline (Laptop closed). Cannot resolve AWS_SECRET.', type: 'warning' },
      { text: 'Task state: PAUSED. Waiting for client CLI to reconnect.', type: 'warning' }
    ]
  },
  threatmapper: {
    task: 'task-3833',
    title: 'threatmapper (multi-agent)',
    desc: 'Researcher & Reviewer personas collaborating',
    tech: 'Node.js • Aider Integration',
    status: 'RUNNING',
    budgetSpent: 8.80,
    budgetLimit: 10.00,
    breakerStatus: 'STABLE',
    cache: { GITHUB_TOKEN: 'cached', DATABASE_URL: 'cached', AWS_SECRET: 'empty' },
    laptopOpen: true,
    logs: [
      { text: 'Task 3833 sandbox container initialized successfully.', type: 'info' },
      { text: 'Multiplexed reverse tunnels connected on port 8080.', type: 'tunnel' },
      { text: 'Pulled GITHUB_TOKEN and DATABASE_URL on-demand.', type: 'success' },
      { text: 'Executing checks: `npm run security-scan` inside sandbox container.', type: 'cmd' },
      { text: 'Analyzing dependency tree files for high CVE alerts...', type: 'info' }
    ]
  }
};

export default function Simulator() {
  const [sandboxes, setSandboxes] = useState<Record<string, Sandbox>>(initialSandboxes);
  const [activeSandboxKey, setActiveSandboxKey] = useState<string>('steelwing');

  const logsRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll logs
  useEffect(() => {
    if (logsRef.current) {
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
              sb.logs.push({ text: `[${timeStr}] Daemon requests remote vault credential: ${keyNeeded}`, type: 'tunnel' });
              
              if (sb.laptopOpen) {
                sb.cache[keyNeeded] = 'cached';
                sb.logs.push({ text: `[${timeStr}] CLI client resolved ${keyNeeded} over tunnel. Storing in cache.`, type: 'success' });
              } else {
                sb.status = 'PAUSED';
                sb.logs.push({ text: `[${timeStr}] Cache vault lookup failed for: ${keyNeeded}. Reverse tunnel is offline.`, type: 'warning' });
                sb.logs.push({ text: `[${timeStr}] Task execution state paused. Awaiting CLI client resume.`, type: 'warning' });
              }
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
    setSandboxes(prev => ({
      ...prev,
      [activeSandboxKey]: {
        ...prev[activeSandboxKey],
        logs: [...prev[activeSandboxKey].logs, { text: `[${timeStr}] ${text}`, type }]
      }
    }));
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
        <div className="section-header">
          <h2 className="section-title">The Secure Control Plane in Action</h2>
          <p className="section-subtitle">
            Explore Kiwi's complete orchestration engine. Select a sandbox, trigger system controls, and observe multi-agent sandboxing, tunneling, budget caps, and safety breakers.
          </p>
        </div>

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
                  <div className="sandbox-graphic-container desktop-only-visual">
                    <div className="graphic-node">
                      <div className={`node-glow-wrapper laptop-glow ${sb.laptopOpen ? 'active' : ''}`}></div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      <span className="node-name">Ecosystem Agent</span>
                      <span className="node-sub" style={{ color: sb.laptopOpen ? 'var(--secondary)' : 'var(--error)' }}>
                        {sb.laptopOpen ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>

                    <div className="graphic-tunnel-wrapper">
                      <div className={`graphic-tunnel-line ${sb.laptopOpen ? 'active' : ''}`}></div>
                      {sb.laptopOpen && <div className="graphic-tunnel-pulse"></div>}
                      <span className="graphic-tunnel-label">VAULT INJECTION</span>
                    </div>

                    <div className="graphic-node">
                      <div className={`node-glow-wrapper container-glow ${containerGlowActive ? 'active' : ''}`} style={{ borderColor: containerGlowColor, boxShadow: containerGlowShadow }}></div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                      <span className="node-name">Pluggable Sandbox</span>
                      <span className="node-sub">{sb.status === 'RUNNING' ? 'Active Loop' : sb.status === 'PAUSED' ? 'Paused' : sb.status === 'COMPLETED' ? 'Resolved' : 'Stopped'}</span>
                    </div>
                  </div>

                  <div className="sandbox-graphic-container-mobile mobile-only-visual">
                    <div className="graphic-node-mobile">
                      <div className={`node-glow-wrapper-mobile laptop-glow ${sb.laptopOpen ? 'active' : ''}`}></div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      <div className="node-mobile-info">
                        <span className="node-mobile-name">Ecosystem Agent</span>
                        <span className="node-mobile-sub" style={{ color: sb.laptopOpen ? 'var(--secondary)' : 'var(--error)' }}>
                          {sb.laptopOpen ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>

                    <div className="graphic-tunnel-wrapper-mobile">
                      <div className={`graphic-tunnel-line-mobile ${sb.laptopOpen ? 'active' : ''}`}></div>
                      {sb.laptopOpen && <div className="graphic-tunnel-pulse-mobile"></div>}
                      <span className="graphic-tunnel-label-mobile">VAULT INJECTION</span>
                    </div>

                    <div className="graphic-node-mobile">
                      <div className={`node-glow-wrapper-mobile container-glow ${containerGlowActive ? 'active' : ''}`} style={{ borderColor: containerGlowColor, boxShadow: containerGlowShadow }}></div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                      <div className="node-mobile-info">
                        <span className="node-mobile-name">Pluggable Sandbox</span>
                        <span className="node-mobile-sub">{sb.status === 'RUNNING' ? 'Active Loop' : sb.status === 'PAUSED' ? 'Paused' : sb.status === 'COMPLETED' ? 'Resolved' : 'Stopped'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="metrics-grid">
                    <div className="metric-box">
                      <span className="m-label">In-Memory Cache:</span>
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
                  <span className="control-card-label">Multi-Agent Control</span>
                  <button 
                    className={`btn btn-primary btn-sm btn-full ${sb.laptopOpen ? 'active' : ''}`}
                    onClick={handleToggleLaptop}
                  >
                    <span className="btn-text">{sb.laptopOpen ? 'Disconnect Target' : 'Reconnect Target'}</span>
                  </button>
                </div>

                <div className="control-card">
                  <span className="control-card-label">Ecosystem Execution</span>
                  <button 
                    className="btn btn-secondary btn-sm btn-full"
                    onClick={handleStepLoop}
                    disabled={sb.status !== 'RUNNING'}
                  >
                    Step Agent Workflow
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
            <div className="logs-window-content" ref={logsRef}>
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
