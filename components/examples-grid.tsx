import { EndpointCard } from "@/components/endpoint-card";
import { PageSection } from "@/components/layout/page-section";
import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "@/constants/endpoints";

export function ExamplesGrid() {
  return (
    <>
      <PageSection
        title="Popular Endpoints"
        description="Quick-start with commonly used mock API keywords."
      >
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
      </PageSection>

      <PageSection
        title="AI-Powered Endpoints"
        description="Try custom keywords — AI-generated mock data via OpenRouter."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AI_ENDPOINTS.map((endpoint) => (
            <EndpointCard
              key={endpoint.keyword}
              keyword={endpoint.keyword}
              label={endpoint.label}
              description={endpoint.description}
              icon={endpoint.icon}
              aiPowered={endpoint.aiPowered}
              exampleHref={`/examples/${endpoint.keyword}`}
              playgroundHref={`/playground?keyword=${endpoint.keyword}`}
            />
          ))}
        </div>
      </PageSection>
    </>
  );
}
