import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <PageShell>
      <PageHeader
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="size-6" />
          </span>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try the playground to build and test mock API endpoints.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
            <Link href="/playground" className={cn(buttonVariants())}>
              Open Playground
            </Link>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
