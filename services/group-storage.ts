import type { ApiGroup, GroupStorage } from "@/types/api-groups";

const STORAGE_KEY = "free-api:groups";

function readGroups(): ApiGroup[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeGroups(groups: ApiGroup[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
}

export const localGroupStorage: GroupStorage = {
  async getGroups() {
    return readGroups();
  },

  async saveGroup(group: ApiGroup) {
    const groups = readGroups();
    groups.push(group);
    writeGroups(groups);
  },

  async deleteGroup(id: string) {
    const groups = readGroups().filter((g) => g.id !== id);
    writeGroups(groups);
  },

  async updateGroup(id: string, updates: Partial<ApiGroup>) {
    const groups = readGroups().map((g) =>
      g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g,
    );
    writeGroups(groups);
  },
};

export function exportGroups(): string {
  return JSON.stringify(readGroups(), null, 2);
}

export function importGroups(json: string): ApiGroup[] {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) throw new Error("Invalid format");

    const existing = readGroups();
    const existingIds = new Set(existing.map((g) => g.id));
    const newGroups = parsed.filter(
      (g: ApiGroup) => g.id && g.name && !existingIds.has(g.id),
    );

    const merged = [...existing, ...newGroups];
    writeGroups(merged);
    return merged;
  } catch {
    throw new Error("Failed to import groups — invalid JSON format");
  }
}
