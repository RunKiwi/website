import { Reveal, RevealItem } from './Reveal';
import { GitBranch, Server, GitPullRequest, RefreshCw, ShieldCheck, FileCheck, Terminal, Sparkles, Cpu, Target, PackageSearch, Activity, Workflow } from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: React.ReactNode;
  desc: React.ReactNode;
};

const features: Feature[] = [
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: (
      <>
        Does what you asked
        <span className="feature-tag">The whole point</span>
      </>
    ),
    desc: 'Your description is the objective. Your test command is a guard proving the change broke nothing. Keeping those apart is what makes “add an example to the docs” as ordinary a job here as a bug fix. A run that changes no code gets reported as a failure, and while your suite is red Kiwi will not touch the failing test. That is how a fix gets faked.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: (
      <>
        Two-phase sandbox
        <span className="feature-tag">Containment</span>
      </>
    ),
    desc: 'Dependencies install in a networked phase we hand an empty environment. No git token, no registry credential. A hostile postinstall hook gets the network and nothing worth sending. Then we cut the network and run your test command over the model’s code offline. Model-generated code never reaches the network, and the phase that does never holds a secret. Your provider key sits with the daemon and enters neither.',
  },
  {
    icon: <FileCheck className="w-6 h-6 text-primary" />,
    title: (
      <>
        Every step on the record
        <span className="feature-tag">Evidence</span>
      </>
    ),
    desc: 'Every iteration writes an event: which model proposed the edit, whether the Critic approved it and why, whether your tests passed, plus tokens, cost and duration. Kiwi assembles those into a per-job execution record and hash-chains it to the previous one, so you can check a run instead of trusting it. When a job took three attempts, you see the two that got turned down.',
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-primary" />,
    title: (
      <>
        File Loop (Actor–Critic)
        <span className="feature-tag">Default</span>
      </>
    ),
    desc: 'For bounded edits. An Actor proposes a patch, a Critic reviews it before anything touches disk, and a rejected edit goes back with the reason attached. Step and dollar caps per task.',
  },
  {
    icon: <Workflow className="w-6 h-6 text-primary" />,
    title: (
      <>
        Agentic Session Mode
        <span className="feature-tag">Tool-calling</span>
      </>
    ),
    desc: 'For open-ended work, where nobody knows up front which files need touching. An Architect sets the objective for each round and reviews the diff at the end of it. An Implementer works the repository with real tools: read, grep, edit, run a shell. Each round starts on a fresh context, so a long session does not pay for its own transcript forty times over.',
  },
  {
    icon: <Server className="w-6 h-6 text-primary" />,
    title: 'Your cloud, or ours',
    desc: 'The same daemon and protocol either way, so moving is a flag rather than a migration. Run it in your own AWS or GCP account and your source and credentials stay inside your VPC, sealed to a key we never hold.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: (
      <>
        Your models, your key
        <span className="feature-tag">BYOK</span>
      </>
    ),
    desc: 'Anthropic, OpenAI and Gemini are all first-class. Connect the key you already pay for and pick a model per job: claude-opus-4-8, gpt-5, gemini-flash-latest. Each routes to your account, sealed like every other credential. The model you pick runs every worker in the plan; the planner does not get to substitute one.',
  },
  {
    icon: <PackageSearch className="w-6 h-6 text-primary" />,
    title: (
      <>
        Bring a prompt and a repo
        <span className="feature-tag">Zero setup</span>
      </>
    ),
    desc: 'You pick no image, configure no test command, write no file list. Kiwi reads what your repository already declares (a devcontainer, go.mod, .nvmrc, engines.node, .python-version), picks the runtime, infers the test command, and checks the planner’s file hints against the real tree. Guess the runtime wrong and it corrects itself and re-runs before the Actor sees the error. When a repo cannot build offline at all, it tells you rather than spending your budget proving it.',
  },
  {
    icon: <GitBranch className="w-6 h-6 text-primary" />,
    title: 'A planner that decomposes',
    desc: 'A frontier model breaks one task into a dependency graph of scoped workers, each with its own files and test command. The scheduler releases a worker the moment its dependencies go green.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: (
      <>
        Plans that learn from past jobs
        <span className="feature-tag">Opt-in</span>
      </>
    ),
    desc: 'Opt in and the planner draws on your org’s earlier jobs when it decomposes a new task. Auto finds the closest past work by semantic search, or you pick the jobs by hand. Scoped to your own org, and read at plan time only.',
  },
  {
    icon: <GitPullRequest className="w-6 h-6 text-primary" />,
    title: (
      <>
        One job, one branch, one PR
        <span className="feature-tag">No review pile-up</span>
      </>
    ),
    desc: 'Every worker commits to the same job branch, so a fan-out of eight agents still lands as one reviewable PR. A final verify worker runs your whole suite before it opens.',
  },
  {
    icon: <Activity className="w-6 h-6 text-primary" />,
    title: 'A live view and a kill switch',
    desc: 'Watch the worker DAG execute, with a timeline of every phase and the Critic’s reasons quoted in full. Stop a run mid-flight, retry it, delete it. The Spend page meters what each job cost you, the planner’s own tokens included.',
  },
  {
    icon: <Terminal className="w-6 h-6 text-primary" />,
    title: 'Submit from where you work',
    desc: 'The kiwi CLI, the Node or Python SDK in CI, a labeled Linear ticket, or kiwi claude, which offloads work straight from your terminal agent.',
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
