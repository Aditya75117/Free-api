import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from "@/constants/api";
import {
  getAllEndpointSlugs,
  getEndpointLanding,
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
    keywords: ["mock api", landing.keyword, landing.label.toLowerCase(), "fake data"],
  });
}

export default async function ExampleLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const landing = getEndpointLanding(slug);
  if (!landing) notFound();

  const exampleUrl = `${API_BASE_URL}/${landing.keyword}?count=10`;

  return (
    <>
      <PageSection>
        <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/examples" className="hover:text-foreground">
            Examples
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{landing.label}</span>
        </nav>

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
          <div className="space-y-6">
            <p className="leading-relaxed text-muted-foreground">{landing.body}</p>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Example request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock code={`curl "${exampleUrl}"`} />
                <CodeBlock
                  code={`const res = await fetch("${exampleUrl}");\nconst data = await res.json();`}
                />
              </CardContent>
            </Card>

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
          </div>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Endpoint</CardTitle>
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
                <CardTitle className="text-base">Use cases</CardTitle>
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
