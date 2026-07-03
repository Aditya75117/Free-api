"use client";

import { ChevronDown, ChevronRight, Download, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { GroupEndpointList } from "@/components/groups/group-endpoint-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApiGroup } from "@/types/api-groups";
import type { QueryParameter } from "@/types/api";

type GroupCardProps = {
  group: ApiGroup;
  onEdit: (group: ApiGroup) => void;
  onDelete: (id: string) => void;
  onOpenEndpoint: (keyword: string, params: QueryParameter[]) => void;
  onRemoveEndpoint: (groupId: string, endpointId: string) => void;
  onExport: (group: ApiGroup) => void;
};

export function GroupCard({
  group,
  onEdit,
  onDelete,
  onOpenEndpoint,
  onRemoveEndpoint,
  onExport,
}: GroupCardProps) {
  const [expanded, setExpanded] = useState(false);

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
            <GroupEndpointList
              endpoints={group.endpoints}
              onOpen={(ep) => onOpenEndpoint(ep.keyword, ep.queryParameters)}
              onRemove={(epId) => onRemoveEndpoint(group.id, epId)}
            />
          )}
        </CardContent>
      )}
    </Card>
  );
}
