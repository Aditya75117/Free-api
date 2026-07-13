import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { PageBreadcrumbJsonLd } from "@/components/seo/page-breadcrumb-json-ld";
import { buttonVariants } from "@/components/ui/button";
import { TESTING_USE_CASE } from "@/constants/page-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.useCaseTesting);

export default function TestingMockApiPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Use Cases", href: "/use-cases/testing-with-mock-api" },
    { label: "Testing" },
  ];

  return (
    <>
      <PageBreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd faqs={TESTING_USE_CASE.faqs} />
      <PageSection>
        <Breadcrumbs items={crumbs} className="mb-6" />
        <PageHeader title={TESTING_USE_CASE.title} description={TESTING_USE_CASE.intro} />
        <p className="text-muted-foreground leading-relaxed">
          Pair seeded endpoints with the{" "}
          <Link href="/docs" className="text-primary hover:underline">
            API documentation
          </Link>{" "}
          or try requests in the{" "}
          <Link href="/playground" className="text-primary hover:underline">
            playground
          </Link>
          .
        </p>
      </PageSection>

      <PageSection>
        <article className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Unit tests with seeded data</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use the seed parameter so assertions stay stable across CI runs.
            </p>
            <div className="mt-4">
              <CodeBlock code={TESTING_USE_CASE.fetchExample} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight">E2E with Playwright</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fulfill routes with ApiGenerator JSON or call the mock API directly from the browser.
            </p>
            <div className="mt-4">
              <CodeBlock code={TESTING_USE_CASE.e2eExample} />
            </div>
          </section>

          <section aria-labelledby="testing-faq-heading">
            <h2 id="testing-faq-heading" className="text-2xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-4">
              {TESTING_USE_CASE.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <Link href="/playground" className={cn(buttonVariants({ size: "lg" }))}>
            Open Playground
          </Link>
        </article>
      </PageSection>
    </>
  );
}
