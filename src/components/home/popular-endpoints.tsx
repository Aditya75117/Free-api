"use client";

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

type PopularEndpointsProps = {
  onSelect: (keyword: string) => void;
};

export function PopularEndpoints({ onSelect }: PopularEndpointsProps) {
  return (
    <section className="space-y-10">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Popular Endpoints</h2>
          <p className="mt-2 text-muted-foreground">
            Quick-start with commonly used mock API keywords.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_ENDPOINTS.map((endpoint) => (
            <EndpointCard
              key={endpoint.keyword}
              keyword={endpoint.keyword}
              label={endpoint.label}
              description={endpoint.description}
              icon={ICON_MAP[endpoint.icon]}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI-Powered Endpoints</h2>
          <p className="mt-2 text-muted-foreground">
            Try any custom keyword — AI-generated via OpenRouter.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AI_ENDPOINTS.map((endpoint) => (
            <EndpointCard
              key={endpoint.keyword}
              keyword={endpoint.keyword}
              label={endpoint.label}
              description={endpoint.description}
              icon={ICON_MAP[endpoint.icon]}
              aiPowered={endpoint.aiPowered}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
