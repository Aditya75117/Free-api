"use client";

import { ApiGenerator } from "@/components/home/api-generator";
import { JsonPreview } from "@/components/home/json-preview";
import { PageSection } from "@/components/layout/page-section";
import { HOME_GENERATOR } from "@/constants/page-content";
import { useApiGenerator } from "@/hooks/use-api-generator";

export function HomeGeneratorSection() {
  const api = useApiGenerator();

  return (
    <PageSection
      id="generator"
      title={HOME_GENERATOR.title}
      description={HOME_GENERATOR.description}
    >
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
  );
}
