import type { Metadata } from "next";

import { SeoHubPage } from "@/components/seo/seo-hub-page";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { FAKE_JSON_API_HUB } from "@/constants/seo-hubs";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.fakeJsonApi);

export default function FakeJsonApiPage() {
  return <SeoHubPage content={FAKE_JSON_API_HUB} crumbLabel="Fake JSON API" />;
}
