import type { Metadata } from "next";
import { CheckCircle2, Rocket, Target } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FEATURES } from "@/constants/endpoints";

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
    items: ["Advanced params", "Saved endpoints", "API groups", "Group templates", "Import / Export"],
    done: true,
  },
  { phase: "Phase 4", title: "Polish", items: ["SEO", "Analytics", "PWA", "Request history"], done: false },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">About Free API</h1>
        <p className="mt-2 text-muted-foreground">
          A developer tool for generating mock REST APIs on demand.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="size-5 text-primary" />
              <CardTitle>Motivation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            Building frontend apps often means waiting on backend endpoints or setting up
            complex mock servers. Free API removes that friction — enter a keyword, get
            realistic JSON, and keep shipping. It&apos;s designed for prototyping, testing,
            tutorials, and hackathons.
          </CardContent>
        </Card>

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
              <li className="flex gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <span className="font-medium">Response Field Filtering</span>
                  <p className="text-muted-foreground">
                    Filter which fields appear in the JSON preview after any API response —
                    copy and download only what you need.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <span className="font-medium">API Groups</span>
                  <p className="text-muted-foreground">
                    Create and manage groups of related endpoints. Save playground configs,
                    use starter templates, and export/import groups as JSON.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

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
              <div
                key={item.phase}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {item.phase}
                  </span>
                  {item.done && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      Complete
                    </span>
                  )}
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
      </div>
    </div>
  );
}
