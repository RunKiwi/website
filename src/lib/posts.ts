// The single source of truth for what has been published.
//
// Each post lives at src/app/blog/<slug>/page.mdx and sets its own `metadata`
// export for the per-page <title>/description. This registry is what the index
// page, the sitemap and the JSON-LD read, so adding a post means adding the MDX
// file and one entry here — nothing else needs touching.

export type Post = {
  slug: string;
  title: string;
  /** Shown on the index card and used as the meta description. */
  description: string;
  /** ISO date. Drives ordering and the Article schema. */
  date: string;
  /** Rough minutes, for the index card. */
  readingMinutes: number;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "sandbox-ai-generated-code",
    title: "How to sandbox AI-generated code",
    description:
      "A practical threat model for running code a model just wrote: what the sandbox is actually defending against, why egress is the control that matters, and where the common setups leak.",
    date: "2026-07-29",
    readingMinutes: 9,
    tags: ["security", "sandboxing"],
  },
  {
    slug: "coding-agents-without-api-keys",
    title: "Running coding agents without giving them your API keys",
    description:
      "If an agent can read your credentials, so can the code it writes. How to build an execution boundary where the model never holds a secret, using sealed credentials and a narrow trust surface.",
    date: "2026-07-29",
    readingMinutes: 8,
    tags: ["security", "credentials"],
  },
  {
    slug: "why-agent-work-is-a-dag",
    title: "Why agent work belongs in a DAG, not a loop",
    description:
      "Agent frameworks converged on graphs for a reason. What a DAG buys you over a linear script — parallelism, ordering guarantees, and correct partial failure — and what it costs.",
    date: "2026-07-29",
    readingMinutes: 10,
    tags: ["architecture", "orchestration"],
  },
  {
    slug: "tests-are-a-guard-not-the-goal",
    title: "Your tests are a guard, not the goal",
    description:
      "We shipped an agent that reported success in four seconds without calling the model once. What went wrong was the definition of done: a green suite is a constraint on the answer, not a description of it.",
    date: "2026-08-04",
    readingMinutes: 5,
    tags: ["agents", "design"],
  },
  {
    slug: "killed-our-own-agents",
    title: "We killed our own agents with docker rm -f",
    description:
      "A two-minute task kept taking twelve. The container was named after the org and removed as though it belonged to the task, and the lease TTL that recovered it was also the only thing detecting the failure.",
    date: "2026-08-04",
    readingMinutes: 6,
    tags: ["distributed-systems", "postmortem"],
  },
  {
    slug: "when-failing-safe-fails-you",
    title: "When failing safe fails you",
    description:
      "A reviewer returned a list where we expected a string. Every fallback did the safe thing, the rails counted them as real rejections, and the user got a Go type error instead of a code review.",
    date: "2026-08-04",
    readingMinutes: 5,
    tags: ["reliability", "postmortem"],
  },
  {
    slug: "best-effort-telemetry",
    title: "Best-effort telemetry that was never any effort at all",
    description:
      "A stale foreign key meant every telemetry write failed, for as long as the feature had existed. The writes were best-effort by design, so nothing complained, and we signed records attesting to nothing.",
    date: "2026-08-04",
    readingMinutes: 5,
    tags: ["observability", "postmortem"],
  },
  {
    slug: "the-planner-has-never-seen-your-repo",
    title: "The planner has never seen your repo",
    description:
      "Our planner assigned a Rust filename in a Go repository, and the worker spent its whole budget on a position it could not win. Treating a plan as hints rather than instructions, and detecting unwinnable runs before paying for them.",
    date: "2026-08-04",
    readingMinutes: 5,
    tags: ["agents", "architecture"],
  },
];

/** Newest first. */
export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
