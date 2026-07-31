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
            Coding agents your security review <em className="text-gradient">can actually approve.</em>
          </h1>
          <p className="hero-subtitle">
            Describe a task in plain English — <strong>the description is the job</strong>, and your own test command is the guard that proves nothing broke. Kiwi plans it, runs it on the <strong>Anthropic, OpenAI or Gemini key you already hold</strong>, and lands one reviewable PR. <strong>Model-generated code gets no network at all</strong>, and the phase that does never holds a secret — and every edit, review verdict and test run is recorded step by step. Run it on our cloud, or entirely inside your own VPC.
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
