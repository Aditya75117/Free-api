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
import { POPULAR_ENDPOINTS } from "@/constants/endpoints";

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  "file-text": FileText,
  "shopping-bag": ShoppingBag,
  "book-open": BookOpen,
  film: Film,
  "message-square": MessageSquare,
};

export function ExamplesGrid() {
  const router = useRouter();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {POPULAR_ENDPOINTS.map((endpoint) => (
        <EndpointCard
          key={endpoint.keyword}
          keyword={endpoint.keyword}
          label={endpoint.label}
          description={endpoint.description}
          icon={ICON_MAP[endpoint.icon]}
          onSelect={(keyword) => router.push(`/playground?keyword=${keyword}`)}
        />
      ))}
    </div>
  );
}
