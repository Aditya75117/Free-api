import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageBreadcrumbJsonLd } from "@/components/seo/page-breadcrumb-json-ld";
import { SeoImage } from "@/components/seo/seo-image";
import { buttonVariants } from "@/components/ui/button";
import { JSONPLACEHOLDER_COMPARE } from "@/constants/page-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.compareJsonplaceholder);

export default function JsonPlaceholderComparePage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare/jsonplaceholder" },
    { label: "JSONPlaceholder" },
  ];

  return (
    <>
      <PageBreadcrumbJsonLd items={crumbs} />
      <PageSection>
        <Breadcrumbs items={crumbs} className="mb-6" />
        <PageHeader
          title={JSONPLACEHOLDER_COMPARE.title}
          description={JSONPLACEHOLDER_COMPARE.intro}
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <SeoImage
            src="/images/compare-jsonplaceholder.svg"
            alt="Feature comparison between JSONPlaceholder and ApiGenerator mock APIs"
            width={640}
            height={400}
            className="w-full"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-medium">Feature</th>
                  <th className="pb-3 pr-4 font-medium">JSONPlaceholder</th>
                  <th className="pb-3 font-medium">ApiGenerator</th>
                </tr>
              </thead>
              <tbody>
                {JSONPLACEHOLDER_COMPARE.features.map((row) => (
                  <tr key={row.feature} className="border-b border-border/50">
                    <td className="py-3 pr-4 text-muted-foreground">{row.feature}</td>
                    <td className="py-3 pr-4">{row.jsonplaceholder ? "✓" : "—"}</td>
                    <td className="py-3">{row.apigenerator ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            {JSONPLACEHOLDER_COMPARE.migrationTitle}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Swap your JSONPlaceholder base URL for ApiGenerator and gain query parameters, field
            filtering, and custom keywords.
          </p>
          <div className="mt-4">
            <CodeBlock code={JSONPLACEHOLDER_COMPARE.migrationCode} />
          </div>
        </section>
      </PageSection>

      <PageSection bordered={false}>
        <section aria-labelledby="compare-faq-heading">
          <h2 id="compare-faq-heading" className="text-2xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-6">
            {JSONPLACEHOLDER_COMPARE.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-medium">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/playground" className={cn(buttonVariants({ size: "lg" }))}>
            Try ApiGenerator free
          </Link>
          <Link href="/docs" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Read the docs
          </Link>
        </div>
      </PageSection>
    </>
  );
}
