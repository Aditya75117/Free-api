"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { localGroupStorage } from "@/services/group-storage";
import type { ApiGroup, SavedEndpoint } from "@/types/api-groups";
import { MAX_ENDPOINTS_PER_GROUP, MAX_GROUPS, MAX_GROUP_NAME_LENGTH } from "@/types/api-groups";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useApiGroups() {
  const [groups, setGroups] = useState<ApiGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    const data = await localGroupStorage.getGroups();
    setGroups(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const createGroup = useCallback(
    async (name: string, description?: string): Promise<ApiGroup | null> => {
      const trimmed = name.trim();
      if (!trimmed || trimmed.length > MAX_GROUP_NAME_LENGTH) {
        toast.error(`Group name must be 1–${MAX_GROUP_NAME_LENGTH} characters`);
        return null;
      }
      if (groups.length >= MAX_GROUPS) {
        toast.error(`Maximum ${MAX_GROUPS} groups allowed`);
        return null;
      }

      const group: ApiGroup = {
        id: generateId(),
        name: trimmed,
        description: description?.trim() || undefined,
        endpoints: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await localGroupStorage.saveGroup(group);
      await reload();
      toast.success(`Group "${trimmed}" created`);
      return group;
    },
    [groups.length, reload],
  );

  const updateGroup = useCallback(
    async (id: string, updates: Partial<Pick<ApiGroup, "name" | "description">>) => {
      if (updates.name !== undefined) {
        const trimmed = updates.name.trim();
        if (!trimmed || trimmed.length > MAX_GROUP_NAME_LENGTH) {
          toast.error(`Group name must be 1–${MAX_GROUP_NAME_LENGTH} characters`);
          return;
        }
        updates = { ...updates, name: trimmed };
      }
      await localGroupStorage.updateGroup(id, updates);
      await reload();
      toast.success("Group updated");
    },
    [reload],
  );

  const deleteGroup = useCallback(
    async (id: string) => {
      await localGroupStorage.deleteGroup(id);
      await reload();
      toast.success("Group deleted");
    },
    [reload],
  );

  const addEndpointToGroup = useCallback(
    async (groupId: string, endpoint: Omit<SavedEndpoint, "id">) => {
      const group = groups.find((g) => g.id === groupId);
      if (!group) return;

      if (group.endpoints.length >= MAX_ENDPOINTS_PER_GROUP) {
        toast.error(`Maximum ${MAX_ENDPOINTS_PER_GROUP} endpoints per group`);
        return;
      }

      const newEndpoint: SavedEndpoint = { ...endpoint, id: generateId() };
      await localGroupStorage.updateGroup(groupId, {
        endpoints: [...group.endpoints, newEndpoint],
      });
      await reload();
      toast.success(`Saved to "${group.name}"`);
    },
    [groups, reload],
  );

  const removeEndpointFromGroup = useCallback(
    async (groupId: string, endpointId: string) => {
      const group = groups.find((g) => g.id === groupId);
      if (!group) return;

      await localGroupStorage.updateGroup(groupId, {
        endpoints: group.endpoints.filter((e) => e.id !== endpointId),
      });
      await reload();
      toast.success("Endpoint removed");
    },
    [groups, reload],
  );

  const updateEndpointInGroup = useCallback(
    async (groupId: string, endpointId: string, updates: Partial<SavedEndpoint>) => {
      const group = groups.find((g) => g.id === groupId);
      if (!group) return;

      await localGroupStorage.updateGroup(groupId, {
        endpoints: group.endpoints.map((e) =>
          e.id === endpointId ? { ...e, ...updates } : e,
        ),
      });
      await reload();
    },
    [groups, reload],
  );

  const getGroup = useCallback(
    (id: string) => groups.find((g) => g.id === id),
    [groups],
  );

  return {
    groups,
    isLoading,
    createGroup,
    updateGroup,
    deleteGroup,
    addEndpointToGroup,
    removeEndpointFromGroup,
    updateEndpointInGroup,
    getGroup,
    reload,
  };
}
