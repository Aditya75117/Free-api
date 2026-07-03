import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="mr-1 size-3" />
          Mock REST APIs for developers
        </Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Generate mock APIs{" "}
          <span className="text-primary">in seconds</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Enter any keyword, hit generate, and get realistic JSON responses instantly.
          Perfect for prototyping, testing, and learning — no backend required.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#generator"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
          >
            Try it now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/playground"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium hover:bg-muted"
          >
            Open Playground
          </Link>
        </div>
      </div>
    </section>
  );
}
