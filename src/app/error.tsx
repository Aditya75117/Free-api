"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell>
      <PageHeader
        title="Something went wrong"
        description="An unexpected error occurred while loading this page."
      />
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <AlertCircle className="size-6" />
          </span>
          <p className="max-w-sm text-sm text-muted-foreground">
            {error.message || "Please try again or return to the home page."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button variant="outline" onClick={reset}>
              Try again
            </Button>
            <Link href="/" className={cn(buttonVariants())}>
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
