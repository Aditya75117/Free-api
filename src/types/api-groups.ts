import type { QueryParameter } from "@/types/api";

export type SavedEndpoint = {
  id: string;
  keyword: string;
  label?: string;
  queryParameters: QueryParameter[];
};

export type ApiGroup = {
  id: string;
  name: string;
  description?: string;
  endpoints: SavedEndpoint[];
  createdAt: string;
  updatedAt: string;
};

export interface GroupStorage {
  getGroups(): Promise<ApiGroup[]>;
  saveGroup(group: ApiGroup): Promise<void>;
  deleteGroup(id: string): Promise<void>;
  updateGroup(id: string, group: Partial<ApiGroup>): Promise<void>;
}

export const MAX_GROUPS = 20;
export const MAX_ENDPOINTS_PER_GROUP = 30;
export const MAX_GROUP_NAME_LENGTH = 50;
