import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageBreadcrumbJsonLd } from "@/components/seo/page-breadcrumb-json-ld";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from "@/constants/api";
import {
  getAllEndpointSlugs,
  getEndpointLanding,
  getRelatedEndpoints,
} from "@/constants/endpoint-landing";
import { buildPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllEndpointSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = getEndpointLanding(slug);
  if (!landing) return {};

  return buildPageMetadata({
    title: landing.metaTitle,
    description: landing.metaDescription,
    path: `/examples/${slug}`,
    keywords: [
      `mock ${landing.keyword} api`,
      `fake ${landing.label.toLowerCase()} data`,
      "mock api",
      "fake data api",
    ],
  });
}

export default async function ExampleLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const landing = getEndpointLanding(slug);
  if (!landing) notFound();

  const exampleUrl = `${API_BASE_URL}/${landing.keyword}?count=10`;
  const related = getRelatedEndpoints(landing.relatedKeywords);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Examples", href: "/examples" },
    { label: landing.label },
  ];

  return (
    <>
      <PageBreadcrumbJsonLd items={crumbs} />
      <PageSection>
        <Breadcrumbs items={crumbs} className="mb-6" />
        <PageHeader
          title={landing.metaTitle}
          description={landing.intro}
          actions={
            <Link
              href={`/playground?keyword=${landing.keyword}`}
              className={cn(buttonVariants())}
            >
              Try in Playground
              <ArrowRight className="size-4" />
            </Link>
          }
        />
      </PageSection>

      <PageSection>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="space-y-8">
            <p className="leading-relaxed text-muted-foreground">{landing.body}</p>

            <Card>
              <CardHeader>
                <CardTitle as="h2" className="text-base">
                  Example request
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock code={`curl "${exampleUrl}"`} />
                <CodeBlock
                  code={`const res = await fetch("${exampleUrl}");\nconst data = await res.json();`}
                />
              </CardContent>
            </Card>

            <section aria-labelledby={`${slug}-faq-heading`}>
              <h2 id={`${slug}-faq-heading`} className="text-2xl font-bold tracking-tight">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-4">
                {landing.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-medium">{faq.question}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {related.length > 0 && (
              <section aria-labelledby={`${slug}-related-heading`}>
                <h2 id={`${slug}-related-heading`} className="text-2xl font-bold tracking-tight">
                  Related endpoints
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {related.map((ep) => (
                    <li key={ep.keyword}>
                      <Link
                        href={`/examples/${ep.keyword}`}
                        className="rounded-md bg-muted px-3 py-1.5 text-sm text-primary hover:underline"
                      >
                        {ep.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="text-sm text-muted-foreground">
              Learn more in the{" "}
              <Link href="/docs" className="text-primary hover:underline">
                documentation
              </Link>{" "}
              or browse all{" "}
              <Link href="/examples" className="text-primary hover:underline">
                example endpoints
              </Link>
              .
            </p>
          </article>

          <aside aria-label="Endpoint details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle as="h2" className="text-base">
                  Endpoint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm text-primary">GET /{landing.keyword}</code>
                {landing.aiPowered && (
                  <p className="mt-2 text-xs text-muted-foreground">AI-powered via OpenRouter</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2" className="text-base">
                  Use cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {landing.useCases.map((useCase) => (
                    <li key={useCase} className="flex gap-2">
                      <span className="text-primary">•</span>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </PageSection>
    </>
  );
}
