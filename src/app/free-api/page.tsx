import type { Metadata } from "next";

import { SeoHubPage } from "@/components/seo/seo-hub-page";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { FREE_API_HUB } from "@/constants/seo-hubs";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.freeApi);

export default function FreeApiPage() {
  return <SeoHubPage content={FREE_API_HUB} crumbLabel="Free API" />;
}
