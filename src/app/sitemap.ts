import type { MetadataRoute } from "next";

import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "@/constants/endpoints";
import { SITE_URL } from "@/constants/site";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/docs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/examples`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/playground`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/compare/jsonplaceholder`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_URL}/compare/mockoon`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/use-cases/react-mock-api`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const exampleRoutes: MetadataRoute.Sitemap = [...POPULAR_ENDPOINTS, ...AI_ENDPOINTS].map(
    (endpoint) => ({
      url: `${SITE_URL}/examples/${endpoint.keyword}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  return [...STATIC_ROUTES, ...exampleRoutes];
}
