import type { Metadata } from "next";

import { ExamplesGrid } from "@/components/examples-grid";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";

export const metadata: Metadata = {
  title: "Examples",
  description: "Common mock API endpoint examples for users, posts, products, and more.",
};

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
