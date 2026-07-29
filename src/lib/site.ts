// Canonical origin for the marketing site. Every absolute URL the site emits —
// canonical tag, OG image, sitemap, JSON-LD — resolves from here, so there is
// one place to change if the domain ever moves.
export const SITE_URL = "https://runkiwi.dev";

// Subdomains are separate origins to a crawler but roll up to the same root
// domain for link-authority purposes, so they are worth naming explicitly.
export const APP_URL = "https://app.runkiwi.dev";
export const DOCS_URL = "https://docs.runkiwi.dev";
export const REPO_URL = "https://github.com/RunKiwi/kiwi";
