import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Target } from "lucide-react";

import { DocsToc } from "@/components/docs/docs-toc";
import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABOUT_TOC_ITEMS } from "@/constants/about-sections";
import { FEATURES } from "@/constants/endpoints";
import { ABOUT_CONTENT } from "@/constants/page-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.about);

export default function AboutPage() {
  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <PageHeader
          title="About ApiGenerator"
          description="A free, open-source mock REST API generator for frontend developers."
          className="mb-10"
        />

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,720px)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <DocsToc items={[...ABOUT_TOC_ITEMS]} />
          </aside>

          <div className="min-w-0 space-y-8">
            <section id="motivation" className="scroll-mt-24" aria-labelledby="motivation-heading">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="size-5 text-primary" />
                    <CardTitle as="h2" id="motivation-heading">
                      Why we built ApiGenerator
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 leading-relaxed text-muted-foreground">
                  <p>{ABOUT_CONTENT.motivation}</p>
                  <p>{ABOUT_CONTENT.openSource}</p>
                </CardContent>
              </Card>
            </section>

            <section id="features" className="scroll-mt-24" aria-labelledby="features-heading">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <CardTitle as="h2" id="features-heading">
                      Features
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {FEATURES.map((feature) => (
                      <li key={feature.title} className="flex gap-3 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <div>
                          <span className="font-medium">{feature.title}</span>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section id="get-started" className="scroll-mt-24">
              <Card>
                <CardContent className="flex flex-col items-center py-10 text-center">
                  <h2 className="text-xl font-bold tracking-tight">Ready to try it?</h2>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Build endpoints, filter response fields, and save configs to groups — all in the
                    playground. Compare ApiGenerator as a{" "}
                    <Link href="/compare/jsonplaceholder" className="text-primary hover:underline">
                      JSONPlaceholder alternative
                    </Link>{" "}
                    or explore{" "}
                    <Link href="/use-cases/react-mock-api" className="text-primary hover:underline">
                      mock APIs in React
                    </Link>
                    .
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Link href="/playground" className={cn(buttonVariants({ size: "lg" }))}>
                      Open Playground
                    </Link>
                    <Link href="/docs" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                      Read Docs
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
