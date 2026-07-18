# runkiwi.dev — marketing website

The marketing site for **Kiwi**: the planner and the swarm for shipping teams. Describe a
task, and Kiwi decomposes it into a worker DAG, runs a swarm of agents in parallel on a single
branch, and opens one verified PR — on our managed cloud, or in your own VPC.

Built with **Next.js 16 (App Router, Turbopack)**, React 19, and Tailwind v4. The engineering
product itself lives in the [`kiwi`](https://github.com/RunKiwi/kiwi) repo; this repo is only the
public site.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm run start` (serve the build),
`npm run lint`.

## Positioning (source of truth for copy)

The site's messaging tracks the product RFCs in the `kiwi` repo — most importantly the
**Managed Execution Tier RFC**, which sets the current strategy:

- **Managed is the default entry path** (`npm i kiwi && kiwi submit "…"`, zero setup); **BYOC is
  the graduation tier** for compliance and cost. The hero, quickstart, and CTAs lead with managed.
- **The differentiator is the planner + the swarm** — decomposing an issue into a worker DAG and
  composing the result into **one branch / one PR** — not BYOC and not the sandbox (BYOC is table
  stakes in this category).
- **"Zero-knowledge" is a BYOC-only claim.** In managed mode Kiwi operates the machine that holds
  the key and can read credentials. Never present zero-knowledge as a blanket promise.
- Security copy reflects the real model: **X25519-sealed credentials**, a **credential-injecting
  proxy** (the sandbox never holds a raw key), and **default-deny egress allowlists** — not
  `--network=none`, reverse tunnels, or AES-256-GCM.

If you change product-facing claims, check them against the RFCs before shipping.

## Structure

```
src/
  app/
    layout.tsx        # fonts (Fraunces/Outfit/Inter/Fira Code), metadata, film-grain overlay
    page.tsx          # section order for the homepage
    globals.css       # the entire design system + component styles (no CSS modules)
  components/
    Header.tsx        # sticky nav + "Start free" CTA
    Hero.tsx          # headline + install command
    HeroDemo.tsx      # self-playing "live run" of a swarm (mirrors the How-it-works narrative)
    ValueBanner.tsx   # one-line positioning + trust strip
    Marquee.tsx       # honest stack/integration strip (only tools we actually use)
    GodView.tsx       # "How it works" — the DAG → swarm → one-branch → one-PR console
    FeaturesGrid.tsx  # six differentiation-led feature cards
    TierLadder.tsx    # Managed → BYOC comparison (the honest ladder)
    TopologyCanvas.tsx# control-plane/data-plane pull-model DAG canvas (@xyflow/react)
    Quickstart.tsx    # Managed-first / BYOC tabs + accurate security panel
    Footer.tsx
    Reveal.tsx        # the single reveal-on-scroll animation vocabulary (framer-motion)
```

### Design system notes

- All styling lives in `src/app/globals.css` as plain CSS driven by CSS custom properties — there
  are **no CSS modules** and only utility-level Tailwind. Reuse the existing tokens
  (`--primary`, `--secondary`, `--bg-*`, `--text-*`, `--font-display`, etc.).
- The page alternates a **warm dark** default theme with **cream** sections (`.theme-cream` on a
  `<section>` re-tunes the tokens for AA contrast on light). Keep the dark/cream rhythm in mind
  when reordering sections in `page.tsx`.
- Wrap animated-in blocks in `<Reveal>` / `<RevealItem>`; it honors `prefers-reduced-motion`.
- Kiwi green (`--primary`) is the accent; amber/terracotta (`--secondary`) is the only secondary.
  No cool slate, no cyberpunk cyan.

## Deployment

Deployed on Vercel (`vercel.json`, `@vercel/analytics`).
