import type { QueryParameter } from "@/types/api";
import { activeQueryParameters } from "@/utils/url";

export function getExplicitFieldsParam(
  params: QueryParameter[],
): QueryParameter | undefined {
  return params.find((param) => param.key === "fields" && param.value.trim());
}

/**
 * Builds the query params sent to the API.
 * Manual `fields` entries in the form take precedence over the Response Fields UI.
 */
export function buildEffectiveParams(
  queryParameters: QueryParameter[],
  selectedFields: string[],
  availableFields: string[],
): QueryParameter[] {
  const explicitFields = getExplicitFieldsParam(queryParameters);

  if (explicitFields) {
    const paramsWithoutFields = queryParameters.filter((param) => param.key !== "fields");
    return activeQueryParameters([...paramsWithoutFields, explicitFields]);
  }

  const paramsWithoutFields = queryParameters.filter((param) => param.key !== "fields");

  if (
    selectedFields.length > 0 &&
    availableFields.length > 0 &&
    selectedFields.length < availableFields.length
  ) {
    paramsWithoutFields.push({ key: "fields", value: selectedFields.join(",") });
  }

  return activeQueryParameters(paramsWithoutFields);
}

/** Keeps the query form `fields` row in sync with Response Fields UI selection. */
export function upsertFieldsQueryParam(
  params: QueryParameter[],
  selectedFields: string[],
  availableFields: string[],
): QueryParameter[] {
  const withoutFields = params.filter((param) => param.key !== "fields");

  if (
    selectedFields.length > 0 &&
    availableFields.length > 0 &&
    selectedFields.length < availableFields.length
  ) {
    return [...withoutFields, { key: "fields", value: selectedFields.join(",") }];
  }

  return withoutFields;
}
