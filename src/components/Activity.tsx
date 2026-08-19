'use client';

import { useState, useEffect } from 'react';
import { 
  GitMerge, 
  Eye, 
  Activity as ActivityIcon, 
  ShieldCheck, 
  ShieldAlert,
  GitCommit, 
  CheckCircle2, 
  AlertTriangle,
  XCircle,
  Lock,
  Clock,
  RotateCcw
} from 'lucide-react';
import { Reveal } from './Reveal';
import PixelKiwi from './PixelKiwi';

type Scenario = 'clean' | 'regression';

export default function Activity() {
  const [scenario, setScenario] = useState<Scenario>('clean');
  const [elapsedHours, setElapsedHours] = useState(14.4);

  // Live timer tick for clean scenario
  useEffect(() => {
    if (scenario === 'regression') return;
    const timer = setInterval(() => {
      setElapsedHours((prev) => {
        const next = prev + 0.1;
        return next > 24 ? 0 : next;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [scenario]);

  const progressPercent = scenario === 'clean' 
    ? Math.min(100, Math.round((elapsedHours / 24) * 100))
    : 14; // 3.4h out of 24h before regression detected

  return (
    <section id="activity" className="activity-section">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow" style={{ color: 'var(--primary)' }}>Post-merge guard</span>
          <h2 className="section-title">Telemetry that watches the merge.</h2>
          <p className="section-subtitle">
            Most agents disappear the moment a PR opens. Kiwi watches the landed commit for 24 hours in production, checking for reverts, CI regressions, and telemetry drops before writing the final signed verdict.
          </p>
        </Reveal>

        {/* Spacious, Fully Padded Dashboard Window */}
        <Reveal as="div" className="activity-console-wrapper relative">
          <PixelKiwi action={scenario === 'clean' ? 'guarding' : 'sleeping'} position="perched" />
          <div className="activity-window">
            
            {/* Titlebar with macOS Window Dots & Embedded Segmented Switcher */}
            <div className="activity-titlebar">
              <div className="flex items-center gap-4">
                {/* Red, Yellow, Green Window Dots */}
                <div className="activity-dots" aria-hidden="true">
                  <span className="activity-dot red"></span>
                  <span className="activity-dot yellow"></span>
                  <span className="activity-dot green"></span>
                </div>
                
                <span className="text-xs font-mono text-[var(--text-muted)] pl-2 border-l border-white/10 hidden sm:inline-block">
                  Kiwi Telemetry Engine · <strong className="text-white font-normal">{scenario === 'clean' ? 'PR #42 (auth-postgres)' : 'PR #48 (pool-tuning)'}</strong>
                </span>
              </div>

              {/* Embedded Segmented Control */}
              <div className="activity-segmented-control">
                <button 
                  onClick={() => setScenario('clean')}
                  className={`activity-segment-btn ${scenario === 'clean' ? 'active-clean' : ''}`}
                  type="button"
                  aria-label="View 24h Clean Merge Scenario"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>24h Clean Merge</span>
                </button>
                <button 
                  onClick={() => setScenario('regression')}
                  className={`activity-segment-btn ${scenario === 'regression' ? 'active-regression' : ''}`}
                  type="button"
                  aria-label="View Regression Reverted Scenario"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Regression Reverted</span>
                </button>
              </div>
            </div>

            {/* 4-KPI Metric Strip */}
            <div className="activity-kpi-grid">
              <div className="activity-kpi-item">
                <span className="activity-kpi-label">Target Commit</span>
                <span className="activity-kpi-value">
                  <GitMerge className={`w-4 h-4 shrink-0 ${scenario === 'clean' ? 'text-purple-400' : 'text-amber-400'}`} />
                  {scenario === 'clean' ? 'PR #42 (8f9a2c3)' : 'PR #48 (4c2a10e)'}
                </span>
              </div>

              <div className="activity-kpi-item">
                <span className="activity-kpi-label">Observation Window</span>
                <span className="activity-kpi-value" style={{ color: scenario === 'clean' ? 'var(--primary)' : '#E8A13B' }}>
                  <Clock className="w-4 h-4 shrink-0" />
                  {scenario === 'clean' ? `${elapsedHours.toFixed(1)}h / 24.0h` : 'Halted at 3.4h'}
                </span>
              </div>

              <div className="activity-kpi-item">
                <span className="activity-kpi-label">Signal Health</span>
                <span className="activity-kpi-value" style={{ color: scenario === 'clean' ? 'var(--success)' : '#E06A4E' }}>
                  {scenario === 'clean' ? (
                    <>
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      3 / 3 Cleared
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      Regression Flagged
                    </>
                  )}
                </span>
              </div>

              <div className="activity-kpi-item">
                <span className="activity-kpi-label">Attestation</span>
                <span className="activity-kpi-value">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  {scenario === 'clean' ? 'SHA-256 Signed' : 'Incident Sealed'}
                </span>
              </div>
            </div>

            {/* Main Content Body */}
            <div className="activity-body">
              
              {/* Left Column: 3 Signal Check Cards */}
              <div className="activity-signals-col">
                <div className="activity-col-header">
                  <span className="flex items-center gap-2">
                    <ActivityIcon className="w-4 h-4 text-[var(--primary)]" />
                    Continuous Signals
                  </span>
                  <span>{scenario === 'clean' ? 'Polling: 60s' : 'Halted at incident'}</span>
                </div>

                {/* Signal 1: Revert Scan */}
                <div className="activity-signal-card">
                  <div className="activity-signal-left">
                    <div className={`activity-signal-icon ${scenario === 'clean' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-red-500/10 text-[#E06A4E] border border-red-500/20'}`}>
                      {scenario === 'clean' ? <GitCommit className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="activity-signal-title">Revert Scan</h4>
                      <p className="activity-signal-desc">
                        {scenario === 'clean' 
                          ? '0 revert commits detected on target branch'
                          : 'Revert commit 9d81fe2 merged on main by on-call'}
                      </p>
                    </div>
                  </div>
                  {scenario === 'clean' ? (
                    <span className="activity-pill-cleared">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      CLEARED
                    </span>
                  ) : (
                    <span className="activity-pill-failed">
                      <XCircle className="w-3.5 h-3.5" />
                      REVERT DETECTED
                    </span>
                  )}
                </div>

                {/* Signal 2: CI Runs */}
                <div className="activity-signal-card">
                  <div className="activity-signal-left">
                    <div className={`activity-signal-icon ${scenario === 'clean' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-[#E06A4E] border border-red-500/20'}`}>
                      {scenario === 'clean' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="activity-signal-title">Post-Merge CI Runs</h4>
                      <p className="activity-signal-desc">
                        {scenario === 'clean'
                          ? 'Main branch test suites (128/128 green)'
                          : 'Connection timeout in pool_stress_test (Exit 1)'}
                      </p>
                    </div>
                  </div>
                  {scenario === 'clean' ? (
                    <span className="activity-pill-cleared">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      CLEARED
                    </span>
                  ) : (
                    <span className="activity-pill-failed">
                      <XCircle className="w-3.5 h-3.5" />
                      SUITE FAILED
                    </span>
                  )}
                </div>

                {/* Signal 3: Telemetry Delta */}
                <div className="activity-signal-card">
                  <div className="activity-signal-left">
                    <div className={`activity-signal-icon ${scenario === 'clean' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                      <ActivityIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="activity-signal-title">Production Telemetry</h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[var(--text-dim)] border border-white/10">opt-in</span>
                      </div>
                      <p className="activity-signal-desc">
                        {scenario === 'clean'
                          ? 'P99 latency & error rates nominal (±0.00%)'
                          : '+18.4% error rate spike on pool exhaustion'}
                      </p>
                    </div>
                  </div>
                  {scenario === 'clean' ? (
                    <span className="activity-pill-cleared">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      HEALTHY
                    </span>
                  ) : (
                    <span className="activity-pill-anomaly">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      ANOMALY
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Progress Gauge & Cryptographic Verdict */}
              <div className="activity-verdict-col">
                <div>
                  <div className="activity-col-header pb-2 border-b border-white/10 mb-4">
                    <span>Observation Timeline</span>
                    <span className="flex items-center gap-1.5" style={{ color: scenario === 'clean' ? 'var(--primary)' : '#E06A4E' }}>
                      <Eye className="w-3.5 h-3.5" /> {scenario === 'clean' ? 'Live Watching' : 'Interrupted'}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="activity-progress-wrap mb-5">
                    <div className="flex justify-between text-xs font-mono text-[var(--text-muted)]">
                      <span>{scenario === 'clean' ? '24h observation window' : 'Window halted at 3.4h'}</span>
                      <span className="text-white font-semibold">{progressPercent}%</span>
                    </div>
                    <div className="activity-progress-bar">
                      <div 
                        className={`activity-progress-fill ${scenario === 'regression' ? 'regression' : ''}`} 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Cryptographic Execution Record */}
                  <div className="activity-record-box">
                    <div className="text-[var(--text-dim)] flex justify-between">
                      <span>VERDICT RECORD</span>
                      <span className={scenario === 'clean' ? 'text-emerald-400 font-semibold' : 'text-[#E06A4E] font-semibold'}>
                        {scenario === 'clean' ? 'STATUS: SEALED' : 'INCIDENT SEALED'}
                      </span>
                    </div>
                    <div className="text-[var(--text-muted)] truncate">
                      hash: <span className="text-[var(--text-main)]">{scenario === 'clean' ? '7f8a92b3c4d5e6f1a0b2...' : '3d9e4a1b8c0f5e7a9c2...'}</span>
                    </div>
                    <div className="text-[var(--text-dim)] mt-0.5 truncate text-[11px]">
                      verdict: <span className={scenario === 'clean' ? 'text-emerald-400' : 'text-[#E06A4E]'}>
                        {scenario === 'clean' ? 'NO_REGRESSIONS_DETECTED' : 'REGRESSION_CONFIRMED'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Final Verdict Callout */}
                <div className={`activity-verdict-badge ${scenario === 'regression' ? 'regression' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${scenario === 'clean' ? 'bg-[#4FB477]/20 text-[#4FB477]' : 'bg-[#E06A4E]/20 text-[#E06A4E]'}`}>
                    {scenario === 'clean' ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                      {scenario === 'clean' ? 'Commit Verified' : 'Regression Logged & Reverted'}
                    </div>
                    <p className={`text-xs font-mono mt-0.5 ${scenario === 'clean' ? 'text-[#4FB477]/90' : 'text-[#E06A4E]/90'}`}>
                      {scenario === 'clean' 
                        ? '24h guard concluded with 0 regressions'
                        : 'Revert commit indexed into verification record'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Statusline */}
            <div className="activity-statusline">
              <span>pkg/ver · sha256 hash-chaining</span>
              <span className="flex items-center gap-1.5 font-medium" style={{ color: scenario === 'clean' ? 'var(--primary)' : '#E06A4E' }}>
                Attestation: {scenario === 'clean' ? 'Verified & Signed' : 'Incident Attested & Signed'}
              </span>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
