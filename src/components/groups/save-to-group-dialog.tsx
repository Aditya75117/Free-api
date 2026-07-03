"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ApiGroup } from "@/types/api-groups";
import { cn } from "@/lib/utils";

type SaveToGroupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: ApiGroup[];
  keyword: string;
  onSave: (groupId: string, label?: string) => void;
  onCreateAndSave: (groupName: string, label?: string) => void;
};

export function SaveToGroupDialog({
  open,
  onOpenChange,
  groups,
  keyword,
  onSave,
  onCreateAndSave,
}: SaveToGroupDialogProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [creatingNew, setCreatingNew] = useState(false);

  function handleOpen(isOpen: boolean) {
    if (isOpen) {
      setSelectedGroupId(null);
      setLabel("");
      setNewGroupName("");
      setCreatingNew(groups.length === 0);
    }
    onOpenChange(isOpen);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const endpointLabel = label.trim() || undefined;

    if (creatingNew) {
      const trimmed = newGroupName.trim();
      if (!trimmed) return;
      onCreateAndSave(trimmed, endpointLabel);
    } else {
      if (!selectedGroupId) return;
      onSave(selectedGroupId, endpointLabel);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogClose onClick={() => onOpenChange(false)} />
        <DialogHeader>
          <DialogTitle>Save to Group</DialogTitle>
          <DialogDescription>
            Save <code className="rounded bg-muted px-1 py-0.5 text-xs">/{keyword}</code> to an
            existing group or create a new one.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!creatingNew && groups.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select group</label>
              <div className="max-h-40 space-y-1 overflow-y-auto">
                {groups.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGroupId(g.id)}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 text-left text-sm transition-colors",
                      selectedGroupId === g.id
                        ? "border-primary bg-primary/5 font-medium"
                        : "border-border hover:bg-muted",
                    )}
                  >
                    {g.name}
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({g.endpoints.length} endpoints)
                    </span>
                  </button>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setCreatingNew(true)}
              >
                <Plus className="size-3.5" />
                Create new group
              </Button>
            </div>
          )}

          {creatingNew && (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="new-group-name">
                New group name
              </label>
              <Input
                id="new-group-name"
                placeholder="e.g. My APIs"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                autoFocus
              />
              {groups.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setCreatingNew(false)}
                >
                  Select existing group
                </Button>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="endpoint-label">
              Label <span className="text-muted-foreground">(optional)</span>
            </label>
            <Input
              id="endpoint-label"
              placeholder={`e.g. Customer list`}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={creatingNew ? !newGroupName.trim() : !selectedGroupId}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
