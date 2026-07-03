"use client";

import { useCallback } from "react";

import { ApiGenerator } from "@/components/home/api-generator";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { JsonPreview } from "@/components/home/json-preview";
import { PopularEndpoints } from "@/components/home/popular-endpoints";
import { PageSection } from "@/components/layout/page-section";
import { useApiGenerator } from "@/hooks/use-api-generator";

export function HomePage() {
  const api = useApiGenerator();

  const handleSelectEndpoint = useCallback(
    (keyword: string) => {
      api.setKeyword(keyword);
      document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
    },
    [api],
  );

  return (
    <>
      <Hero />
      <PageSection>
        <div className="grid gap-6 lg:grid-cols-2">
          <ApiGenerator onGenerate={api} />
          <JsonPreview
            url={api.generatedUrl}
            data={api.filteredResponse}
            loading={api.loading}
            error={api.error}
          />
        </div>
      </PageSection>
      <PopularEndpoints onSelect={handleSelectEndpoint} />
      <Features />
    </>
  );
}
