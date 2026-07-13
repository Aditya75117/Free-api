import type { QueryParameter } from "@/types/api";

export function normalizeKeyword(keyword: string): string {
  return keyword.trim().toLowerCase().replace(/\s+/g, "-");
}

/** Query parameters with both a non-empty key and value. */
export function activeQueryParameters(params: QueryParameter[] = []): QueryParameter[] {
  return params.filter(({ key, value }) => key.trim() && value.trim());
}

export function buildApiUrl(
  baseUrl: string,
  keyword: string,
  params: QueryParameter[] = [],
  itemId?: string,
): string {
  const trimmed = normalizeKeyword(keyword);
  if (!trimmed) return "";

  const pathSegment = itemId?.trim()
    ? `/${trimmed}/${encodeURIComponent(itemId.trim())}`
    : `/${trimmed}`;

  const url = new URL(pathSegment, baseUrl.replace(/\/$/, ""));

  activeQueryParameters(params).forEach(({ key, value }) => {
    url.searchParams.set(key.trim(), value.trim());
  });

  return url.toString();
}
