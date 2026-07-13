import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { PageBreadcrumbJsonLd } from "@/components/seo/page-breadcrumb-json-ld";
import { buttonVariants } from "@/components/ui/button";
import { VUE_USE_CASE } from "@/constants/page-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.useCaseVue);

export default function VueMockApiPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Use Cases", href: "/use-cases/vue-mock-api" },
    { label: "Vue" },
  ];

  return (
    <>
      <PageBreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd faqs={VUE_USE_CASE.faqs} />
      <PageSection>
        <Breadcrumbs items={crumbs} className="mb-6" />
        <PageHeader title={VUE_USE_CASE.title} description={VUE_USE_CASE.intro} />
        <p className="text-muted-foreground leading-relaxed">
          Start with the{" "}
          <Link href="/examples/products" className="text-primary hover:underline">
            mock products API
          </Link>{" "}
          or browse all{" "}
          <Link href="/examples" className="text-primary hover:underline">
            example endpoints
          </Link>
          .
        </p>
      </PageSection>

      <PageSection>
        <article className="min-w-0 max-w-full space-y-8">
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Composable with onMounted</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fetch mock JSON on mount and store it in a ref.
            </p>
            <div className="mt-4">
              <CodeBlock code={VUE_USE_CASE.fetchExample} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight">VueUse useFetch</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Point VueUse at any ApiGenerator URL for reactive loading states.
            </p>
            <div className="mt-4">
              <CodeBlock code={VUE_USE_CASE.composableExample} />
            </div>
          </section>

          <section aria-labelledby="vue-faq-heading">
            <h2 id="vue-faq-heading" className="text-2xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-4">
              {VUE_USE_CASE.faqs.map((faq) => (
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
