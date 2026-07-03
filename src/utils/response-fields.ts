/**
 * Extracts sorted unique top-level keys from `data` items in an API response.
 * Handles varying keys across items (e.g. AI responses).
 */
export function extractDataKeys(response: unknown): string[] {
  if (!response || typeof response !== "object") return [];

  const res = response as Record<string, unknown>;
  const data = res.data;

  if (!Array.isArray(data) || data.length === 0) return [];

  const keySet = new Set<string>();
  for (const item of data) {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      for (const key of Object.keys(item as Record<string, unknown>)) {
        keySet.add(key);
      }
    }
  }

  return Array.from(keySet).sort();
}

/**
 * Returns a new response with each `data` item filtered to only include
 * the selected top-level keys. The response envelope is preserved.
 */
export function filterResponseByFields(
  response: unknown,
  selectedFields: string[],
): unknown {
  if (!response || typeof response !== "object") return response;

  const res = response as Record<string, unknown>;
  const data = res.data;

  if (!Array.isArray(data) || data.length === 0) return response;

  const fieldSet = new Set(selectedFields);
  const filteredData = data.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return item;

    const filtered: Record<string, unknown> = {};
    for (const key of Object.keys(item as Record<string, unknown>)) {
      if (fieldSet.has(key)) {
        filtered[key] = (item as Record<string, unknown>)[key];
      }
    }
    return filtered;
  });

  return { ...res, data: filteredData };
}
