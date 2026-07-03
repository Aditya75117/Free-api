import type { Metadata } from "next";

import { ExamplesGrid } from "@/components/examples-grid";

export const metadata: Metadata = {
  title: "Examples",
  description: "Common mock API endpoint examples for users, posts, products, and more.",
};

export default function ExamplesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Examples</h1>
        <p className="mt-2 text-muted-foreground">
          Browse common endpoint patterns and try them in the playground.
        </p>
      </div>
      <ExamplesGrid />
    </div>
  );
}
