"use client";

import { useRouter } from "next/navigation";
import {
  BookOpen,
  FileText,
  Film,
  MessageSquare,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";

import { EndpointCard } from "@/components/endpoint-card";
import { PageSection } from "@/components/layout/page-section";
import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "@/constants/endpoints";

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  "file-text": FileText,
  "shopping-bag": ShoppingBag,
  "book-open": BookOpen,
  film: Film,
  "message-square": MessageSquare,
  dog: Users,
  globe: BookOpen,
  receipt: FileText,
};

export function ExamplesGrid() {
  const router = useRouter();

  function handleSelect(keyword: string) {
    router.push(`/playground?keyword=${keyword}`);
  }

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
              icon={ICON_MAP[endpoint.icon]}
              onSelect={handleSelect}
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
              icon={ICON_MAP[endpoint.icon]}
              aiPowered={endpoint.aiPowered}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </PageSection>
    </>
  );
}
