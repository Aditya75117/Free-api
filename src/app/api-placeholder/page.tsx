import type { Metadata } from "next";

import { SeoHubPage } from "@/components/seo/seo-hub-page";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { API_PLACEHOLDER_HUB } from "@/constants/seo-hubs";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.apiPlaceholder);

export default function ApiPlaceholderPage() {
  return <SeoHubPage content={API_PLACEHOLDER_HUB} crumbLabel="API Placeholder" />;
}
