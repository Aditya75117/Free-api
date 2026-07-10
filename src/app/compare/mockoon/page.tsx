import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageBreadcrumbJsonLd } from "@/components/seo/page-breadcrumb-json-ld";
import { buttonVariants } from "@/components/ui/button";
import { MOCKOON_COMPARE } from "@/constants/page-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.compareMockoon);

export default function MockoonComparePage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare/mockoon" },
    { label: "Mockoon" },
  ];

  return (
    <>
      <PageBreadcrumbJsonLd items={crumbs} />
      <PageSection>
        <Breadcrumbs items={crumbs} className="mb-6" />
        <PageHeader title={MOCKOON_COMPARE.title} description={MOCKOON_COMPARE.intro} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 pr-4 font-medium">Feature</th>
                <th className="pb-3 pr-4 font-medium">Mockoon</th>
                <th className="pb-3 font-medium">ApiGenerator</th>
              </tr>
            </thead>
            <tbody>
              {MOCKOON_COMPARE.features.map((row) => (
                <tr key={row.feature} className="border-b border-border/50">
                  <td className="py-3 pr-4 text-muted-foreground">{row.feature}</td>
                  <td className="py-3 pr-4">{row.mockoon ? "✓" : "—"}</td>
                  <td className="py-3">{row.apigenerator ? "✓" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection>
        <article className="space-y-8">
          <section aria-labelledby="mockoon-faq-heading">
            <h2 id="mockoon-faq-heading" className="text-2xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-6">
              {MOCKOON_COMPARE.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link href="/playground" className={cn(buttonVariants({ size: "lg" }))}>
              Try ApiGenerator free
            </Link>
            <Link
              href="/compare/jsonplaceholder"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              vs JSONPlaceholder
            </Link>
          </div>
        </article>
      </PageSection>
    </>
  );
}
