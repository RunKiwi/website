'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Reveal } from './Reveal';
import { Copy, ShieldCheck, Check, Lock, Network, Key, Gauge, ArrowRight } from 'lucide-react';

const managedSnippet = `# Sign in with GitHub at app.runkiwi.dev — or use the CLI:

# 1. Install the CLI and log in
npm i -g kiwi && kiwi login

# 2. Submit a task — no cloud account, no VM
kiwi submit "Migrate auth to Postgres"

# Kiwi plans it, runs the swarm, and opens
# one verified PR. That's it.`;

const byocSnippet = `# Graduate to your own cloud when you're ready.

# 1. Provision the daemon in your VPC
terraform apply   # VPC + VM + kiwidaemon

# 2. Register it with a single-use join token
kiwidaemon --join-token "$KIWI_JOIN_TOKEN"

# 3. Same command — now it runs in YOUR account
kiwi submit "Migrate auth to Postgres"`;

const securityFeatures = [
  {
    icon: <Key className="w-5 h-5 text-primary" />,
    title: 'Sealed credentials',
    desc: 'Keys are sealed to the daemon with X25519 and only ever opened in memory. In BYOC that key lives only on your machine — the Control Plane cannot decrypt them.',
  },
  {
    icon: <Network className="w-5 h-5 text-primary" />,
    title: 'Default-deny egress',
    desc: 'Sandbox traffic is allowlisted to the model endpoint, package registries, and your VCS — so model-generated code can’t exfiltrate a repo, but real builds still work.',
  },
  {
    icon: <Lock className="w-5 h-5 text-primary" />,
    title: 'The sandbox never holds a key',
    desc: 'A local proxy injects auth headers on the daemon side. A prompt-injected agent has nothing to steal, because the raw credential never enters the container.',
  },
  {
    icon: <Gauge className="w-5 h-5 text-primary" />,
    title: 'Per-org budgets & isolation',
    desc: 'Every org gets enforced concurrency, per-task step and USD caps, and a hard spend ceiling — so “50 agents overnight” can never become a runaway bill.',
  },
];

export default function Quickstart({ theme }: { theme?: 'cream' }) {
  const [activeTab, setActiveTab] = useState<'managed' | 'byoc'>('managed');
  const [copiedManaged, setCopiedManaged] = useState(false);
  const [copiedByoc, setCopiedByoc] = useState(false);

  const handleCopy = (text: string, type: 'managed' | 'byoc') => {
    navigator.clipboard.writeText(text);
    if (type === 'managed') {
      setCopiedManaged(true);
      setTimeout(() => setCopiedManaged(false), 2000);
    } else {
      setCopiedByoc(true);
      setTimeout(() => setCopiedByoc(false), 2000);
    }
  };

  return (
    <section id="quickstart" className={`quickstart-section ${theme === 'cream' ? 'theme-cream' : ''}`}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Quickstart</span>
          <h2 className="section-title">Your first PR in one command</h2>
          <p className="section-subtitle">
            Start on our managed cloud with nothing to provision. Graduate to your own VPC later — the command you type never changes.
          </p>
          <div className="quickstart-cta">
            <Link href="https://app.runkiwi.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="quickstart-app-btn">
              Open app.runkiwi.dev
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </Reveal>

        <Reveal as="div" className="quickstart-tabs-wrapper">
          <div className="quickstart-tabs">
            <button
              className={`tab-btn ${activeTab === 'managed' ? 'active' : ''}`}
              onClick={() => setActiveTab('managed')}
            >
              Managed <span className="tab-pill">start here</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'byoc' ? 'active' : ''}`}
              onClick={() => setActiveTab('byoc')}
            >
              Bring Your Own Cloud
            </button>
          </div>

          <div className="tab-content-wrapper">
            {/* Managed Code Panel */}
            <div className={`code-panel ${activeTab === 'managed' ? 'active' : ''}`}>
              <div className="panel-header">
                <span>Managed — no setup (app.runkiwi.dev)</span>
                <button
                  className="code-copy-btn"
                  aria-label="Copy managed commands"
                  onClick={() => handleCopy(managedSnippet, 'managed')}
                >
                  {copiedManaged ? <Check className="w-4 h-4 mr-1 text-green-500" /> : <Copy className="w-4 h-4 mr-1" />}
                  {copiedManaged ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre><code>{managedSnippet}</code></pre>
            </div>

            {/* BYOC Code Panel */}
            <div className={`code-panel ${activeTab === 'byoc' ? 'active' : ''}`}>
              <div className="panel-header">
                <span>BYOC — your AWS/GCP account</span>
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
