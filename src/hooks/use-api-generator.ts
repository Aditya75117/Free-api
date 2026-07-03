"use client";

import { useCallback, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { API_BASE_URL } from "@/constants/api";
import { DEFAULT_QUERY_PARAMS } from "@/constants/api";
import { fetchEndpoint } from "@/services/api";
import { buildApiUrl } from "@/utils/url";
import { extractDataKeys, filterResponseByFields } from "@/utils/response-fields";
import type { QueryParameter } from "@/types/api";

const defaultParams: QueryParameter[] = Object.entries(DEFAULT_QUERY_PARAMS).map(
  ([key, value]) => ({ key, value }),
);

export function useApiGenerator(initialKeyword = "") {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [queryParameters, setQueryParameters] =
    useState<QueryParameter[]>(defaultParams);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [availableFields, setAvailableFields] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: () => fetchEndpoint(keyword, queryParameters),
    onMutate: () => {
      const url = buildApiUrl(API_BASE_URL, keyword, queryParameters);
      setGeneratedUrl(url);
    },
    onSuccess: (data) => {
      const keys = extractDataKeys(data);
      setAvailableFields(keys);
      setSelectedFields(keys);
      toast.success("Response received");
    },
    onError: (error: Error) => {
      setAvailableFields([]);
      setSelectedFields([]);
      toast.error(error.message || "Failed to fetch endpoint");
    },
  });

  const filteredResponse = useMemo(() => {
    const raw = mutation.data ?? null;
    if (!raw || availableFields.length === 0 || selectedFields.length === 0) return raw;
    if (selectedFields.length === availableFields.length) return raw;
    return filterResponseByFields(raw, selectedFields);
  }, [mutation.data, selectedFields, availableFields]);

  const generate = useCallback(() => {
    if (!keyword.trim()) {
      toast.error("Enter a keyword to generate an endpoint");
      return;
    }
    mutation.mutate();
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
    mutation.reset();
  }, [mutation]);

  return {
    keyword,
    setKeyword,
    generatedUrl,
    response: mutation.data ?? null,
    filteredResponse,
    loading: mutation.isPending,
    error: mutation.error?.message ?? null,
    queryParameters,
    updateQueryParam,
    addQueryParam,
    removeQueryParam,
    generate,
    reset: mutation.reset,
    selectedFields,
    setSelectedFields,
    availableFields,
    loadConfig,
  };
}
