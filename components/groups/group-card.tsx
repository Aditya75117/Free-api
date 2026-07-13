"use client";

import { ChevronDown, ChevronRight, Download, Pencil, Play, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import {
  EndpointTester,
  type EndpointTesterHandle,
} from "@/components/endpoint-tester/endpoint-tester";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApiGroup } from "@/types/api-groups";
import type { QueryParameter } from "@/types/api";

type GroupCardProps = {
  group: ApiGroup;
  onEdit: (group: ApiGroup) => void;
  onDelete: (id: string) => void;
  onOpenInPlayground: (keyword: string, params: QueryParameter[], itemId?: string) => void;
  onRemoveEndpoint: (groupId: string, endpointId: string) => void;
  onExport: (group: ApiGroup) => void;
};

export function GroupCard({
  group,
  onEdit,
  onDelete,
  onOpenInPlayground,
  onRemoveEndpoint,
  onExport,
}: GroupCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [runningAll, setRunningAll] = useState(false);
  const testerRefs = useRef<Map<string, EndpointTesterHandle>>(new Map());

  async function handleRunAll() {
    setRunningAll(true);
    try {
      for (const ep of group.endpoints) {
        const tester = testerRefs.current.get(ep.id);
        if (!tester) continue;
        await tester.generateAsync();
      }
    } finally {
      setRunningAll(false);
    }
  }

  const anyLoading = runningAll;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <button
          type="button"
          className="flex items-start gap-2 text-left"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <ChevronDown className="mt-0.5 size-4 shrink-0" />
          ) : (
            <ChevronRight className="mt-0.5 size-4 shrink-0" />
          )}
          <div>
            <CardTitle>{group.name}</CardTitle>
            {group.description && (
              <CardDescription className="mt-1">{group.description}</CardDescription>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {group.endpoints.length} endpoint{group.endpoints.length !== 1 ? "s" : ""}
              {" · "}
              Updated {new Date(group.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </button>
        <div className="flex shrink-0 gap-1">
          {expanded && group.endpoints.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRunAll}
              disabled={anyLoading}
              className="h-7 gap-1 px-2 text-xs"
            >
              <Play className="size-3" />
              {runningAll ? "Running..." : "Run All"}
            </Button>
          )}
          <Button variant="ghost" size="icon-xs" onClick={() => onExport(group)} aria-label="Export">
            <Download className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-xs" onClick={() => onEdit(group)} aria-label="Edit">
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onDelete(group.id)}
            aria-label="Delete"
          >
            <Trash2 className="size-3.5 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent>
          {group.endpoints.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No endpoints yet. Save one from the Playground.
            </p>
          ) : (
            <div className="space-y-2">
              {group.endpoints.map((ep) => (
                <EndpointTester
                  key={ep.id}
                  ref={(handle) => {
                    if (handle) {
                      testerRefs.current.set(ep.id, handle);
                    } else {
                      testerRefs.current.delete(ep.id);
                    }
                  }}
                  keyword={ep.keyword}
                  label={ep.label}
                  initialParams={ep.queryParameters}
                  itemId={ep.itemId}
                  defaultExpanded={group.endpoints.length === 1}
                  onRemove={() => onRemoveEndpoint(group.id, ep.id)}
                  onOpenInPlayground={() =>
                    onOpenInPlayground(ep.keyword, ep.queryParameters, ep.itemId)
                  }
                />
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
