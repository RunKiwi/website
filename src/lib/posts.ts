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
