"use client";

import { ExternalLink, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SavedEndpoint } from "@/types/api-groups";

type GroupEndpointListProps = {
  endpoints: SavedEndpoint[];
  onOpen: (endpoint: SavedEndpoint) => void;
  onRemove: (endpointId: string) => void;
};

export function GroupEndpointList({ endpoints, onOpen, onRemove }: GroupEndpointListProps) {
  return (
    <div className="space-y-1">
      {endpoints.map((ep) => {
        const paramsSummary = ep.queryParameters
          .filter((p) => p.key && p.value)
          .map((p) => `${p.key}=${p.value}`)
          .join("&");

        return (
          <div
            key={ep.id}
            className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <code className="text-sm font-medium">/{ep.keyword}</code>
                {ep.label && (
                  <span className="text-xs text-muted-foreground">({ep.label})</span>
                )}
              </div>
              {paramsSummary && (
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  ?{paramsSummary}
                </p>
              )}
            </div>
            <div className="flex shrink-0 gap-1">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => onOpen(ep)}
                aria-label="Open in playground"
              >
                <ExternalLink className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => onRemove(ep.id)}
                aria-label="Remove endpoint"
              >
                <Trash2 className="size-3.5 text-destructive" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
