'use client';

import Link from 'next/link';
import HeroDemo from './HeroDemo';
import { Reveal } from './Reveal';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="glow-bg-primary" aria-hidden="true"></div>
      <div className="container hero-container">
        <Reveal as="div" className="hero-content" stagger>
          <div className="badge" id="hero-announcement-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Post-merge · Tracks regressions after your PR lands.</span>
          </div>
          <h1 className="hero-title">
            Most coding agents disappear the moment a PR opens. <em className="text-gradient">Kiwi doesn&rsquo;t.</em>
          </h1>
          <p className="hero-subtitle">
            Not during review, and not after merge either. It resumes a review comment with full context, and it keeps watching the merged commit for regressions.
          </p>

          <div className="hero-actions">
            <Link href="https://app.runkiwi.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="hero-primary-btn">
              Start free with GitHub
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <Link href="#how-it-works" className="btn btn-outline" id="hero-secondary-btn">See how it runs</Link>
          </div>

          <p className="hero-microcopy">
            No API key to start · Managed cloud or your own VPC · One job → one branch → one PR
          </p>
        </Reveal>

        <Reveal as="div" className="hero-visual" delay={0.15}>
          <HeroDemo />
        </Reveal>
      </div>
    </section>
  );
}
