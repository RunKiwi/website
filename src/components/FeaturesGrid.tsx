import { Reveal, RevealItem } from './Reveal';
import { Cloud, Shield, Network, Zap, Terminal } from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: React.ReactNode;
  desc: React.ReactNode;
};

const features: Feature[] = [
  {
    icon: <Cloud className="w-6 h-6 text-primary" />,
    title: (
      <>
        Bring Your Own Cloud (BYOC)
        <span className="feature-tag">1-Click Terraform</span>
      </>
    ),
    desc: 'Deploy the KiwiDaemon via Terraform. Your proprietary code never leaves your VPC. We just send the instructions.',
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: 'Zero-Knowledge Credentials',
    desc: 'API keys are encrypted at the edge using Asymmetric cryptography. Our Control Plane never sees your plaintext keys.',
  },
  {
    icon: <Network className="w-6 h-6 text-primary" />,
    title: 'Massive Swarm Parallelization',
    desc: 'Our Orchestrator breaks massive issues into a DAG of sub-tasks, executing across 50+ sandboxes simultaneously.',
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: 'Lightning-Fast Caching',
    desc: 'Utilizing LFU git-worktree isolation, sandboxes are provisioned in milliseconds without redownloading heavy dependencies.',
  },
  {
    icon: <Terminal className="w-6 h-6 text-primary" />,
    title: 'Headless Integrations',
    desc: 'Trigger the Swarm automatically from Linear ticket transitions, GitHub comments, or natively via our Node/Python SDK.',
  },
];

export default function FeaturesGrid({ theme }: { theme?: 'cream' }) {
  return (
    <section id="features" className={`features-section ${theme === 'cream' ? 'theme-cream' : ''}`}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Why Kiwi</span>
          <h2 className="section-title">Everything you need to actually trust an agent</h2>
          <p className="section-subtitle">
            Reviewed changes, secrets that stay home, contained runs, and nothing lost.
          </p>
        </Reveal>

        <Reveal as="div" className="features-grid" stagger>
          {features.map((f, i) => (
            <RevealItem key={i} className="feature-card backdrop-blur-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="card-glow"></div>
              <span className="feature-index">{String(i + 1).padStart(2, '0')}</span>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
