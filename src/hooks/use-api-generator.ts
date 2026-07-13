"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { API_BASE_URL } from "@/constants/api";
import { DEFAULT_QUERY_PARAMS } from "@/constants/api";
import { getPredefinedFields } from "@/constants/field-schemas";
import { getQueryParamDefaultValue } from "@/constants/query-params";
import { fetchEndpoint, fetchSchema } from "@/services/api";
import {
  buildEffectiveParams,
  getExplicitFieldsParam,
  upsertFieldsQueryParam,
} from "@/utils/build-effective-params";
import { activeQueryParameters, buildApiUrl } from "@/utils/url";
import {
  extractAvailableFields,
  extractListItemIds,
  filterResponseByFields,
  isAiResponse,
  parseFieldList,
} from "@/utils/response-fields";
import type { QueryParameter } from "@/types/api";

const defaultParams: QueryParameter[] = Object.entries(DEFAULT_QUERY_PARAMS).map(
  ([key, value]) => ({ key, value }),
);

type GenerateVariables = {
  keyword: string;
  params: QueryParameter[];
  itemId?: string;
};

function mergeFieldLists(existing: string[], incoming: string[]): string[] {
  return Array.from(new Set([...existing, ...incoming])).sort();
}

function resolveInitialFieldState(initialKeyword: string) {
  const trimmed = initialKeyword.trim();
  const predefined = trimmed ? getPredefinedFields(trimmed) : null;
  return {
    availableFields: predefined ?? [],
    selectedFields: predefined ?? [],
    schemaSource: predefined ? ("local" as const) : null,
  };
}

