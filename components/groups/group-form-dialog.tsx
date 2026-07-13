"use client";

import { useState } from "react";

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
import { MAX_GROUP_NAME_LENGTH } from "@/types/api-groups";
import type { ApiGroup } from "@/types/api-groups";

type GroupFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingGroup?: ApiGroup | null;
  onSubmit: (name: string, description?: string) => void;
};

export function GroupFormDialog({
  open,
  onOpenChange,
  editingGroup,
  onSubmit,
}: GroupFormDialogProps) {
  const [name, setName] = useState(editingGroup?.name ?? "");
  const [description, setDescription] = useState(editingGroup?.description ?? "");

  function handleOpen(isOpen: boolean) {
    if (isOpen) {
      setName(editingGroup?.name ?? "");
      setDescription(editingGroup?.description ?? "");
    }
    onOpenChange(isOpen);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed, description.trim() || undefined);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogClose onClick={() => onOpenChange(false)} />
        <DialogHeader>
          <DialogTitle>{editingGroup ? "Edit Group" : "Create Group"}</DialogTitle>
          <DialogDescription>
            {editingGroup
              ? "Update the group name or description."
              : "Give your API group a name to get started."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="group-name">
              Name
            </label>
            <Input
              id="group-name"
              placeholder="e.g. E-commerce API"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={MAX_GROUP_NAME_LENGTH}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="group-desc">
              Description <span className="text-muted-foreground">(optional)</span>
            </label>
            <Input
              id="group-desc"
              placeholder="What is this group for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {editingGroup ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
