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

- **Lead with containment and evidence**, not throughput. The two claims that carry the page are
  (1) model-generated code runs in a sandbox with default-deny networking and never holds a key, and
  (2) every Actor edit, Critic verdict and test run is recorded per step. Planner + swarm is a
  **capability**, not the headline — that layer is table stakes now (Codex Cloud, Cursor Background
  Agents, Devin, Claude Code Remote Tasks all ship it).
- **Managed is still the entry path.** Zero-setup (`npm i kiwi && kiwi submit`) stays the primary
  CTA; BYOC is where the containment story lands hardest. Both are real; don't bury either.
- **"Zero-knowledge" is BYOC-only.** Never state it as a blanket promise — in managed mode Kiwi holds
  the key and can read credentials. This is a claim that must not drift.
- **Real security model:** X25519-sealed credentials, a credential-injecting proxy (sandbox never
  holds a raw key), default-deny egress allowlists. Do **not** write `--network=none`, "reverse
  tunnel", or "AES-256-GCM" — those are stale/incorrect.
- **Do not claim the signed execution record.** Per-phase telemetry (`TaskEvent`: step, phase,
  outcome, Critic reasons, tokens, cost, duration) **is** shipped and is fair to describe. The
  *signed, hash-chained, exportable* provenance record is designed and not built — no copy may imply
  a downloadable audit artifact, an attestation, or a signature until it ships.
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
