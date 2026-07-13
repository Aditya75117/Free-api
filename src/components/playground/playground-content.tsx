"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, Bookmark, ChevronDown, ChevronRight, FolderOpen, List, Wand2 } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { SaveToGroupDialog } from "@/components/groups/save-to-group-dialog";
import { JsonPreview } from "@/components/home/json-preview";
import { ParameterForm } from "@/components/parameter-form";
import { ResponseFieldsFilter } from "@/components/response-fields-filter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/constants/api";
import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "@/constants/endpoints";
import { PLAYGROUND_INTRO } from "@/constants/page-content";
import { useApiGenerator } from "@/hooks/use-api-generator";
import { useApiGroups } from "@/hooks/use-api-groups";
import { cn } from "@/lib/utils";
import { extractListItemIds, isDetailResponse, isListResponse } from "@/utils/response-fields";
import { buildApiUrl } from "@/utils/url";

import type { QueryParameter } from "@/types/api";

const DEFAULT_PAIR_GROUP_NAME = "Untitled";

function parsePlaygroundSearchParams(searchParams: URLSearchParams): {
  keyword: string;
  params: QueryParameter[];
  itemId?: string;
} {
  const keyword = searchParams.get("keyword") ?? "";
  const itemId = searchParams.get("itemId") ?? undefined;
  const params: QueryParameter[] = [];

  searchParams.forEach((value, key) => {
    if (key !== "keyword" && key !== "itemId" && value) {
      params.push({ key, value });
    }
  });

  return { keyword, params, itemId };
}

