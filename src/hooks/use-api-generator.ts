"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { API_BASE_URL } from "@/constants/api";
import { DEFAULT_QUERY_PARAMS } from "@/constants/api";
import { fetchEndpoint, fetchSchema } from "@/services/api";
import { buildApiUrl } from "@/utils/url";
import {
  extractAvailableFields,
  filterResponseByFields,
  isAiResponse,
} from "@/utils/response-fields";
import type { QueryParameter } from "@/types/api";

const defaultParams: QueryParameter[] = Object.entries(DEFAULT_QUERY_PARAMS).map(
  ([key, value]) => ({ key, value }),
);

function mergeFieldLists(existing: string[], incoming: string[]): string[] {
  return Array.from(new Set([...existing, ...incoming])).sort();
}

export function useApiGenerator(initialKeyword = "") {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [queryParameters, setQueryParameters] =
    useState<QueryParameter[]>(defaultParams);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [schemaSource, setSchemaSource] = useState<"local" | "ai" | null>(null);
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [aiFieldsDiscovered, setAiFieldsDiscovered] = useState(false);

  const schemaAbortRef = useRef<AbortController | null>(null);
  const selectedFieldsRef = useRef(selectedFields);
  const availableFieldsRef = useRef(availableFields);

  selectedFieldsRef.current = selectedFields;
  availableFieldsRef.current = availableFields;

  // Fetch schema when keyword changes (debounced)
  useEffect(() => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      setAvailableFields([]);
      setSelectedFields([]);
      setSchemaSource(null);
      setAiFieldsDiscovered(false);
      setSchemaLoading(false);
      return;
    }

    setSchemaLoading(true);
    setAiFieldsDiscovered(false);

    const timeout = setTimeout(async () => {
      schemaAbortRef.current?.abort();
      const controller = new AbortController();
      schemaAbortRef.current = controller;

      setSchemaLoading(true);
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

  const buildFinalParams = useCallback((): QueryParameter[] => {
    const params = [...queryParameters];
    const filtered = params.filter((p) => p.key !== "fields");
    const currentSelected = selectedFieldsRef.current;
    const currentAvailable = availableFieldsRef.current;

    if (
      currentSelected.length > 0 &&
      currentAvailable.length > 0 &&
      currentSelected.length < currentAvailable.length
    ) {
      filtered.push({ key: "fields", value: currentSelected.join(",") });
    }

    return filtered;
  }, [queryParameters]);

  const mutation = useMutation({
    mutationFn: () => {
      const finalParams = buildFinalParams();
      return fetchEndpoint(keyword, finalParams);
    },
    onMutate: () => {
      const finalParams = buildFinalParams();
      const url = buildApiUrl(API_BASE_URL, keyword, finalParams);
      setGeneratedUrl(url);
    },
    onSuccess: (data) => {
      const currentSelected = selectedFieldsRef.current;
      const currentAvailable = availableFieldsRef.current;
      const fieldsWereFiltered =
        currentSelected.length > 0 &&
        currentAvailable.length > 0 &&
        currentSelected.length < currentAvailable.length;

      if (isAiResponse(data) && !fieldsWereFiltered) {
        const keys = extractAvailableFields(data);
        if (keys.length > 0) {
          if (currentAvailable.length === 0) {
            setAvailableFields(keys);
            setSelectedFields(keys);
            setAiFieldsDiscovered(true);
          } else {
            setAvailableFields((prev) => mergeFieldLists(prev, keys));
            setSelectedFields((prev) => mergeFieldLists(prev, keys));
          }
        }
      }

      toast.success("Response received");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to fetch endpoint");
    },
  });

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
    return buildApiUrl(API_BASE_URL, keyword, buildFinalParams());
  }, [keyword, generatedUrl, buildFinalParams, selectedFields, availableFields]);

  const generate = useCallback(() => {
    if (!keyword.trim()) {
      toast.error("Enter a keyword to generate an endpoint");
      return;
    }
    mutation.mutate();
  }, [keyword, mutation]);

  const generateAsync = useCallback(async () => {
    if (!keyword.trim()) {
      toast.error("Enter a keyword to generate an endpoint");
      return;
    }
    await mutation.mutateAsync();
  }, [keyword, mutation]);

  const updateQueryParam = useCallback((index: number, field: "key" | "value", value: string) => {
    setQueryParameters((prev) =>
      prev.map((param, i) => (i === index ? { ...param, [field]: value } : param)),
    );
  }, []);

  const addQueryParam = useCallback(() => {
    setQueryParameters((prev) => [...prev, { key: "", value: "" }]);
  }, []);

  const removeQueryParam = useCallback((index: number) => {
    setQueryParameters((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const loadConfig = useCallback((newKeyword: string, params: QueryParameter[]) => {
    setKeyword(newKeyword);
    setQueryParameters(params.length > 0 ? params : [...defaultParams]);
    setGeneratedUrl("");
    setAvailableFields([]);
    setSelectedFields([]);
    setAiFieldsDiscovered(false);
    mutation.reset();
  }, [mutation]);

  const hasResponse = rawResponse !== null;
  const isPreviewFiltered =
    hasResponse &&
    availableFields.length > 0 &&
    selectedFields.length > 0 &&
    selectedFields.length < availableFields.length;

  return {
    keyword,
    setKeyword,
    generatedUrl: currentUrl,
    response: rawResponse,
    filteredResponse,
    isPreviewFiltered,
    loading: mutation.isPending,
    error: mutation.error?.message ?? null,
    queryParameters,
    updateQueryParam,
    addQueryParam,
    removeQueryParam,
    generate,
    generateAsync,
    reset: mutation.reset,
    selectedFields,
    setSelectedFields,
    availableFields,
    schemaSource,
    schemaLoading,
    aiFieldsDiscovered,
    hasResponse,
    loadConfig,
  };
}
