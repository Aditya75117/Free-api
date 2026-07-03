import type { QueryParameter } from "@/types/api";

export function buildApiUrl(
  baseUrl: string,
  keyword: string,
  params: QueryParameter[] = [],
): string {
  const trimmed = keyword.trim().toLowerCase().replace(/\s+/g, "-");
  if (!trimmed) return "";

  const url = new URL(`/${trimmed}`, baseUrl.replace(/\/$/, ""));

  params.forEach(({ key, value }) => {
    const paramKey = key.trim();
    const paramValue = value.trim();
    if (paramKey && paramValue) {
      url.searchParams.set(paramKey, paramValue);
    }
  });

  return url.toString();
}
