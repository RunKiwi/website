'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Quickstart() {
  const [activeTab, setActiveTab] = useState<'server' | 'client'>('server');

  return (
    <section id="quickstart" className="quickstart-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get Started in 60 Seconds</h2>
          <p className="section-subtitle">
            Configure the Kiwi daemon host and deploy your first agent task with minimal overhead.
          </p>
        </div>

        <div className="quickstart-tabs-wrapper">
          <div className="quickstart-tabs">
            <button 
              className={`tab-btn ${activeTab === 'server' ? 'active' : ''}`} 
              onClick={() => setActiveTab('server')}
            >
              1. Start Kiwi Daemon
            </button>
            <button 
              className={`tab-btn ${activeTab === 'client' ? 'active' : ''}`}
              onClick={() => setActiveTab('client')}
            >
              2. Run Local CLI Client
            </button>
          </div>
          
          <div className="tab-content-wrapper">
            {/* Server Code Panel */}
            <div className={`code-panel ${activeTab === 'server' ? 'active' : ''}`}>
              <div className="panel-header">
                <span>Host Machine Terminal (Server/VPS)</span>
                <button 
                  className="code-copy-btn" 
                  aria-label="Copy server daemon commands"
                  onClick={() => navigator.clipboard.writeText('# Build Kiwi binaries\ngo build -o kiwid cmd/kiwid/main.go\n\n# Start the daemon on port 8080 (Set secure token)\nexport USE_DOCKER="true"\nexport KIWI_SERVER_TOKEN="production-secure-token-9999"\n\n./kiwid -addr :8080 -db kiwi.db')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy
                </button>
              </div>
              <pre><code>{`# Build Kiwi binaries
go build -o kiwid cmd/kiwid/main.go

# Start the daemon on port 8080 (Set secure token)
export USE_DOCKER="true"
export KIWI_SERVER_TOKEN="production-secure-token-9999"

./kiwid -addr :8080 -db kiwi.db`}</code></pre>
            </div>

            {/* Client Code Panel */}
            <div className={`code-panel ${activeTab === 'client' ? 'active' : ''}`}>
              <div className="panel-header">
                <span>Local Machine Terminal (Developer CLI)</span>
                <button 
                  className="code-copy-btn" 
                  aria-label="Copy local CLI commands"
                  onClick={() => navigator.clipboard.writeText('# Configure Enterprise Vault Injection (Optional)\nexport KIWI_VAULT_PROVIDER="hashicorp" \nexport VAULT_ADDR="https://vault.yourorg.com"\n\n# Submit the task to the orchestrator using a GitHub ticket\nkiwi run --ticket github:42 \\\n     --server "http://kiwi-daemon.yourhost.com:8080" \\\n     --token "production-secure-token-9999" \\\n     --sandbox e2b')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy
                </button>
              </div>
              <pre><code>{`# Configure Enterprise Vault Injection (Optional)
export KIWI_VAULT_PROVIDER="hashicorp" 
export VAULT_ADDR="https://vault.yourorg.com"

# Submit the task to the orchestrator using a GitHub ticket
kiwi run --ticket github:42 \\
     --server "http://kiwi-daemon.yourhost.com:8080" \\
     --token "production-secure-token-9999" \\
     --sandbox e2b`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
