import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageBreadcrumbJsonLd } from "@/components/seo/page-breadcrumb-json-ld";
import { SeoImage } from "@/components/seo/seo-image";
import { buttonVariants } from "@/components/ui/button";
import { REACT_USE_CASE } from "@/constants/page-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.useCaseReact);

export default function ReactMockApiPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Use Cases", href: "/use-cases/react-mock-api" },
    { label: "React" },
  ];

  return (
    <>
      <PageBreadcrumbJsonLd items={crumbs} />
      <PageSection>
        <Breadcrumbs items={crumbs} className="mb-6" />
        <PageHeader title={REACT_USE_CASE.title} description={REACT_USE_CASE.intro} />
        <div className="grid gap-8 lg:grid-cols-2">
          <SeoImage
            src="/images/use-case-react.svg"
            alt="React component fetching data from a mock REST API endpoint"
            width={640}
            height={400}
            className="w-full"
          />
          <p className="text-muted-foreground leading-relaxed">
            ApiGenerator endpoints are standard REST URLs — use them with any HTTP client. Start
            with the{" "}
            <Link href="/examples/users" className="text-primary hover:underline">
              mock users API
            </Link>{" "}
            or browse all{" "}
            <Link href="/examples" className="text-primary hover:underline">
              example endpoints
            </Link>
            .
          </p>
        </div>
      </PageSection>

      <PageSection>
        <article className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Fetch with useEffect</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The simplest pattern for React prototypes — fetch on mount and store in state.
            </p>
            <div className="mt-4">
              <CodeBlock code={REACT_USE_CASE.fetchExample} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight">React Query</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use ApiGenerator URLs as queryFn targets for caching and loading states.
            </p>
            <div className="mt-4">
              <CodeBlock code={REACT_USE_CASE.queryExample} />
            </div>
          </section>

          <section aria-labelledby="react-faq-heading">
            <h2 id="react-faq-heading" className="text-2xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-6">
              {REACT_USE_CASE.faqs.map((faq) => (
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
