import { Reveal, RevealItem } from './Reveal';
import { GitBranch, Server, GitPullRequest, RefreshCw, ShieldCheck, FileCheck, Terminal, Sparkles, Cpu } from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: React.ReactNode;
  desc: React.ReactNode;
};

const features: Feature[] = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: (
      <>
        Sealed credentials, default-deny egress
        <span className="feature-tag">Containment</span>
      </>
    ),
    desc: 'Credentials are sealed with X25519 and unsealed only in the daemon’s memory. The model runs in the daemon, not the sandbox — only your test command runs sandboxed, with default-deny networking — so model-generated code never sees a key.',
  },
  {
    icon: <FileCheck className="w-6 h-6 text-primary" />,
    title: (
      <>
        Every step on the record
        <span className="feature-tag">Evidence</span>
      </>
    ),
    desc: 'Each iteration writes a structured event: which model proposed the edit, whether the Critic approved or rejected it and why, whether the test passed, plus tokens, cost and duration. A run that took three attempts shows you the two that were turned down.',
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-primary" />,
    title: 'Actor–Critic, not autopilot',
    desc: 'An Actor proposes a patch and a Critic reviews it before a single byte is written to disk. Rejected edits never reach your test command — they go back to the Actor with the reason attached. Bounded by per-task step and USD budget caps.',
  },
  {
    icon: <Server className="w-6 h-6 text-primary" />,
    title: 'Your cloud, or ours',
    desc: 'The same daemon and protocol run either way. In BYOC it runs in your own AWS or GCP account, so source and credentials never cross your VPC edge — and the key that opens them is one we never hold.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: (
      <>
        Your models, your key
        <span className="feature-tag">BYOK</span>
      </>
    ),
    desc: 'Anthropic, OpenAI and Gemini are all first-class. Connect the key you already pay for, then pick the model per job — claude-opus-4-8, gpt-5 and gemini-flash-latest each route to your own account, sealed like every other credential. The model you choose is applied to every worker in the plan, not guessed at by the planner.',
  },
  {
    icon: <GitBranch className="w-6 h-6 text-primary" />,
    title: 'A planner, not a prompt box',
    desc: 'A frontier-model planner decomposes one issue into a dependency graph of scoped workers, each with its own files and passing test command. The scheduler releases each worker the moment its dependencies go green.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: (
      <>
        Plans that learn from past jobs
        <span className="feature-tag">Opt-in</span>
      </>
    ),
    desc: 'Opt in and the planner draws on your org’s prior jobs when it decomposes a new task — Auto finds the most relevant past work by semantic search, or pick jobs by hand. Strictly scoped to your own org’s jobs, and used only at plan time.',
  },
  {
    icon: <GitPullRequest className="w-6 h-6 text-primary" />,
    title: (
      <>
        One job, one branch, one PR
        <span className="feature-tag">No review pile-up</span>
      </>
    ),
    desc: 'Every worker commits to the same job branch, so a fan-out produces one reviewable PR — not a diff per agent. A terminal verify worker runs the full suite before the PR ever opens.',
  },
  {
    icon: <Terminal className="w-6 h-6 text-primary" />,
    title: 'Integrations over dashboards',
    desc: 'Submit from the kiwi CLI, the Node/Python SDK in CI, a labeled Linear ticket, or kiwi claude — a wrapper that offloads work straight from your terminal agent.',
  },
];

export default function FeaturesGrid({ theme }: { theme?: 'cream' }) {
  return (
    <section id="features" className={`features-section ${theme === 'cream' ? 'theme-cream' : ''}`}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Why Kiwi</span>
          <h2 className="section-title">Containment and evidence, not just throughput</h2>
          <p className="section-subtitle">
            Generating a diff is the easy part now. The hard part is deciding it&apos;s safe to merge. Kiwi runs the work inside a boundary you define and keeps the record of what produced it, what reviewed it, and what proved it.
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
