import { Reveal, RevealItem } from './Reveal';
import { GitBranch, Network, GitPullRequest, RefreshCw, ShieldCheck, Terminal } from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: React.ReactNode;
  desc: React.ReactNode;
};

const features: Feature[] = [
  {
    icon: <GitBranch className="w-6 h-6 text-primary" />,
    title: (
      <>
        A planner, not a prompt box
        <span className="feature-tag">The moat</span>
      </>
    ),
    desc: 'A frontier-model planner decomposes one issue into a dependency graph of scoped workers — each with its own files, tools, and passing test command. This is the layer sandbox vendors hand back to you.',
  },
  {
    icon: <Network className="w-6 h-6 text-primary" />,
    title: 'A swarm that runs in parallel',
    desc: 'The scheduler releases each worker the moment its dependencies go green, fanning out across dozens of isolated sandboxes at once. The ceiling is model inference, not machines.',
  },
  {
    icon: <GitPullRequest className="w-6 h-6 text-primary" />,
    title: (
      <>
        One job, one branch, one PR
        <span className="feature-tag">No review pile-up</span>
      </>
    ),
    desc: 'Every worker commits to the same job branch, so 50 agents produce one reviewable PR — not 50 diffs. A terminal verify worker runs the full suite before the PR ever opens.',
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-primary" />,
    title: 'Actor–Critic execution loop',
    desc: 'Inside each sandbox an Actor writes the patch and a Critic reviews it, iterating against your test command until it passes — bounded by per-task step and USD budget caps.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: 'Sealed credentials, default-deny egress',
    desc: 'Credentials are sealed with X25519 and unsealed only in the daemon’s memory. The model runs in the daemon, not the sandbox — only your test command runs sandboxed, with default-deny networking — so model-generated code never sees a key.',
  },
  {
    icon: <Terminal className="w-6 h-6 text-primary" />,
    title: 'Integrations over dashboards',
    desc: 'Fire the swarm from the kiwi CLI, the Node/Python SDK in CI, a labeled Linear ticket, or kiwi claude — a wrapper that offloads work straight from your terminal agent.',
  },
];

export default function FeaturesGrid({ theme }: { theme?: 'cream' }) {
  return (
    <section id="features" className={`features-section ${theme === 'cream' ? 'theme-cream' : ''}`}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Why Kiwi</span>
          <h2 className="section-title">The layer above the sandbox</h2>
          <p className="section-subtitle">
            Anyone can hand you a container. Kiwi plans the work, runs the swarm, composes the result, and keeps the whole thing verified and contained.
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
