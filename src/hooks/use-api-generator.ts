"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { API_BASE_URL } from "@/constants/api";
import { DEFAULT_QUERY_PARAMS } from "@/constants/api";
import { getPredefinedFields } from "@/constants/field-schemas";
import { getQueryParamDefaultValue } from "@/constants/query-params";
import { fetchEndpoint, fetchSchema } from "@/services/api";
import { activeQueryParameters, buildApiUrl } from "@/utils/url";
import {
  extractAvailableFields,
  extractListItemIds,
  filterResponseByFields,
  isAiResponse,
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

  selectedFieldsRef.current = selectedFields;
  availableFieldsRef.current = availableFields;

  const buildFinalParams = useCallback((): QueryParameter[] => {
    const params = queryParameters.filter((p) => p.key !== "fields");
    const currentSelected = selectedFieldsRef.current;
    const currentAvailable = availableFieldsRef.current;

    if (
      currentSelected.length > 0 &&
      currentAvailable.length > 0 &&
      currentSelected.length < currentAvailable.length
    ) {
      params.push({ key: "fields", value: currentSelected.join(",") });
    }

    return activeQueryParameters(params);
  }, [queryParameters]);

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
      const fieldsWereFiltered =
        currentSelected.length > 0 &&
        currentAvailable.length > 0 &&
        currentSelected.length < currentAvailable.length;

      const keys = extractAvailableFields(data);
      if (keys.length > 0 && !fieldsWereFiltered) {
        if (currentAvailable.length === 0) {
          setAvailableFields(keys);
          setSelectedFields(keys);
          if (isAiResponse(data)) {
            setAiFieldsDiscovered(true);
          }
        } else {
          setAvailableFields((prev) => mergeFieldLists(prev, keys));
          setSelectedFields((prev) => mergeFieldLists(prev, keys));
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
        if (schema.source === "local" && schema.fields.length > 0) {
          setAvailableFields(schema.fields);
          setSelectedFields(schema.fields);
        } else if (schema.source === "ai" && schema.discovered && schema.fields.length > 0) {
          setAvailableFields(schema.fields);
          setSelectedFields(schema.fields);
          setAiFieldsDiscovered(true);
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

  const currentUrl = useMemo(() => {
    if (!keyword.trim()) return generatedUrl;
    return buildApiUrl(API_BASE_URL, keyword, buildFinalParams(), itemId.trim() || undefined);
  }, [keyword, itemId, generatedUrl, buildFinalParams, selectedFields, availableFields]);

  const listUrl = useMemo(() => {
    if (!keyword.trim()) return "";
    return buildApiUrl(API_BASE_URL, keyword, buildFinalParams());
  }, [keyword, buildFinalParams, selectedFields, availableFields]);

  const detailUrl = useMemo(() => {
    if (!keyword.trim() || !itemId.trim()) return "";
    return buildApiUrl(API_BASE_URL, keyword, buildFinalParams(), itemId.trim());
  }, [keyword, itemId, buildFinalParams, selectedFields, availableFields]);

  const activeParams = useMemo(() => buildFinalParams(), [buildFinalParams]);

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

  const updateQueryParam = useCallback((index: number, field: "key" | "value", value: string) => {
    setQueryParameters((prev) =>
      prev.map((param, i) => (i === index ? { ...param, [field]: value } : param)),
    );
  }, []);

  const setQueryParamKey = useCallback((index: number, key: string) => {
    setQueryParameters((prev) =>
      prev.map((param, i) =>
        i === index ? { key, value: getQueryParamDefaultValue(key) } : param,
      ),
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
      setQueryParameters(params.length > 0 ? params : [...defaultParams]);
      setItemId(newItemId ?? "");
      applyKeywordChange(newKeyword);
    },
    [applyKeywordChange],
  );

  const syncFromList = useCallback((newKeyword: string, params: QueryParameter[]) => {
    setKeywordState(newKeyword);
    setQueryParameters(params.length > 0 ? params : [...defaultParams]);
    setItemId("");
    setGeneratedUrl("");
    setAiFieldsDiscovered(false);

    const trimmed = newKeyword.trim();
    const predefined = trimmed ? getPredefinedFields(trimmed) : null;
    if (predefined) {
      setSchemaSource("local");
      setAvailableFields(predefined);
      setSelectedFields(predefined);
      setSchemaLoading(false);
    }
  }, []);

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
    setSelectedFields,
    availableFields,
    schemaSource,
    schemaLoading,
    aiFieldsDiscovered,
    hasResponse,
    loadConfig,
    syncFromList,
  };
}
