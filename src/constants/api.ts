export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export const DEFAULT_QUERY_PARAMS = {
  count: "10",
} as const;
