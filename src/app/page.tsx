import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Mock REST API Generator",
  description:
    "Generate mock REST APIs instantly with ApiGenerator. Enter any keyword, preview JSON responses, customize query parameters, and copy endpoints for prototyping and testing.",
  path: "/",
  keywords: [
    "mock rest api generator",
    "fake api for testing",
    "json mock api",
    "instant mock endpoints",
  ],
});

export default function Page() {
  return <HomePage />;
}
