export type QueryParamDoc = {
  name: string;
  type: string;
  description: string;
  default?: string;
  example: string;
  limits?: string;
  optional?: boolean;
  valueHint?: string;
};

export const QUERY_PARAM_DOCS: QueryParamDoc[] = [
  {
    name: "count",
    type: "number",
    description: "Number of records to generate before pagination.",
    default: "10",
    example: "10",
    limits: "1–100",
  },
  {
    name: "page",
    type: "number",
    description: "Page number for paginated results.",
    default: "1",
    example: "1",
    limits: "≥ 1",
  },
  {
    name: "limit",
    type: "number",
    description: "Items returned per page after filtering and sorting.",
    default: "10",
    example: "10",
    limits: "1–100",
  },
  {
    name: "fields",
    type: "string",
    description: "Comma-separated list of top-level fields to include in each item.",
    example: "id,firstName,email",
    valueHint: "comma-separated field names",
    optional: true,
  },
  {
    name: "sort",
    type: "string",
    description: "Field name to sort results by.",
    example: "createdAt",
    valueHint: "field name",
    optional: true,
  },
  {
    name: "order",
    type: "enum",
    description: "Sort direction. Used together with sort.",
    default: "asc",
    example: "desc",
    limits: "asc | desc",
  },
  {
    name: "search",
    type: "string",
    description: "Filter items where any string or number value contains this term.",
    example: "react",
    valueHint: "search term",
    optional: true,
  },
  {
    name: "seed",
    type: "string",
    description: "Seed for repeatable mock data across requests.",
    example: "my-test-seed",
    valueHint: "any string",
    optional: true,
  },
  {
    name: "delay",
    type: "number",
    description: "Artificial response delay in milliseconds.",
    example: "500",
    limits: "0–5000",
    optional: true,
  },
  {
    name: "pretty",
    type: "boolean",
    description: "Return pretty-printed JSON instead of compact JSON.",
    example: "true",
    optional: true,
  },
];

export const QUERY_PARAM_NAMES = QUERY_PARAM_DOCS.map((param) => param.name);

export const CUSTOM_PARAM_KEY = "__custom__";

export function getQueryParamDoc(name: string): QueryParamDoc | undefined {
  return QUERY_PARAM_DOCS.find((param) => param.name === name);
}

export function getQueryParamDefaultValue(name: string): string {
  const doc = getQueryParamDoc(name);
  return doc?.default ?? doc?.example ?? "";
}

export function isKnownQueryParam(name: string): boolean {
  return QUERY_PARAM_NAMES.includes(name);
}

/** Placeholder hint for the value field — expected type only. */
export function getQueryParamValuePlaceholder(key: string): string {
  if (!key.trim()) {
    return "Select a key first";
  }

  const doc = getQueryParamDoc(key);
  if (!doc) {
    return "Enter value";
  }

  if (doc.valueHint) {
    return `${doc.type} · ${doc.valueHint}`;
  }

  if (doc.limits) {
    return `${doc.type} · ${doc.limits}`;
  }

  return doc.type;
}
