import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Without this file the site serves no robots.txt at all, which leaves crawler
// behaviour to defaults and gives them no pointer to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
