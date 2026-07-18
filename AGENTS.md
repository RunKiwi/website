<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# This repo: the runkiwi.dev marketing site

Public marketing site for **Kiwi** — the planner and the swarm for shipping teams. The engineering
product lives in the separate `kiwi` repo; this repo is website-only. See `README.md` for structure.

## Messaging is load-bearing — get the claims right

The copy tracks the product RFCs (in the `kiwi` repo). If you touch product-facing claims, keep them
true to the current strategy:

- **Managed-first.** Managed (zero-setup, `npm i kiwi && kiwi submit`) is the default entry path;
  **BYOC is the graduation tier**. Lead with managed in hero/quickstart/CTAs.
- **The moat is the planner + swarm** (issue → worker DAG → one branch → **one verified PR**), not
  BYOC and not the sandbox.
- **"Zero-knowledge" is BYOC-only.** Never state it as a blanket promise — in managed mode Kiwi holds
  the key and can read credentials. This is a claim that must not drift.
- **Real security model:** X25519-sealed credentials, a credential-injecting proxy (sandbox never
  holds a raw key), default-deny egress allowlists. Do **not** write `--network=none`, "reverse
  tunnel", or "AES-256-GCM" — those are stale/incorrect.
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
