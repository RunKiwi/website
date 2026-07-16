'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import { Copy, ShieldCheck, Check, Lock, Network, Key, Database } from 'lucide-react';

const byocSnippet = `# 1. Login to the SaaS Control Plane
kiwi login

# 2. Deploy the secure daemon in your VPC
kiwidaemon --token <ORG_TOKEN>

# 3. Submit a massive epic to the Swarm
kiwi submit "Migrate auth to NextAuth"`;

const ossSnippet = `# Deploy the entire orchestrator, database, queue, 
# and agents on your own hardware using Docker.

git clone https://github.com/runkiwi/kiwi.git
cd kiwi
docker-compose up -d`;

const securityFeatures = [
  {
    icon: <Lock className="w-5 h-5 text-primary" />,
    title: 'Zero-Knowledge Execution',
    desc: 'Secrets are pulled JIT over a reverse tunnel, cached in-memory only, and never written to disk.',
  },
  {
    icon: <Network className="w-5 h-5 text-primary" />,
    title: 'Network-Locked Sandboxes',
    desc: 'Every run is isolated (--network=none). Rogue agents cannot phone home or reach your internal network.',
  },
  {
    icon: <Key className="w-5 h-5 text-primary" />,
    title: 'Asymmetric Encryption',
    desc: 'API keys are encrypted at rest (AES-256-GCM) and decrypted only to make a secure outbound call.',
  },
  {
    icon: <Database className="w-5 h-5 text-primary" />,
    title: 'Walled-Off Organization',
    desc: 'Isolated spaces per organization with strict limits, budget caps, and full audit trails of every task.',
  },
];

export default function Quickstart({ theme }: { theme?: 'cream' }) {
  const [activeTab, setActiveTab] = useState<'byoc' | 'oss'>('byoc');
  const [copiedByoc, setCopiedByoc] = useState(false);
  const [copiedOss, setCopiedOss] = useState(false);

  const handleCopy = (text: string, type: 'byoc' | 'oss') => {
    navigator.clipboard.writeText(text);
    if (type === 'byoc') {
      setCopiedByoc(true);
      setTimeout(() => setCopiedByoc(false), 2000);
    } else {
      setCopiedOss(true);
      setTimeout(() => setCopiedOss(false), 2000);
    }
  };

  return (
    <section id="quickstart" className={`quickstart-section ${theme === 'cream' ? 'theme-cream' : ''}`}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Quickstart</span>
          <h2 className="section-title">Start a run in a few commands</h2>
          <p className="section-subtitle">
            Use our managed Control Plane to orchestrate the swarm in your own VPC, or self-host the entire stack open-source.
          </p>
        </Reveal>

        <Reveal as="div" className="quickstart-tabs-wrapper">
          <div className="quickstart-tabs">
            <button
              className={`tab-btn ${activeTab === 'byoc' ? 'active' : ''}`}
              onClick={() => setActiveTab('byoc')}
            >
              Cloud Control + BYOC
            </button>
            <button
              className={`tab-btn ${activeTab === 'oss' ? 'active' : ''}`}
              onClick={() => setActiveTab('oss')}
            >
              Full Open Source
            </button>
          </div>

          <div className="tab-content-wrapper">
            {/* BYOC Code Panel */}
            <div className={`code-panel ${activeTab === 'byoc' ? 'active' : ''}`}>
              <div className="panel-header">
                <span>Developer CLI (app.runkiwi.dev)</span>
                <button
                  className="code-copy-btn"
                  aria-label="Copy BYOC commands"
                  onClick={() => handleCopy(byocSnippet, 'byoc')}
                >
                  {copiedByoc ? <Check className="w-4 h-4 mr-1 text-green-500" /> : <Copy className="w-4 h-4 mr-1" />}
                  {copiedByoc ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre><code>{byocSnippet}</code></pre>
            </div>

            {/* OSS Code Panel */}
            <div className={`code-panel ${activeTab === 'oss' ? 'active' : ''}`}>
              <div className="panel-header">
                <span>On-Prem Host</span>
                <button
                  className="code-copy-btn"
                  aria-label="Copy OSS commands"
                  onClick={() => handleCopy(ossSnippet, 'oss')}
                >
                  {copiedOss ? <Check className="w-4 h-4 mr-1 text-green-500" /> : <Copy className="w-4 h-4 mr-1" />}
                  {copiedOss ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre><code>{ossSnippet}</code></pre>
            </div>
          </div>

          <div className="security-panel">
            <div className="security-panel-head">
              <span className="security-panel-icon" aria-hidden="true">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </span>
              <div>
                <span className="security-eyebrow">Built-in security</span>
                <h3 className="security-panel-title">Safe by default, from the very first run</h3>
              </div>
            </div>
            <div className="security-bento-grid">
              {securityFeatures.map((feature, i) => (
                <div key={i} className="security-card">
                  <div className="security-card-icon-wrapper">
                    {feature.icon}
                  </div>
                  <h4 className="security-card-title">{feature.title}</h4>
                  <p className="security-card-desc">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
