import axios, { isAxiosError } from "axios";

import { API_BASE_URL } from "@/constants/api";
import { buildApiUrl } from "@/utils/url";
import type { QueryParameter } from "@/types/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {
    Accept: "application/json",
  },
});

function extractErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: { message: string }[] } | undefined;
    const detail = data?.errors?.[0]?.message;
    if (detail) return detail;
    if (data?.message) return data.message;
    if (error.message) return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to fetch endpoint";
}

export async function fetchEndpoint(
  keyword: string,
  queryParameters: QueryParameter[] = [],
): Promise<unknown> {
  try {
    const url = buildApiUrl(API_BASE_URL, keyword, queryParameters);
    const { data } = await client.get(url.replace(API_BASE_URL, ""));
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export type SchemaResponse = {
  keyword: string;
  fields: string[];
  source: "local" | "ai";
  dynamic?: boolean;
  discovered?: boolean;
  message?: string;
};

export async function fetchSchema(keyword: string): Promise<SchemaResponse> {
  try {
    const { data } = await client.get<SchemaResponse>(`/schema/${encodeURIComponent(keyword)}`);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export { buildApiUrl };
