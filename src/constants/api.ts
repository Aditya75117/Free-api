const PRODUCTION_API_BASE_URL = "https://free-api-backend.vercel.app";
const LOCAL_API_BASE_URL = "http://localhost:4000";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "production"
    ? PRODUCTION_API_BASE_URL
    : LOCAL_API_BASE_URL);

export const DEFAULT_QUERY_PARAMS = {
  count: "10",
} as const;
