import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.home);

export default function Page() {
  return <HomePage />;
}
