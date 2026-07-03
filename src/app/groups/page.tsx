"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Download, FolderPlus, Import, LayoutTemplate, Upload } from "lucide-react";
import { toast } from "sonner";

import { GroupCard } from "@/components/groups/group-card";
import { GroupFormDialog } from "@/components/groups/group-form-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GROUP_TEMPLATES } from "@/constants/group-templates";
import { useApiGroups } from "@/hooks/use-api-groups";
import { exportGroups, importGroups } from "@/services/group-storage";
import type { ApiGroup } from "@/types/api-groups";

export default function GroupsPage() {
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

  function handleImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        importGroups(text);
        await groupsApi.reload();
        toast.success("Groups imported successfully");
      } catch {
        toast.error("Failed to import groups — invalid file format");
      }
    };
    input.click();
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

  function handleOpenEndpoint(keyword: string, params: { key: string; value: string }[]) {
    const searchParams = new URLSearchParams();
    searchParams.set("keyword", keyword);
    for (const p of params) {
      if (p.key && p.value) searchParams.set(p.key, p.value);
    }
    router.push(`/playground?${searchParams.toString()}`);
  }

  if (groupsApi.isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-center text-muted-foreground">Loading groups...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My API Groups</h1>
          <p className="mt-2 text-muted-foreground">
            Organize related endpoints into groups for quick access.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload className="size-3.5" />
            Import
          </Button>
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
        </div>
      </div>

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
                  className="rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted"
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
              onOpenEndpoint={handleOpenEndpoint}
              onRemoveEndpoint={groupsApi.removeEndpointFromGroup}
              onExport={handleExportGroup}
            />
          ))}

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LayoutTemplate className="size-4 text-primary" />
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
    </div>
  );
}
