import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { HeroIllustration } from "@/components/home/hero-illustration";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { HOME_HERO } from "@/constants/page-content";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:grid-cols-2 sm:px-6 sm:py-28">
        <div>
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 size-3" />
            {HOME_HERO.badge}
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
            {HOME_HERO.title.split(" in ")[0]}{" "}
            <span className="text-primary">in seconds</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{HOME_HERO.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#generator" className={cn(buttonVariants({ size: "lg" }))}>
              {HOME_HERO.ctaPrimary}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/playground"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {HOME_HERO.ctaSecondary}
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Custom keywords, query params, field filtering, and AI schemas — all in one free mock
            API, ready for{" "}
            <Link href="/playground" className="text-primary hover:underline">
              the playground
            </Link>
            .
          </p>
        </div>
        <div className="hidden sm:block">
          <HeroIllustration className="lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
