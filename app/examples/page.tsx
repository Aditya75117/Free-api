import type { Metadata } from "next";

import { ExamplesGrid } from "@/components/examples-grid";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { EXAMPLES_HUB_INTRO } from "@/constants/page-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.examples);

export default function ExamplesPage() {
  return (
    <>
      <PageSection>
        <PageHeader
          title="Mock API Examples"
          description="Browse common endpoint patterns and try them in the playground."
          className="mb-0"
        />
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{EXAMPLES_HUB_INTRO}</p>
      </PageSection>
      <ExamplesGrid />
    </>
  );
}
