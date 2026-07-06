import Link from "next/link";

import { EndpointCard } from "@/components/endpoint-card";
import { POPULAR_ENDPOINTS } from "@/constants/endpoints";

export function ExampleCardGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {POPULAR_ENDPOINTS.map((endpoint) => (
        <EndpointCard
          key={endpoint.keyword}
          keyword={endpoint.keyword}
          label={endpoint.label}
          description={endpoint.description}
          icon={endpoint.icon}
          exampleHref={`/examples/${endpoint.keyword}`}
          playgroundHref={`/playground?keyword=${endpoint.keyword}`}
        />
      ))}
    </div>
  );
}

export function ExampleCardLink({ keyword, label }: { keyword: string; label: string }) {
  return (
    <Link
      href={`/playground?keyword=${keyword}`}
      className="rounded-lg border border-border p-4 transition-colors hover:bg-muted"
    >
      <code className="text-sm font-medium">/{keyword}</code>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </Link>
  );
}
