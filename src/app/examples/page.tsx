import type { Metadata } from "next";

import { ExamplesGrid } from "@/components/examples-grid";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Examples",
  description:
    "Mock API examples for users, posts, products, and more. Browse fake REST API endpoint patterns and try them in the ApiGenerator playground.",
  path: "/examples",
  keywords: ["mock api examples", "fake users api", "json placeholder alternative"],
});

export default function ExamplesPage() {
  return (
    <>
      <PageSection>
        <PageHeader
          title="Examples"
          description="Browse common endpoint patterns and try them in the playground."
          className="mb-0"
        />
      </PageSection>
      <ExamplesGrid />
    </>
  );
}
