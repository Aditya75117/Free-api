import type { Metadata } from "next";

import { PlaygroundContent } from "@/components/playground/playground-content";

export const metadata: Metadata = {
  title: "Playground",
  description: "Advanced API testing interface with full control over endpoints and parameters.",
};

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
