import type { Metadata } from "next";

import { SITE_NAME } from "@/constants/site";

export const DEFAULT_OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "ApiGenerator — Free Mock REST API and Fake JSON",
} as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
  };
}
