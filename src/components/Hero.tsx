'use client';

import Link from 'next/link';
import { useState } from 'react';
import HeroDemo from './HeroDemo';
import { Reveal } from './Reveal';
import { Copy, Check, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const installCmd = 'npm i -g kiwi && kiwi submit "Add pagination to the users API"';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero-section">
      <div className="glow-bg-primary" aria-hidden="true"></div>
      <div className="container hero-container">
        <Reveal as="div" className="hero-content" stagger>
          <div className="badge" id="hero-announcement-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Now live — sign in with GitHub at app.runkiwi.dev</span>
          </div>
          <h1 className="hero-title">
            Agentic coding in <em className="text-gradient">infrastructure you control.</em>
          </h1>
          <h2 className="hero-subheading" style={{ fontSize: '1.75rem', fontWeight: 500, marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Coding agents your security review <em className="text-gradient" style={{ fontStyle: 'normal' }}>can actually approve.</em>
          </h2>
          <p className="hero-subtitle">
            You define the task and the test—Kiwi does the rest. It plans the work, writes the code, and verifies it in a completely isolated sandbox before landing a single, clean PR. Keep your API keys secure and deploy on our cloud or yours.
          </p>

          <div className="hero-actions">
            <Link href="https://app.runkiwi.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="hero-primary-btn">
              Start free — sign in with GitHub
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <Link href="#how-it-works" className="btn btn-outline" id="hero-secondary-btn">See how it runs</Link>
          </div>

          <p className="hero-microcopy">
            Managed cloud or your own VPC · Actor–Critic verdicts recorded per step · One job → one branch → one PR
          </p>

          <div className="hero-cli-install">
            <div className="cli-container">
              <span className="cli-prompt" style={{ fontFamily: 'var(--font-fira-code), Consolas, Monaco, monospace' }}>$</span>
              <code className="cli-command" id="install-command-text" style={{ fontFamily: 'var(--font-fira-code), Consolas, Monaco, monospace' }}>{installCmd}</code>
              <button
                className="cli-copy-btn"
                id="copy-install-btn"
                title="Copy to clipboard"
                aria-label="Copy install command"
                onClick={handleCopy}
              >
                {copied ? <Check className="copy-icon text-green-500 w-4 h-4" /> : <Copy className="copy-icon w-4 h-4" />}
                <span className="copy-tooltip" id="copy-tooltip-text">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" className="hero-visual" delay={0.15}>
          <HeroDemo />
        </Reveal>
      </div>
    </section>
  );
}
