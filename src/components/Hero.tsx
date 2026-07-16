'use client';

import Link from 'next/link';
import HeroDemo from './HeroDemo';
import { Reveal } from './Reveal';

export default function Hero() {
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
            The <em className="text-gradient">swarm intelligence</em> for software engineering.
          </h1>
          <p className="hero-subtitle">
            Stop waiting on single-agent loops. Assign a complex epic and watch Kiwi deploy a fleet of parallel agents to architect, build, test, and ship a production-ready PR.
          </p>

          <div className="hero-actions">
            <Link href="#quickstart" className="btn btn-primary" id="hero-primary-btn">
              Deploy your swarm
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
                onClick={() => navigator.clipboard.writeText('npm install -g kiwi-cli')}
              >
                <svg className="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span className="copy-tooltip" id="copy-tooltip-text">Copy</span>
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
