'use client';

import { Reveal, RevealItem } from './Reveal';
import { GitPullRequest, Fingerprint, Server } from 'lucide-react';

const roadmapItems = [
  {
    icon: <GitPullRequest className="w-6 h-6 text-primary" />,
    title: 'Any-PR monitoring',
    desc: 'Point Kiwi at any merged pull request — not just ones it opened itself — and it starts watching for regressions, the same as it does for its own PRs today.',
    status: 'In the works',
  },
  {
    icon: <Fingerprint className="w-6 h-6 text-primary" />,
    title: 'Verdict record on the PR',
    desc: 'Today, the signed execution record lives in the dashboard. Next, the full verification evidence lands directly on the pull request where the reviewer already is.',
    status: 'Coming soon',
  },
  {
    icon: <Server className="w-6 h-6 text-primary" />,
    title: 'Hardware-isolated execution tier',
    desc: 'A dedicated, stronger-isolation execution option is in development for workloads that require boundary guarantees beyond our standard gVisor sandboxing.',
    status: 'In development',
  },
];

export default function ComingSoon({ theme }: { theme?: 'cream' }) {
  return (
    <section id="coming-soon" className={`features-section ${theme === 'cream' ? 'theme-cream' : ''}`} style={{ backgroundColor: 'var(--bg-inset)' }}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Roadmap</span>
          <h2 className="section-title">What&rsquo;s next</h2>
          <p className="section-subtitle">
            Capabilities currently in development for the next release cycle.
          </p>
        </Reveal>

        <Reveal as="div" className="features-grid" stagger>
          {roadmapItems.map((item, i) => (
            <RevealItem key={i} className="feature-card transition-all duration-300">
              <div className="card-glow"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="feature-icon !mb-0">{item.icon}</div>
                <span className="text-xs font-mono px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(147, 198, 69, 0.1)', color: 'var(--primary)', border: '1px solid rgba(147, 198, 69, 0.2)' }}>
                  {item.status}
                </span>
              </div>
              <h3 className="feature-title" style={{ marginTop: '16px' }}>{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
