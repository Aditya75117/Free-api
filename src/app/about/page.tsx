import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Rocket, Target } from "lucide-react";

import { DocsToc } from "@/components/docs/docs-toc";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ABOUT_TOC_ITEMS } from "@/constants/about-sections";
import { FEATURES } from "@/constants/endpoints";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Free API — motivation, features, and roadmap.",
};

const ROADMAP = [
  { phase: "Phase 1", title: "Project Setup", items: ["Tailwind", "Shadcn", "Routing"], done: true },
  {
    phase: "Phase 2",
    title: "Core Features",
    items: ["API Generator", "JSON Preview", "Copy & Download", "Response field filtering"],
    done: true,
  },
  {
    phase: "Phase 3",
    title: "Playground & Groups",
    items: ["Advanced params", "Saved endpoints", "API groups", "Group templates", "Export"],
    done: true,
  },
  { phase: "Phase 4", title: "Polish", items: ["SEO", "Analytics", "PWA", "Request history"], done: false },
];

export default function AboutPage() {
  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <PageHeader
          title="About Free API"
          description="A developer tool for generating mock REST APIs on demand."
          className="mb-10"
        />

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,720px)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <DocsToc items={[...ABOUT_TOC_ITEMS]} />
          </aside>

          <div className="min-w-0 space-y-8">
            <section id="motivation" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="size-5 text-primary" />
                    <CardTitle>Motivation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="leading-relaxed text-muted-foreground">
                  Building frontend apps often means waiting on backend endpoints or setting up
                  complex mock servers. Free API removes that friction — enter a keyword, get
                  realistic JSON, and keep shipping. It&apos;s designed for prototyping, testing,
                  tutorials, and hackathons.
                </CardContent>
              </Card>
            </section>

            <section id="features" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <CardTitle>Features</CardTitle>
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

            <section id="roadmap" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Rocket className="size-5 text-primary" />
                    <CardTitle>Roadmap</CardTitle>
                  </div>
                  <CardDescription>What we&apos;ve built and what&apos;s next.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ROADMAP.map((item) => (
                    <div key={item.phase} className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {item.phase}
                        </span>
                        <Badge variant={item.done ? "secondary" : "outline"}>
                          {item.done ? "Complete" : "Upcoming"}
                        </Badge>
                      </div>
                      <h3 className="mt-1 font-medium">{item.title}</h3>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {item.items.map((feature) => (
                          <li
                            key={feature}
                            className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section id="get-started" className="scroll-mt-24">
              <Card>
                <CardContent className="flex flex-col items-center py-10 text-center">
                  <h2 className="text-xl font-bold tracking-tight">Ready to try it?</h2>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Build endpoints, filter response fields, and save configs to groups — all in the
                    playground.
                  </p>
                  <Link href="/playground" className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
                    Open Playground
                  </Link>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
