'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';

const serverSnippet = `# Build the Kiwi daemon
go build -ldflags="-linkmode=external" -o kiwid cmd/kiwid/main.go

# Start the self-hosted daemon with Docker sandboxing + SQLite
export USE_DOCKER="true"
export KIWI_SERVER_TOKEN="my-secret-token-1234"

./kiwid -addr :8080 -db kiwi.db`;

const clientSnippet = `# Bring your own Anthropic key + a Bearer token for the daemon
export ANTHROPIC_API_KEY="sk-ant-..."

# Submit a task: repo/file + goal + test command
./kiwi -token "my-secret-token-1234" \\
     -task "Fix division by zero in Divide()" \\
     -file demo_project/math_utils.go \\
     -test-cmd "go test ./demo_project/..."`;

const securityBullets = [
  'Your secrets stay on your machine — pulled just-in-time over the reverse tunnel, cached only in the daemon’s memory for the run, and never written to the sandbox.',
  'Every run is network-locked (--network=none), so a rogue agent can’t phone home or reach your host.',
  'Your Anthropic key is encrypted at rest and only decrypted to make a call (AES-256-GCM).',
  'Each org gets its own walled-off space, with per-org limits and an audit trail of every task.',
  'Budget caps stop runaway spend before a job even starts.',
];

export default function Quickstart({ theme }: { theme?: 'cream' }) {
  const [activeTab, setActiveTab] = useState<'server' | 'client'>('server');

  return (
    <section id="quickstart" className={`quickstart-section ${theme === 'cream' ? 'theme-cream' : ''}`}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Quickstart</span>
          <h2 className="section-title">Start a run in a few commands</h2>
          <p className="section-subtitle">
            Run the self-hosted daemon, then submit a task from the CLI with your own Anthropic key. No credit card, no cloud account required.
          </p>
        </Reveal>

        <Reveal as="div" className="quickstart-tabs-wrapper">
          <div className="quickstart-tabs">
            <button
              className={`tab-btn ${activeTab === 'server' ? 'active' : ''}`}
              onClick={() => setActiveTab('server')}
            >
              1. Start the daemon
            </button>
            <button
              className={`tab-btn ${activeTab === 'client' ? 'active' : ''}`}
              onClick={() => setActiveTab('client')}
            >
              2. Submit a task
            </button>
          </div>

          <div className="tab-content-wrapper">
            {/* Server Code Panel */}
            <div className={`code-panel ${activeTab === 'server' ? 'active' : ''}`}>
              <div className="panel-header">
                <span>Daemon host (self-hosted server)</span>
                <button
                  className="code-copy-btn"
                  aria-label="Copy daemon commands"
                  onClick={() => navigator.clipboard.writeText(serverSnippet)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy
                </button>
              </div>
              <pre><code>{serverSnippet}</code></pre>
            </div>

            {/* Client Code Panel */}
            <div className={`code-panel ${activeTab === 'client' ? 'active' : ''}`}>
              <div className="panel-header">
                <span>Local machine (developer CLI)</span>
                <button
                  className="code-copy-btn"
                  aria-label="Copy CLI commands"
                  onClick={() => navigator.clipboard.writeText(clientSnippet)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy
                </button>
              </div>
              <pre><code>{clientSnippet}</code></pre>
            </div>
          </div>

          <div className="security-panel">
            <div className="security-panel-head">
              <span className="security-panel-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <div>
                <span className="security-eyebrow">Built-in security</span>
                <h3 className="security-panel-title">Safe by default, from the very first run</h3>
              </div>
            </div>
            <ul className="security-list">
              {securityBullets.map((bullet, i) => (
                <li key={i} className="security-list-item">
                  <svg className="security-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
