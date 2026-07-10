import type { BreadcrumbItem } from "@/components/seo/breadcrumbs";
import { SITE_URL } from "@/constants/site";

type PageBreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

export function PageBreadcrumbJsonLd({ items }: PageBreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
