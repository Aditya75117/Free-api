import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { PageBreadcrumbJsonLd } from "@/components/seo/page-breadcrumb-json-ld";
import { buttonVariants } from "@/components/ui/button";
import type { SeoHubContent } from "@/constants/seo-hubs";
import { cn } from "@/lib/utils";

type SeoHubPageProps = {
  content: SeoHubContent;
  crumbLabel: string;
};

export function SeoHubPage({ content, crumbLabel }: SeoHubPageProps) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: crumbLabel },
  ];

  return (
    <>
      <PageBreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd faqs={content.faqs} />
      <PageSection>
        <Breadcrumbs items={crumbs} className="mb-6" />
        <PageHeader title={content.title} description={content.intro} />
        <article className="space-y-8">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
              {section.body.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-2 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-bold tracking-tight">{content.codeTitle}</h2>
            <div className="mt-4">
              <CodeBlock code={content.code} />
            </div>
          </section>

          <section aria-labelledby="hub-faq-heading">
            <h2 id="hub-faq-heading" className="text-2xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-4">
              {content.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link href="/playground" className={cn(buttonVariants({ size: "lg" }))}>
              Open Playground
            </Link>
            <Link
              href="/examples"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Browse examples
            </Link>
            <Link href="/docs" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Read the docs
            </Link>
          </div>
        </article>
      </PageSection>
    </>
  );
}
