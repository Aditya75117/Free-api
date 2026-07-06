import type { MetadataRoute } from "next";

import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "@/constants/endpoints";
import { SITE_URL } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/docs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/examples`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/playground`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/groups`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const exampleRoutes: MetadataRoute.Sitemap = [...POPULAR_ENDPOINTS, ...AI_ENDPOINTS].map(
    (endpoint) => ({
      url: `${SITE_URL}/examples/${endpoint.keyword}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  return [...staticRoutes, ...exampleRoutes];
}
