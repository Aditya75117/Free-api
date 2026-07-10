import type { Metadata } from "next";

import { PlaygroundContent } from "@/components/playground/playground-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.playground);

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
