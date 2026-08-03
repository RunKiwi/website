import { Reveal, RevealItem } from './Reveal';
import { ShieldCheck, FileCheck, Target, PackageSearch, Workflow } from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: React.ReactNode;
  desc: React.ReactNode;
  // The lead card spans two columns, so five cards fill a three-column grid
  // as 2 + 3 rather than leaving a gap.
  lead?: boolean;
};

const features: Feature[] = [
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    lead: true,
    title: (
      <>
        Does what you asked
        <span className="feature-tag">The whole point</span>
      </>
    ),
    desc: 'Your description is the objective. Your test command is a guard proving the change broke nothing. Keeping those apart is what makes \u201Cadd an example to the docs\u201D as ordinary a job here as a bug fix. A run that changes no code gets reported as a failure, and while your suite is red Kiwi will not touch the failing test. That is how a fix gets faked.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: (
      <>
        Two-phase sandbox
        <span className="feature-tag">Containment</span>
      </>
    ),
    desc: 'Dependencies install in a networked phase we hand an empty environment. No git token, no registry credential. A hostile postinstall hook gets the network and nothing worth sending. Then we cut the network and run your test command over the model\u2019s code offline. Model-generated code never reaches the network, and the phase that does never holds a secret.',
  },
  {
    icon: <FileCheck className="w-6 h-6 text-primary" />,
    title: (
      <>
        Every step on the record
        <span className="feature-tag">Evidence</span>
      </>
    ),
    desc: 'Every iteration writes an event: which model proposed the edit, whether the Critic approved it and why, whether your tests passed, plus tokens, cost and duration. Kiwi hash-chains those into a per-job execution record, so you can check a run instead of trusting it. When a job took three attempts, you see the two that got turned down.',
  },
  {
    icon: <Workflow className="w-6 h-6 text-primary" />,
    title: (
      <>
        Two loops, one boundary
        <span className="feature-tag">Pick per task</span>
      </>
    ),
    desc: 'File Loop handles bounded edits: an Actor proposes a patch, a Critic reviews it before anything touches disk. Session Mode handles open-ended work, where nobody knows up front which files need touching. There an Architect sets each round\u2019s objective and reviews the diff, while an Implementer works the repository with real tools.',
  },
  {
    icon: <PackageSearch className="w-6 h-6 text-primary" />,
    title: (
      <>
        Bring a prompt and a repo
        <span className="feature-tag">Zero setup</span>
      </>
    ),
    desc: 'You pick no image, configure no test command, write no file list. Kiwi reads what your repository already declares (a devcontainer, go.mod, .nvmrc, .python-version), picks the runtime, and infers the test command. Guess the runtime wrong and it corrects itself before the Actor sees the error.',
  },
];

export default function FeaturesGrid({ theme }: { theme?: 'cream' }) {
  return (
    <section id="features" className={`features-section ${theme === 'cream' ? 'theme-cream' : ''}`}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">What you get</span>
          <h2 className="section-title">Evidence you can take to a security review</h2>
          <p className="section-subtitle">
            Any model can generate a diff. Deciding it is safe to merge means knowing where it ran, what it could reach, and who approved it. Kiwi runs the work inside a boundary you define and hands you the record.
          </p>
        </Reveal>

        <Reveal as="div" className="features-grid" stagger>
          {features.map((f, i) => (
            <RevealItem key={i} className={`feature-card backdrop-blur-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 ${f.lead ? 'feature-card-lead' : ''}`}>
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
