"use client";

import { ChevronDown, ChevronRight, ExternalLink, Trash2 } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { CopyButton } from "@/components/copy-button";
import { JsonPreview } from "@/components/home/json-preview";
import { ParameterForm } from "@/components/parameter-form";
import { ResponseFieldsFilter } from "@/components/response-fields-filter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useApiGenerator } from "@/hooks/use-api-generator";
import { cn } from "@/lib/utils";
import type { QueryParameter } from "@/types/api";

export type EndpointTesterHandle = {
  generate: () => void;
  generateAsync: () => Promise<void>;
  loading: boolean;
};

type EndpointTesterProps = {
  keyword: string;
  label?: string;
  initialParams: QueryParameter[];
  itemId?: string;
  autoFetch?: boolean;
  compact?: boolean;
  defaultExpanded?: boolean;
  onRemove?: () => void;
  onOpenInPlayground?: () => void;
};

export const EndpointTester = forwardRef<EndpointTesterHandle, EndpointTesterProps>(
  function EndpointTester(
    {
      keyword,
      label,
      initialParams,
      itemId,
      autoFetch = true,
      compact = true,
      defaultExpanded = false,
      onRemove,
      onOpenInPlayground,
    },
    ref,
  ) {
    const api = useApiGenerator();
    const configLoaded = useRef(false);
    const didAutoFetch = useRef(false);
    const [expanded, setExpanded] = useState(defaultExpanded);

    const paramsSummary = initialParams
      .filter((p) => p.key && p.value)
      .map((p) => `${p.key}=${p.value}`)
      .join("&");

    useEffect(() => {
      if (configLoaded.current) return;
      configLoaded.current = true;
      api.loadConfig(keyword, initialParams, itemId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, initialParams, itemId]);

    useEffect(() => {
      if (!expanded || !autoFetch || didAutoFetch.current) return;
      if (api.keyword.trim() !== keyword.trim()) return;
      didAutoFetch.current = true;
      if (itemId) {
        void api.generateDetailAsync();
      } else {
        void api.generateAsync();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expanded, autoFetch, api.keyword, keyword, itemId]);

    useImperativeHandle(
      ref,
      () => ({
        generate: itemId ? api.generateDetail : api.generate,
        generateAsync: itemId ? api.generateDetailAsync : api.generateAsync,
        loading: api.loading,
      }),
      [api.generate, api.generateAsync, api.generateDetail, api.generateDetailAsync, api.loading, itemId],
    );

    const previewMaxHeight = compact ? 200 : 360;

    return (
      <Card className="gap-0 border-border/80 py-0" size="sm">
        <CardHeader
          className={cn(
            "flex flex-row items-center justify-between gap-1.5 space-y-0 px-2.5 py-1.5",
            expanded && "border-b border-border pb-1.5",
          )}
        >
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-1 text-left"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="size-3 shrink-0 text-muted-foreground" />
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <code className="text-xs font-medium leading-none">
                  /{keyword}
                  {itemId ? `/${itemId.slice(0, 8)}…` : ""}
                </code>
                {label && (
                  <span className="text-[11px] text-muted-foreground">({label})</span>
                )}
                {api.loading && (
                  <span className="text-[11px] text-muted-foreground">Fetching...</span>
                )}
              </div>
              {!expanded && paramsSummary && (
                <p className="mt-0.5 truncate text-[11px] leading-tight text-muted-foreground">
                  ?{paramsSummary}
                </p>
              )}
            </div>
          </button>
          <div className="flex shrink-0 items-center gap-0.5">
            {onOpenInPlayground && (
              <Button
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenInPlayground();
                }}
                className="h-6 gap-1 px-1.5"
              >
                <ExternalLink className="size-3" />
                Playground
              </Button>
            )}
            {onRemove && (
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="size-6"
                aria-label="Remove endpoint"
              >
                <Trash2 className="size-3 text-destructive" />
              </Button>
            )}
          </div>
        </CardHeader>
        {expanded && (
          <CardContent className="space-y-4 p-3 pt-2.5">
          <ParameterForm
            parameters={api.queryParameters}
            onUpdate={api.updateQueryParam}
            onSetKey={api.setQueryParamKey}
            onAdd={api.addQueryParam}
            onRemove={api.removeQueryParam}
          />

          {api.keyword.trim() && (
            <ResponseFieldsFilter
              variant="panel"
              loading={api.schemaLoading}
              aiFieldsPending={
                api.schemaSource === "ai" &&
                !api.schemaLoading &&
                !api.aiFieldsDiscovered &&
                api.availableFields.length === 0
              }
              availableFields={api.availableFields}
              selectedFields={api.selectedFields}
              onSelectionChange={api.setSelectedFields}
            />
          )}

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-end">
            <Button
              onClick={itemId ? api.generateDetail : api.generate}
              disabled={api.loading || !api.keyword.trim() || (Boolean(itemId) && !api.itemId.trim())}
              size="sm"
              className="min-w-[100px]"
            >
              {api.loading ? "Fetching..." : "Generate"}
            </Button>
          </div>

          {api.generatedUrl && (
            <div className="space-y-2">
              <p className="text-xs font-medium">Generated URL</p>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-2">
                <code className="flex-1 break-all text-xs">{api.generatedUrl}</code>
                <CopyButton value={api.generatedUrl} label="Copy" />
              </div>
            </div>
          )}

          <JsonPreview
            url={api.generatedUrl}
            data={api.filteredResponse}
            loading={api.loading}
            error={api.error}
            compact={compact}
            maxHeight={previewMaxHeight}
            filterHint={
              api.hasResponse && api.availableFields.length > 0
                ? "Preview updates instantly as you select fields — no need to regenerate"
                : undefined
            }
          />
          </CardContent>
        )}
      </Card>
    );
  },
);
