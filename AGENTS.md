<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# This repo: the runkiwi.dev marketing site

Public marketing site for **Kiwi** — coding agents that run inside infrastructure you control. The
engineering product lives in the separate `kiwi` repo; this repo is website-only. See `README.md`
for structure.

## Messaging is load-bearing — get the claims right

If you touch product-facing claims, keep them true to the current framing:

- **Kiwi is an agent that does what you ask** — it is *not* "an agent that makes a failing check
  pass". The task description is the objective; the test command is a **guard** proving the change
  broke nothing. Additive work ("add an example to the docs") is an ordinary job. Never write
  hero/demo/feature copy framed as fixing a failing test, chasing a green build, or "one issue in" —
  that positioning shrinks a general coding agent into a niche CI-fixer. Corollaries that are also
  true: a run that changes nothing is a **failure**, and while the suite is red the loop refuses to
  edit the failing test. **This rule is about Kiwi's own definition of done, not about naming the
  industry's review-cost problem** — leading with "two of three agent PRs never merge" or "agents
  ghost review comments" is fine and encouraged, those are sourced numbers about the category, not a
  claim that Kiwi's job is turning checks green.
- **Lead with review cost, not containment.** Containment (BYOC, sealed credentials, the two-phase
  sandbox) is now free from at least three competitors — Coder Agents, OpenHands, and Anthropic's own
  self-hosted Gateway — so it answers a security review once, it doesn't win one anymore. The claim
  that carries the page: most agents finish, discard their context, and have no idea the conversation
  continued after the PR opens. Kiwi keeps the session — a review comment resumes the next round with
  everything the Architect and Implementer knew when they wrote the code, not a re-run from zero
  (shipped, kiwi#343). Containment stays on the page as the qualifier that answers the CISO, not the
  reason anyone adopts first.
- **Don't market the Merge Dossier until it renders on the PR.** Kiwi already persists per-round
  Architect verdicts and hash-chains them (`pkg/ver`) — real, and safe to describe, but it lives in
  the dashboard today. Not real yet: that record rendered onto the pull request itself, per-hunk
  confidence (verdicts are per round, not per hunk), and an explicit statement of what the test didn't
  cover. Don't write copy implying a reviewer sees any of those three in GitHub today — say where the
  record lives now, and that it's moving onto the PR next.
- **"Actor" and "Critic" are retired terms.** They named `pkg/loop`'s File Loop, deleted 2026-08-12 —
  session (`pkg/session`: an Architect sets each round's objective and reviews the diff, an
  Implementer edits with real tools) is the only execution loop now. There's no more "pick a loop per
  task," and no more planner-level decomposition of a task into a worker DAG — don't describe or draw
  a swarm/DAG of parallel workers fanned out on a single task; there isn't one.
- **The sandbox is two-phase, and the precise claim is the strong one.** Phase A installs
  dependencies with the network **on** and an **empty environment** — no git token, no registry
  credential. Phase B verifies with the network **off**, running model-generated code. State it as:
  *model-generated code never has network access, and the phase that does never holds a secret.*
  Don't flatten this back to "the sandbox has no network" — that is weaker and now inaccurate.
- **Zero setup is real and worth claiming.** The runtime image, the test command and the target files
  are all inferred from the repo (devcontainer, `go.mod`, `.nvmrc`, `engines.node`,
  `.python-version`), and the daemon self-corrects when it guesses wrong. The user passes a prompt
  and a repo — nothing else. There is no `-image` flag to mention, because asking the user is
  explicitly not an acceptable answer in the product.
- **Managed is still the entry path.** Zero-setup (`npm i kiwi && kiwi submit`) stays the primary
  CTA; BYOC is where the containment story lands hardest. Both are real; don't bury either.
- **"Zero-knowledge" is BYOC-only.** Never state it as a blanket promise — in managed mode Kiwi holds
  the key and can read credentials. This is a claim that must not drift.
- **Real security model:** X25519-sealed credentials, a credential-injecting proxy (sandbox never
  holds a raw key), default-deny egress allowlists. Do **not** write `--network=none`, "reverse
  tunnel", or "AES-256-GCM" — those are stale/incorrect.
- **The execution record has now shipped** (`pkg/ver`) — this bullet used to forbid mentioning it.
  Per-job records are assembled from real loop telemetry, hash-chained per org, and surfaced in the
  dashboard with their hash and attestation state; a JWK set is published so a record can be checked
  offline. **But signing is conditional on a configured key** — absent one the record is persisted
  `unsigned`, and the UI says so. So describe the record and its hash freely; do **not** promise that
  every run arrives signed, and still don't imply a compliance artifact.
- **Stripe checkout is NOT live.** `pkg/billing` and a webhook handler exist, but no Stripe env vars
  are set in production, so Pro is an **email/contact flow** — the product's own upgrade button is a
  `mailto:`. No copy or CTA may imply a user can buy Pro with a card. The current Pro price is
  **$18/user/mo + $10 per 250 extra agent-minutes**, matching `frontend/src/lib/plans.ts`; a stale
  **$39** was deliberately removed and must not come back.
- **Never claim regulatory compliance.** Not "EU AI Act compliant", not "SOC 2 compliant". We produce
  evidence; the customer's own compliance owner draws the conclusion. Phrase as what Kiwi *records*,
  never as what it certifies.
- **Three model providers, always named together: Anthropic, OpenAI, Gemini.** They are equally
  first-class, and Kiwi is **BYOK** in every tier — the key is the customer's own, never resold and
  never ours. If copy names one or two, it is out of date. **"Codex" is not a provider**: it was a
  dashboard placeholder that nothing implemented and it has been retired — write **OpenAI**. (Codex
  Cloud, the competing product named above, is a different thing and fine to cite as a competitor.)
- The `Marquee` lists only tools Kiwi actually uses/integrates. Don't add customer or partner logos
  we can't stand behind.

## Conventions

- **Styling:** everything is in `src/app/globals.css` as plain CSS + CSS custom properties. No CSS
  modules. Reuse existing tokens (`--primary`, `--secondary`, `--bg-*`, `--text-*`, `--font-*`).
- **Theme rhythm:** the page alternates warm-dark and `.theme-cream` sections; preserve that when
  editing `page.tsx`.
- **Animation:** wrap reveal-on-scroll blocks in `<Reveal>` / `<RevealItem>` (honors reduced motion).
- **Verify before finishing:** `npm run dev` and load `http://localhost:3000`; run `npx tsc --noEmit`
  for type checks. Note `next.config.ts` sets `typescript.ignoreBuildErrors` — so the production build
  will **not** catch type errors for you; check them explicitly.
