import type { Metadata } from "next";

import { PlaygroundContent } from "@/components/playground/playground-content";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Playground",
  description:
    "API testing playground and mock API tester. Try REST endpoints online with full control over parameters, field filtering, and saved groups.",
  path: "/playground",
  keywords: ["api testing playground", "mock api tester", "try rest api online"],
});

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
