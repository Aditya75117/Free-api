"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Bookmark, ChevronDown, ChevronRight, FolderOpen, Settings2, Wand2 } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { SaveToGroupDialog } from "@/components/groups/save-to-group-dialog";
import { JsonPreview } from "@/components/home/json-preview";
import { ParameterForm } from "@/components/parameter-form";
import { ResponseFieldsFilter } from "@/components/response-fields-filter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { API_BASE_URL } from "@/constants/api";
import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "@/constants/endpoints";
import { useApiGenerator } from "@/hooks/use-api-generator";
import { useApiGroups } from "@/hooks/use-api-groups";
import { cn } from "@/lib/utils";

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get("keyword") ?? "";
  const api = useApiGenerator(initialKeyword);
  const groupsApi = useApiGroups();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);

  useEffect(() => {
    if (initialKeyword) {
      api.setKeyword(initialKeyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialKeyword]);

  async function handleSaveToGroup(groupId: string, label?: string) {
    await groupsApi.addEndpointToGroup(groupId, {
      keyword: api.keyword,
      label,
      queryParameters: api.queryParameters,
    });
  }

  async function handleCreateAndSave(groupName: string, label?: string) {
    const group = await groupsApi.createGroup(groupName);
    if (group) {
      await groupsApi.addEndpointToGroup(group.id, {
        keyword: api.keyword,
        label,
        queryParameters: api.queryParameters,
      });
    }
  }

  function handleLoadEndpoint(keyword: string, params: { key: string; value: string }[]) {
    api.loadConfig(keyword, params);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Playground</h1>
        <p className="mt-2 text-muted-foreground">
          Advanced testing interface with full control over endpoints and parameters.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Select</CardTitle>
              <CardDescription>Popular endpoint keywords</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {POPULAR_ENDPOINTS.map((endpoint) => (
                <button
                  key={endpoint.keyword}
                  type="button"
                  onClick={() => api.setKeyword(endpoint.keyword)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                    api.keyword === endpoint.keyword && "bg-muted font-medium",
                  )}
                >
                  /{endpoint.keyword}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">AI Keywords</CardTitle>
              <CardDescription>Powered by OpenRouter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {AI_ENDPOINTS.map((endpoint) => (
                <button
                  key={endpoint.keyword}
                  type="button"
                  onClick={() => api.setKeyword(endpoint.keyword)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                    api.keyword === endpoint.keyword && "bg-muted font-medium",
                  )}
                >
                  <span>/{endpoint.keyword}</span>
                  <span className="rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-medium text-violet-600 dark:text-violet-400">
                    AI
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>

          {!groupsApi.isLoading && groupsApi.groups.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-1.5 text-sm">
                  <FolderOpen className="size-3.5" />
                  My Groups
                </CardTitle>
                <CardDescription>
                  <Link href="/groups" className="text-xs text-primary hover:underline">
                    Manage groups
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {groupsApi.groups.map((group) => (
                  <div key={group.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedGroupId(expandedGroupId === group.id ? null : group.id)
                      }
                      className="flex w-full items-center gap-1.5 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                    >
                      {expandedGroupId === group.id ? (
                        <ChevronDown className="size-3 shrink-0" />
                      ) : (
                        <ChevronRight className="size-3 shrink-0" />
                      )}
                      <span className="truncate">{group.name}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground">
                        {group.endpoints.length}
                      </span>
                    </button>
                    {expandedGroupId === group.id && (
                      <div className="ml-4 space-y-0.5 pb-1">
                        {group.endpoints.length === 0 ? (
                          <p className="px-3 py-1 text-xs text-muted-foreground">No endpoints</p>
                        ) : (
                          group.endpoints.map((ep) => (
                            <button
                              key={ep.id}
                              type="button"
                              onClick={() =>
                                handleLoadEndpoint(ep.keyword, ep.queryParameters)
                              }
                              className="w-full rounded-md px-3 py-1.5 text-left text-xs transition-colors hover:bg-muted"
                            >
                              <code>/{ep.keyword}</code>
                              {ep.label && (
                                <span className="ml-1.5 text-muted-foreground">
                                  {ep.label}
                                </span>
                              )}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </aside>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="size-5 text-primary" />
                URL Builder
              </CardTitle>
              <CardDescription>
                Base URL:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{API_BASE_URL}</code>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  placeholder="Keyword (e.g. users)"
                  value={api.keyword}
                  onChange={(e) => api.setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && api.generate()}
                />
                <div className="flex gap-2">
                  <Button onClick={api.generate} disabled={api.loading} className="flex-1 sm:flex-none">
                    {api.loading ? "Fetching..." : "Generate"}
                  </Button>
                  {api.keyword.trim() && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSaveDialogOpen(true)}
                      aria-label="Save to group"
                    >
                      <Bookmark className="size-4" />
                    </Button>
                  )}
                </div>
              </div>

              <Separator />

              <ParameterForm
                parameters={api.queryParameters}
                onUpdate={api.updateQueryParam}
                onAdd={api.addQueryParam}
                onRemove={api.removeQueryParam}
              />

              {api.generatedUrl && (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                  <code className="flex-1 break-all text-xs">{api.generatedUrl}</code>
                  <CopyButton value={api.generatedUrl} label="Copy" />
                </div>
              )}
            </CardContent>
          </Card>

          <JsonPreview
            url={api.generatedUrl}
            data={api.filteredResponse}
            loading={api.loading}
            error={api.error}
            filterSlot={
              api.availableFields.length > 0 ? (
                <ResponseFieldsFilter
                  availableFields={api.availableFields}
                  selectedFields={api.selectedFields}
                  onSelectionChange={api.setSelectedFields}
                />
              ) : undefined
            }
          />
        </div>
      </div>

      <SaveToGroupDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        groups={groupsApi.groups}
        keyword={api.keyword}
        onSave={handleSaveToGroup}
        onCreateAndSave={handleCreateAndSave}
      />
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}
