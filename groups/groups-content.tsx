"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Download, FolderPlus, Import, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";

import { GroupCard } from "@/components/groups/group-card";
import { GroupFormDialog } from "@/components/groups/group-form-dialog";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GROUP_TEMPLATES } from "@/constants/group-templates";
import { useApiGroups } from "@/hooks/use-api-groups";
import { exportGroups } from "@/services/group-storage";
import type { ApiGroup } from "@/types/api-groups";

function GroupsLoadingSkeleton() {
  return (
    <PageShell className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    </PageShell>
  );
}

export function GroupsContent() {
  const router = useRouter();
  const groupsApi = useApiGroups();
  const [formOpen, setFormOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<ApiGroup | null>(null);

  async function handleCreateOrUpdate(name: string, description?: string) {
    if (editingGroup) {
      await groupsApi.updateGroup(editingGroup.id, { name, description });
    } else {
      await groupsApi.createGroup(name, description);
    }
    setEditingGroup(null);
  }

  function handleEdit(group: ApiGroup) {
    setEditingGroup(group);
    setFormOpen(true);
  }

  function handleCreate() {
    setEditingGroup(null);
    setFormOpen(true);
  }

  function handleExportGroup(group: ApiGroup) {
    const json = JSON.stringify(group, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `${group.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    anchor.click();
    URL.revokeObjectURL(href);
    toast.success("Group exported");
  }

  function handleExportAll() {
    const json = exportGroups();
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "free-api-groups.json";
    anchor.click();
    URL.revokeObjectURL(href);
    toast.success("All groups exported");
  }

  async function handleUseTemplate(templateIndex: number) {
    const template = GROUP_TEMPLATES[templateIndex];
    const group = await groupsApi.createGroup(template.name, template.description);
    if (!group) return;

    for (const ep of template.endpoints) {
      await groupsApi.addEndpointToGroup(group.id, ep);
    }
    toast.success(`Template "${template.name}" added`);
  }

  function handleOpenInPlayground(
    keyword: string,
    params: { key: string; value: string }[],
    itemId?: string,
  ) {
    const searchParams = new URLSearchParams();
    searchParams.set("keyword", keyword);
    for (const p of params) {
      if (p.key && p.value) searchParams.set(p.key, p.value);
    }
    if (itemId) searchParams.set("itemId", itemId);
    router.push(`/playground?${searchParams.toString()}`);
  }

  if (groupsApi.isLoading) {
    return <GroupsLoadingSkeleton />;
  }

  const headerActions = (
    <>
      {groupsApi.groups.length > 0 && (
        <Button variant="outline" size="sm" onClick={handleExportAll}>
          <Download className="size-3.5" />
          Export All
        </Button>
      )}
      <Button size="sm" onClick={handleCreate}>
        <FolderPlus className="size-3.5" />
        Create Group
      </Button>
    </>
  );

  return (
    <PageShell>
      <PageHeader
        title="My Groups"
        description="Organize related endpoints into groups for quick access."
        actions={headerActions}
      />

      {groupsApi.groups.length === 0 ? (
        <div className="space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FolderPlus className="mb-4 size-10 text-muted-foreground/50" />
              <h2 className="text-lg font-semibold">No groups yet</h2>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Create your first group to organize API endpoints, or start from a template.
              </p>
              <Button className="mt-4" onClick={handleCreate}>
                <FolderPlus className="size-3.5" />
                Create your first group
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LayoutTemplate className="size-5 text-primary" />
                <CardTitle>Starter Templates</CardTitle>
              </div>
              <CardDescription>Quick-start with a pre-built group of endpoints.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {GROUP_TEMPLATES.map((template, i) => (
                <button
                  key={template.name}
                  type="button"
                  onClick={() => handleUseTemplate(i)}
                  className="rounded-lg border border-border p-4 text-left transition-shadow hover:shadow-md"
                >
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{template.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {template.endpoints.length} endpoints
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          {groupsApi.groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onEdit={handleEdit}
              onDelete={groupsApi.deleteGroup}
              onOpenInPlayground={handleOpenInPlayground}
              onRemoveEndpoint={groupsApi.removeEndpointFromGroup}
              onExport={handleExportGroup}
            />
          ))}

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LayoutTemplate className="size-5 text-primary" />
                <CardTitle className="text-sm">Add from Template</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {GROUP_TEMPLATES.map((template, i) => (
                <Button
                  key={template.name}
                  variant="outline"
                  size="sm"
                  onClick={() => handleUseTemplate(i)}
                >
                  <Import className="size-3.5" />
                  {template.name}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      <GroupFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        editingGroup={editingGroup}
        onSubmit={handleCreateOrUpdate}
      />
    </PageShell>
  );
}
