## Summary
This PR implements the comprehensive visual and content redesign of the Kiwi marketing site as per the `2026-08-19-website-redesign-design.md` spec.

- **Theme Rhythm:** Swapped the site's default theme to a light/cream palette (`.theme-cream` tokens are now the default `:root` tokens), reserving the dark navy palette (`.theme-dark`) exclusively for the new `Activity` section.
- **TopologyCanvas Removed:** Deleted `TopologyCanvas.tsx` and the `dashboard` folder (which contained `TopologyGraph.tsx` and its nodes), replacing it with the new `Activity` component.
- **Activity Component:** A new looping, spring-animated Framer Motion sequence that visualizes the post-merge verification flow (merge -> 24h watch window -> checking signals -> verdict). 
- **Content Updates:**
  - `Hero`: Updated the headline and badge to focus on post-merge tracking.
  - `GodView`: Expanded the simulated lifecycle to include PR open, review comment resume, merge, and post-merge watch.
  - `FeaturesGrid`: Updated the "Stays on the job" card to mention post-merge and adapted the design to the light theme.
- **Coming Soon Section:** Added a new roadmap teaser section highlighting Any-PR monitoring, Verdict record on the PR, and the Hardware-isolated execution tier.
- **Blog Cleanup:** Retired and deleted the stale `why-agent-work-is-a-dag.mdx` blog post since the DAG architecture was retired.

## Test plan
- [x] Ran `npm run dev` and visually verified all sections, including the new `Activity` Framer Motion looping animation.
- [x] Ran `npx tsc --noEmit` and confirmed there are no type errors.
- [x] Ran `npm run lint` and confirmed the build is clean of ESLint errors.
- [x] Verified all capability claims (post-merge verification window = 24h, model providers = Anthropic, Gemini, OpenAI, billing = contact flow) against the actual `kiwi` repo's `CLAUDE.md` and `postmerge_finalize.go`.

## Judgment calls
1. **Activity Section Theme:** Kept the `Activity` section as the sole `.theme-dark` (navy background) section on the page. This creates a striking contrast for the complex animation and emphasizes the "guarding/monitoring" mood of the post-merge watch capability.
2. **Coming Soon Placement:** Placed the new `ComingSoon` section immediately after `Activity` and before `TierLadder`, providing a clean narrative flow: "Here's what it does -> Here's what's next -> Here's what it costs".
3. **Coming Soon Iconography:** Used `GitPullRequest` from `lucide-react` instead of `Github` since it better represents PR monitoring and is more standard for the package's exports.
4. **FeaturesGrid Title:** Adjusted the title of the 5th card to "Stays on the job" (from "Stays in the review") to better encompass both review resumption and the 24-hour post-merge watch.
