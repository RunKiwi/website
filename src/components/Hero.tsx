'use client';

import Link from 'next/link';
import { useState } from 'react';
import HeroDemo from './HeroDemo';
import { Reveal } from './Reveal';
import { Copy, Check, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install -g kiwi-cli');
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
            <span className="badge-text">The Swarm Control Center</span>
          </div>
          <h1 className="hero-title">
            The infinite workforce for <em className="text-gradient">fast-moving startups.</em>
          </h1>
          <p className="hero-subtitle">
            Close your laptop. The Swarm is taking the night shift. Assign a massive epic and watch Kiwi orchestrate a fleet of parallel agents to plan, build, test, and ship production-ready PRs—all without your secrets ever leaving your VPC.
          </p>

          <div className="hero-actions">
            <Link href="#quickstart" className="btn btn-primary" id="hero-primary-btn">
              Deploy your swarm
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <Link href="#how-it-works" className="btn btn-outline" id="hero-secondary-btn">See the swarm</Link>
          </div>

          <p className="hero-microcopy">
            Bring your own LLM · Zero-knowledge security · Headless by design
          </p>

          <div className="hero-cli-install">
            <div className="cli-container">
              <span className="cli-prompt" style={{ fontFamily: 'var(--font-fira-code), Consolas, Monaco, monospace' }}>$</span>
              <code className="cli-command" id="install-command-text" style={{ fontFamily: 'var(--font-fira-code), Consolas, Monaco, monospace' }}>npm install -g kiwi-cli</code>
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