export function useApiGenerator(initialKeyword = "") {
  const initialFields = resolveInitialFieldState(initialKeyword);

  const [keyword, setKeywordState] = useState(initialKeyword);
  const [itemId, setItemId] = useState("");
  const [queryParameters, setQueryParameters] =
    useState<QueryParameter[]>(defaultParams);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const [selectedFields, setSelectedFields] = useState<string[]>(initialFields.selectedFields);
  const [availableFields, setAvailableFields] = useState<string[]>(initialFields.availableFields);
  const [schemaSource, setSchemaSource] = useState<"local" | "ai" | null>(
    initialFields.schemaSource,
  );
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [aiFieldsDiscovered, setAiFieldsDiscovered] = useState(false);

  const schemaAbortRef = useRef<AbortController | null>(null);
  const selectedFieldsRef = useRef(selectedFields);
  const availableFieldsRef = useRef(availableFields);
  const queryParametersRef = useRef(queryParameters);

  selectedFieldsRef.current = selectedFields;
  availableFieldsRef.current = availableFields;
  queryParametersRef.current = queryParameters;

  const applyFieldsFromQueryValue = useCallback((value: string) => {
    const parsed = parseFieldList(value);
    if (parsed.length === 0) return;

    setAvailableFields((prev) => mergeFieldLists(prev, parsed));
    setSelectedFields(parsed);
  }, []);

  const buildFinalParams = useCallback((): QueryParameter[] => {
    return buildEffectiveParams(
      queryParametersRef.current,
      selectedFieldsRef.current,
      availableFieldsRef.current,
    );
  }, []);

  const mutation = useMutation({
    mutationFn: ({ keyword: requestKeyword, params, itemId: requestItemId }: GenerateVariables) =>
      fetchEndpoint(requestKeyword, params, requestItemId),
    onMutate: (variables) => {
      const url = buildApiUrl(
        API_BASE_URL,
        variables.keyword,
        variables.params,
        variables.itemId,
      );
      setGeneratedUrl(url);
    },
    onSuccess: (data) => {
      const currentSelected = selectedFieldsRef.current;
      const currentAvailable = availableFieldsRef.current;
      const explicitFields = getExplicitFieldsParam(queryParametersRef.current);
      const fieldsWereFiltered =
        currentSelected.length > 0 &&
        currentAvailable.length > 0 &&
        currentSelected.length < currentAvailable.length;

      const keys = extractAvailableFields(data);
      if (keys.length > 0 && !fieldsWereFiltered && !explicitFields) {
        if (currentAvailable.length === 0) {
          setAvailableFields(keys);
          setSelectedFields(keys);
          if (isAiResponse(data)) {
            setAiFieldsDiscovered(true);
          }
        } else {
          const merged = mergeFieldLists(currentAvailable, keys);
          const sameAvailable =
            merged.length === currentAvailable.length &&
            merged.every((field, index) => field === currentAvailable[index]);
          if (!sameAvailable) {
            setAvailableFields(merged);
          }
          setSelectedFields((prev) => {
            const next = mergeFieldLists(prev, keys);
            const same =
              next.length === prev.length && next.every((field, index) => field === prev[index]);
            return same ? prev : next;
          });
        }
      }

      toast.success("Response received");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to fetch endpoint");
    },
  });

  const resetMutation = mutation.reset;

  const applyKeywordChange = useCallback(
    (newKeyword: string) => {
      const trimmed = newKeyword.trim();
      const predefined = trimmed ? getPredefinedFields(trimmed) : null;

      resetMutation();
      setKeywordState(newKeyword);
      setItemId("");
      setGeneratedUrl("");
      setAiFieldsDiscovered(false);

      if (predefined) {
        setSchemaSource("local");
        setAvailableFields(predefined);
        setSelectedFields(predefined);
        setSchemaLoading(false);
      } else {
        setSchemaSource(null);
        setAvailableFields([]);
        setSelectedFields([]);
      }
    },
    [resetMutation],
  );

  const setKeywordInput = useCallback((newKeyword: string) => {
    const trimmed = newKeyword.trim();
    const predefined = trimmed ? getPredefinedFields(trimmed) : null;

    setKeywordState(newKeyword);

    if (predefined) {
      setSchemaSource("local");
      setAvailableFields(predefined);
      setSelectedFields(predefined);
      setSchemaLoading(false);
    } else {
      setSchemaSource(null);
      setAvailableFields([]);
      setSelectedFields([]);
    }
  }, []);

  // Fetch schema for non-predefined keywords (AI / custom) — debounced
  useEffect(() => {
    const trimmed = keyword.trim();
    if (!trimmed || getPredefinedFields(trimmed)) {
      return;
    }

    setSchemaLoading(true);

    const timeout = setTimeout(async () => {
      schemaAbortRef.current?.abort();
      const controller = new AbortController();
      schemaAbortRef.current = controller;

      try {
        const schema = await fetchSchema(trimmed);
        if (controller.signal.aborted) return;
        setSchemaSource(schema.source);

        const explicitFields = getExplicitFieldsParam(queryParametersRef.current);
        const explicitFieldList = explicitFields ? parseFieldList(explicitFields.value) : [];

        if (schema.source === "local" && schema.fields.length > 0) {
          if (explicitFieldList.length > 0) {
            setAvailableFields(mergeFieldLists(schema.fields, explicitFieldList));
            setSelectedFields(explicitFieldList);
          } else {
            setAvailableFields(schema.fields);
            setSelectedFields(schema.fields);
          }
        } else if (schema.source === "ai" && schema.discovered && schema.fields.length > 0) {
          if (explicitFieldList.length > 0) {
            setAvailableFields(mergeFieldLists(schema.fields, explicitFieldList));
            setSelectedFields(explicitFieldList);
          } else {
            setAvailableFields(schema.fields);
            setSelectedFields(schema.fields);
          }
          setAiFieldsDiscovered(true);
        } else if (explicitFieldList.length > 0) {
          setAvailableFields(explicitFieldList);
          setSelectedFields(explicitFieldList);
        } else {
          setAvailableFields([]);
          setSelectedFields([]);
        }
      } catch {
        if (controller.signal.aborted) return;
        setSchemaSource(null);
        setAvailableFields([]);
        setSelectedFields([]);
      } finally {
        if (!controller.signal.aborted) setSchemaLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      schemaAbortRef.current?.abort();
    };
  }, [keyword]);

  const rawResponse = mutation.data ?? null;

  const filteredResponse = useMemo(() => {
    if (!rawResponse || availableFields.length === 0) {
      return rawResponse;
    }
    if (selectedFields.length === availableFields.length) {
      return rawResponse;
    }
    return filterResponseByFields(rawResponse, selectedFields);
  }, [rawResponse, selectedFields, availableFields]);

  const activeParams = useMemo(
    () => buildEffectiveParams(queryParameters, selectedFields, availableFields),
    [queryParameters, selectedFields, availableFields],
  );

  const currentUrl = useMemo(() => {
    if (!keyword.trim()) return generatedUrl;
    return buildApiUrl(API_BASE_URL, keyword, activeParams, itemId.trim() || undefined);
  }, [keyword, itemId, generatedUrl, activeParams]);

  const listUrl = useMemo(() => {
    if (!keyword.trim()) return "";
    return buildApiUrl(API_BASE_URL, keyword, activeParams);
  }, [keyword, activeParams]);

  const detailUrl = useMemo(() => {
    if (!keyword.trim() || !itemId.trim()) return "";
    return buildApiUrl(API_BASE_URL, keyword, activeParams, itemId.trim());
  }, [keyword, itemId, activeParams]);

  const listItemIds = useMemo(() => extractListItemIds(rawResponse), [rawResponse]);

  const generateList = useCallback(() => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      toast.error("Enter a keyword to generate an endpoint");
      return;
    }
    mutation.mutate({
      keyword: trimmed,
      params: buildFinalParams(),
    });
  }, [keyword, mutation, buildFinalParams]);

  const generateDetail = useCallback(() => {
    const trimmed = keyword.trim();
    const id = itemId.trim();
    if (!trimmed) {
      toast.error("Enter a keyword to generate an endpoint");
      return;
    }
    if (!id) {
      toast.error("Select or enter an item id");
      return;
    }
    mutation.mutate({
      keyword: trimmed,
      params: buildFinalParams(),
      itemId: id,
    });
  }, [keyword, itemId, mutation, buildFinalParams]);

  const generate = generateList;

  const generateAsync = useCallback(async () => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      toast.error("Enter a keyword to generate an endpoint");
      return;
    }
    await mutation.mutateAsync({
      keyword: trimmed,
      params: buildFinalParams(),
    });
  }, [keyword, mutation, buildFinalParams]);

  const generateDetailAsync = useCallback(async () => {
    const trimmed = keyword.trim();
    const id = itemId.trim();
    if (!trimmed) {
      toast.error("Enter a keyword to generate an endpoint");
      return;
    }
    if (!id) {
      toast.error("Select or enter an item id");
      return;
    }
    await mutation.mutateAsync({
      keyword: trimmed,
      params: buildFinalParams(),
      itemId: id,
    });
  }, [keyword, itemId, mutation, buildFinalParams]);

  const updateQueryParam = useCallback(
    (index: number, field: "key" | "value", value: string) => {
      setQueryParameters((prev) => {
        const next = prev.map((param, i) => (i === index ? { ...param, [field]: value } : param));
        const updated = next[index];

        if (updated?.key === "fields") {
          if (field === "value") {
            applyFieldsFromQueryValue(value);
          } else if (field === "key" && updated.value.trim()) {
            applyFieldsFromQueryValue(updated.value);
          }
        }

        return next;
      });
    },
    [applyFieldsFromQueryValue],
  );

  const setQueryParamKey = useCallback(
    (index: number, key: string) => {
      setQueryParameters((prev) => {
        const next = prev.map((param, i) =>
          i === index ? { key, value: getQueryParamDefaultValue(key) } : param,
        );
        const updated = next[index];

        if (key === "fields" && updated?.value.trim()) {
          applyFieldsFromQueryValue(updated.value);
        }

        return next;
      });
    },
    [applyFieldsFromQueryValue],
  );

  const setSelectedFieldsFromUi = useCallback((fields: string[]) => {
    setSelectedFields(fields);
    setQueryParameters((prev) =>
      upsertFieldsQueryParam(prev, fields, availableFieldsRef.current),
    );
  }, []);

  const addQueryParam = useCallback(() => {
    setQueryParameters((prev) => [...prev, { key: "", value: "" }]);
  }, []);

  const removeQueryParam = useCallback((index: number) => {
    setQueryParameters((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const loadConfig = useCallback(
    (newKeyword: string, params: QueryParameter[], newItemId?: string) => {
      const resolvedParams = params.length > 0 ? params : [...defaultParams];
      applyKeywordChange(newKeyword);
      setQueryParameters(resolvedParams);
      setItemId(newItemId ?? "");

      const explicitFields = getExplicitFieldsParam(resolvedParams);
      if (explicitFields) {
        applyFieldsFromQueryValue(explicitFields.value);
      }
    },
    [applyKeywordChange, applyFieldsFromQueryValue],
  );

  const syncFromList = useCallback((newKeyword: string, params: QueryParameter[]) => {
    setKeywordState(newKeyword);
    setQueryParameters(params.length > 0 ? params : [...defaultParams]);
    setItemId("");
    setGeneratedUrl("");
    setAiFieldsDiscovered(false);

    const trimmed = newKeyword.trim();
    const predefined = trimmed ? getPredefinedFields(trimmed) : null;
    const explicitFields = getExplicitFieldsParam(params);

    if (explicitFields) {
      applyFieldsFromQueryValue(explicitFields.value);
      if (predefined) {
        setSchemaSource("local");
        setAvailableFields((prev) => mergeFieldLists(predefined, prev));
        setSchemaLoading(false);
      }
      return;
    }

    if (predefined) {
      setSchemaSource("local");
      setAvailableFields(predefined);
      setSelectedFields(predefined);
      setSchemaLoading(false);
    }
  }, [applyFieldsFromQueryValue]);

  const hasResponse = rawResponse !== null;
  const isPreviewFiltered =
    hasResponse &&
    availableFields.length > 0 &&
    selectedFields.length > 0 &&
    selectedFields.length < availableFields.length;

  return {
    keyword,
    itemId,
    setItemId,
    listItemIds,
    setKeyword: applyKeywordChange,
    setKeywordInput,
    generatedUrl: currentUrl,
    listUrl,
    detailUrl,
    activeParams,
    response: rawResponse,
    filteredResponse,
    isPreviewFiltered,
    loading: mutation.isPending,
    error: mutation.error?.message ?? null,
    queryParameters,
    updateQueryParam,
    setQueryParamKey,
    addQueryParam,
    removeQueryParam,
    generate,
    generateList,
    generateDetail,
    generateAsync,
    generateDetailAsync,
    reset: mutation.reset,
    selectedFields,
    setSelectedFields: setSelectedFieldsFromUi,
    availableFields,
    schemaSource,
    schemaLoading,
    aiFieldsDiscovered,
    hasResponse,
    loadConfig,
    syncFromList,
  };
}