function PlaygroundInner() {
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const { keyword: initialKeyword, params: initialParams, itemId: initialItemId } = useMemo(
    () => parsePlaygroundSearchParams(searchParams),
    // searchKey captures URL changes; searchParams identity is unstable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchKey],
  );
  const listApi = useApiGenerator(initialKeyword);
  const detailApi = useApiGenerator();
  const groupsApi = useApiGroups();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [showDetailSection, setShowDetailSection] = useState(() => Boolean(initialItemId));
  const [groupCreatedMessage, setGroupCreatedMessage] = useState<string | null>(null);
  const pairedGroupRef = useRef(false);
  const prevListResponseRef = useRef<unknown>(null);
  const listJsonPreviewRef = useRef<HTMLDivElement>(null);
  const detailJsonPreviewRef = useRef<HTMLDivElement>(null);
  const shouldScrollToListPreviewRef = useRef(false);
  const shouldScrollToDetailPreviewRef = useRef(false);
  const listItemIds = extractListItemIds(listApi.response);

  const detailUrlPreview = useMemo(() => {
    if (!listApi.keyword.trim()) return "";
    if (detailApi.itemId.trim()) {
      return (
        detailApi.detailUrl ||
        buildApiUrl(API_BASE_URL, listApi.keyword, listApi.activeParams, detailApi.itemId.trim())
      );
    }
    const template = new URL(
      buildApiUrl(API_BASE_URL, listApi.keyword, listApi.activeParams),
    );
    template.pathname = `${template.pathname.replace(/\/$/, "")}/{id}`;
    return template.toString();
  }, [listApi.keyword, listApi.activeParams, detailApi.itemId, detailApi.detailUrl]);

  useEffect(() => {
    if (initialKeyword) {
      listApi.loadConfig(initialKeyword, initialParams);
      if (initialItemId) {
        detailApi.loadConfig(initialKeyword, initialParams, initialItemId);
      }
    }
    // Only react to URL-derived config; loadConfig identities are stable enough via the hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialKeyword, initialItemId, initialParams]);

  useEffect(() => {
    if (!listApi.loading) return;
    detailApi.reset();
    pairedGroupRef.current = false;
    prevListResponseRef.current = null;
    // Depend on loading only — including detailApi (new object each render) caused an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listApi.loading]);

  useEffect(() => {
    if (
      listApi.hasResponse &&
      isListResponse(listApi.response) &&
      listItemIds.length > 0 &&
      listApi.response !== prevListResponseRef.current
    ) {
      prevListResponseRef.current = listApi.response;
      setShowDetailSection(true);
      setGroupCreatedMessage(null);
      detailApi.syncFromList(listApi.keyword, listApi.activeParams);
      shouldScrollToListPreviewRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    listApi.hasResponse,
    listApi.response,
    listApi.keyword,
    listApi.activeParams,
    listItemIds.length,
  ]);

  useEffect(() => {
    if (!shouldScrollToListPreviewRef.current) return;
    if (listApi.loading) return;
    if (!listApi.hasResponse && !listApi.error) return;

    shouldScrollToListPreviewRef.current = false;

    const frame = requestAnimationFrame(() => {
      listJsonPreviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, [listApi.loading, listApi.hasResponse, listApi.error]);

  useEffect(() => {
    if (!shouldScrollToDetailPreviewRef.current) return;
    if (detailApi.loading) return;
    if (!detailApi.hasResponse && !detailApi.error) return;

    shouldScrollToDetailPreviewRef.current = false;

    const frame = requestAnimationFrame(() => {
      detailJsonPreviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, [detailApi.loading, detailApi.hasResponse, detailApi.error]);

  useEffect(() => {
    if (
      !detailApi.hasResponse ||
      !isDetailResponse(detailApi.response) ||
      !listApi.hasResponse ||
      !isListResponse(listApi.response) ||
      pairedGroupRef.current
    ) {
      return;
    }

    pairedGroupRef.current = true;

    async function savePairGroup() {
      const group = await groupsApi.createGroupWithEndpoints(
        DEFAULT_PAIR_GROUP_NAME,
        [
          {
            keyword: listApi.keyword.trim(),
            queryParameters: listApi.activeParams,
          },
          {
            keyword: detailApi.keyword.trim(),
            queryParameters: detailApi.activeParams,
            itemId: detailApi.itemId.trim(),
          },
        ],
        { silent: true },
      );

      if (group) {
        setGroupCreatedMessage(
          `New group "${group.name}" created with your list and detail endpoints.`,
        );
      }
    }

    void savePairGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    detailApi.hasResponse,
    detailApi.response,
    detailApi.keyword,
    detailApi.activeParams,
    detailApi.itemId,
    listApi.hasResponse,
    listApi.response,
    listApi.keyword,
    listApi.activeParams,
  ]);

  async function handleSaveToGroup(groupId: string, label?: string) {
    await groupsApi.addEndpointToGroup(groupId, {
      keyword: listApi.keyword,
      label,
      queryParameters: listApi.activeParams,
    });
  }

  async function handleCreateAndSave(groupName: string, label?: string) {
    const group = await groupsApi.createGroup(groupName);
    if (group) {
      await groupsApi.addEndpointToGroup(group.id, {
        keyword: listApi.keyword,
        label,
        queryParameters: listApi.activeParams,
      });
    }
  }

  function handleLoadEndpoint(
    keyword: string,
    params: { key: string; value: string }[],
    itemId?: string,
  ) {
    if (itemId) {
      listApi.loadConfig(keyword, params);
      setShowDetailSection(true);
      detailApi.loadConfig(keyword, params, itemId);
      return;
    }
    listApi.loadConfig(keyword, params);
    setShowDetailSection(false);
    detailApi.reset();
  }

  return (
    <PageShell>
      <PageHeader
        title="API Testing Playground"
        description="Advanced testing interface with full control over endpoints and parameters."
      />

      <div className="mb-8 max-w-3xl space-y-2 text-sm leading-relaxed text-muted-foreground">
        <p>{PLAYGROUND_INTRO.paragraph1}</p>
        <p>{PLAYGROUND_INTRO.paragraph2}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Select</CardTitle>
              <CardDescription>Popular endpoint keywords</CardDescription>
            </CardHeader>
            <CardContent className="max-h-56 space-y-1 overflow-y-auto overscroll-contain pr-1">
              {POPULAR_ENDPOINTS.map((endpoint) => (
                <button
                  key={endpoint.keyword}
                  type="button"
                  onClick={() => {
                    setShowDetailSection(false);
                    detailApi.reset();
                    listApi.setKeyword(endpoint.keyword);
                  }}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                    listApi.keyword === endpoint.keyword && "bg-muted font-medium",
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
                  onClick={() => {
                    setShowDetailSection(false);
                    detailApi.reset();
                    listApi.setKeyword(endpoint.keyword);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                    listApi.keyword === endpoint.keyword && "bg-muted font-medium",
                  )}
                >
                  <span>/{endpoint.keyword}</span>
                  <span className="rounded-full bg-ai/10 px-1.5 py-0.5 text-[10px] font-medium text-ai">
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
                                handleLoadEndpoint(ep.keyword, ep.queryParameters, ep.itemId)
                              }
                              className="w-full rounded-md px-3 py-1.5 text-left text-xs transition-colors hover:bg-muted"
                            >
                              <code>
                                /{ep.keyword}
                                {ep.itemId ? `/${ep.itemId.slice(0, 8)}…` : ""}
                              </code>
                              {ep.label && (
                                <span className="ml-1.5 text-muted-foreground">{ep.label}</span>
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
                <List className="size-5 text-primary" />
                List API
              </CardTitle>
              <CardDescription>
                Generate a list of items first. Base URL:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{API_BASE_URL}</code>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="endpoint-keyword" className="text-sm font-medium">
                    Endpoint
                  </label>
                </div>
                <div className="flex rounded-lg border border-input bg-background transition-[border-color,box-shadow] focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15">
                  <span className="flex items-center border-r border-input px-3 text-sm text-muted-foreground">
                    /
                  </span>
                  <Input
                    id="endpoint-keyword"
                    placeholder="users"
                    value={listApi.keyword}
                    onChange={(e) => listApi.setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && listApi.generateList()}
                    className="border-0 shadow-none rounded-l-none focus-visible:border-transparent focus-visible:ring-0"
                  />
                </div>
              </div>

              <ParameterForm
                parameters={listApi.queryParameters}
                onUpdate={listApi.updateQueryParam}
                onSetKey={listApi.setQueryParamKey}
                onAdd={listApi.addQueryParam}
                onRemove={listApi.removeQueryParam}
              />

              {listApi.keyword.trim() && (
                <ResponseFieldsFilter
                  variant="panel"
                  loading={listApi.schemaLoading}
                  aiFieldsPending={
                    listApi.schemaSource === "ai" &&
                    !listApi.schemaLoading &&
                    !listApi.aiFieldsDiscovered &&
                    listApi.availableFields.length === 0
                  }
                  availableFields={listApi.availableFields}
                  selectedFields={listApi.selectedFields}
                  onSelectionChange={listApi.setSelectedFields}
                />
              )}

              <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Configure endpoint and parameters — then generate a list.
                </p>
                <div className="flex gap-2">
                  {listApi.keyword.trim() && (
                    <Button variant="outline" onClick={() => setSaveDialogOpen(true)}>
                      <Bookmark className="size-4" />
                      Save to Group
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setGroupCreatedMessage(null);
                      shouldScrollToListPreviewRef.current = true;
                      listApi.generateList();
                    }}
                    disabled={listApi.loading || !listApi.keyword.trim()}
                    className="min-w-[120px]"
                  >
                    {listApi.loading ? "Fetching..." : "Generate List"}
                  </Button>
                </div>
              </div>

              {listApi.listUrl && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Generated URL</p>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                    <code className="flex-1 break-all text-xs">{listApi.listUrl}</code>
                    <CopyButton value={listApi.listUrl} label="Copy" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div ref={listJsonPreviewRef} className="scroll-mt-24">
              <JsonPreview
                url={listApi.listUrl || listApi.generatedUrl}
                data={listApi.filteredResponse}
                loading={listApi.loading}
                error={listApi.error}
                filterHint={
                  listApi.hasResponse && listApi.availableFields.length > 0
                    ? "Preview updates instantly as you select fields — no need to regenerate"
                    : undefined
                }
              />
            </div>

            {showDetailSection && (
              <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                <ArrowDown className="size-4 shrink-0 text-primary" />
                <p>
                  You can fetch the detail of any item from this list — pick an id below and
                  generate a single-record response in the Detail API section.
                </p>
              </div>
            )}

            {showDetailSection && listItemIds.length > 0 && (
              <div className="space-y-2 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                <p className="text-xs font-medium text-muted-foreground">IDs from list</p>
                <p className="text-xs text-muted-foreground">
                  Copy an id and paste it into the Item ID field below, or click Use to fill it
                  automatically.
                </p>
                <div className="flex flex-wrap gap-2">
                  {listItemIds.map((id) => (
                    <div
                      key={id}
                      className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1"
                    >
                      <code className="max-w-[140px] truncate text-[11px]">{id}</code>
                      <CopyButton value={id} label="Copy" size="icon" className="size-6" />
                      <Button
                        type="button"
                        variant={detailApi.itemId === id ? "secondary" : "ghost"}
                        size="xs"
                        className="h-6 px-1.5 text-[11px]"
                        onClick={() => detailApi.setItemId(id)}
                      >
                        Use
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showDetailSection && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="size-5 text-primary" />
                    Detail API
                  </CardTitle>
                  <CardDescription>
                    Uses the same keyword and query params as your list request (including{" "}
                    <code className="rounded bg-muted px-1 text-xs">seed</code>).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="detail-item-id" className="text-sm font-medium">
                      Item ID
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Paste an id from the list above or type one manually.
                    </p>
                    <Input
                      id="detail-item-id"
                      placeholder="e.g. 3fa85f64-5717-4562-b3fc-2c963f66afa6"
                      value={detailApi.itemId}
                      onChange={(e) => detailApi.setItemId(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && detailApi.generateDetail()}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Generated URL</p>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                      <code className="flex-1 break-all text-xs">{detailUrlPreview}</code>
                      {detailApi.itemId.trim() && (
                        <CopyButton value={detailUrlPreview} label="Copy" />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-border pt-4">
                    <Button
                      onClick={() => {
                        shouldScrollToDetailPreviewRef.current = true;
                        detailApi.generateDetail();
                      }}
                      disabled={
                        detailApi.loading || !listApi.keyword.trim() || !detailApi.itemId.trim()
                      }
                      className="min-w-[120px]"
                    >
                      {detailApi.loading ? "Fetching..." : "Generate Detail"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div ref={detailJsonPreviewRef} className="scroll-mt-24">
                <JsonPreview
                  url={detailApi.detailUrl || detailUrlPreview || detailApi.generatedUrl}
                  data={detailApi.filteredResponse}
                  loading={detailApi.loading}
                  error={detailApi.error}
                />
              </div>

              {groupCreatedMessage && (
                <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-foreground">
                  <FolderOpen className="size-4 shrink-0 text-green-600 dark:text-green-400" />
                  <p>
                    {groupCreatedMessage}{" "}
                    <Link href="/groups" className="font-medium text-primary hover:underline">
                      View groups
                    </Link>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <SaveToGroupDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        groups={groupsApi.groups}
        keyword={listApi.keyword}
        onSave={handleSaveToGroup}
        onCreateAndSave={handleCreateAndSave}
      />
    </PageShell>
  );
}

export function PlaygroundContent() {
  return (
    <Suspense
      fallback={
        <PageShell className="space-y-8">
          <div className="space-y-2">
            <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
            <div className="h-5 w-96 max-w-full animate-pulse rounded-md bg-muted" />
          </div>
        </PageShell>
      }
    >
      <PlaygroundInner />
    </Suspense>
  );
}
