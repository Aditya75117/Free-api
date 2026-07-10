import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { TERMS_CONTENT } from "@/constants/page-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.terms);

export default function TermsPage() {
  return (
    <PageSection>
      <PageHeader
        title={TERMS_CONTENT.title}
        description={`Last updated: ${TERMS_CONTENT.lastUpdated}`}
      />
      <article className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        {TERMS_CONTENT.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold tracking-tight">{section.heading}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{section.body}</p>
          </section>
        ))}
      </article>
    </PageSection>
  );
}
