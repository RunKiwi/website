import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// One entry, because the site is currently one route. That is the honest state
// of things: a single-page site gives crawlers one URL to index and gives other
// people one URL to link to. Add entries here as real pages land.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
