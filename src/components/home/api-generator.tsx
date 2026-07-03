"use client";

import { Plus, Trash2, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/constants/api";
import { useApiGenerator } from "@/hooks/use-api-generator";

type ApiGeneratorProps = {
  onGenerate?: ReturnType<typeof useApiGenerator>;
};

export function ApiGenerator({ onGenerate }: ApiGeneratorProps) {
  const internal = useApiGenerator();
  const api = onGenerate ?? internal;

  return (
    <Card id="generator" className="border-primary/20 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="size-5 text-primary" />
          API Generator
        </CardTitle>
        <CardDescription>
          Enter a keyword to build your endpoint. Base URL:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{API_BASE_URL}</code>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="e.g. users, posts, products..."
            value={api.keyword}
            onChange={(e) => api.setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && api.generate()}
            className="flex-1"
          />
          <Button onClick={api.generate} disabled={api.loading} className="shrink-0">
            {api.loading ? "Generating..." : "Generate"}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Query Parameters</p>
          {api.queryParameters.map((param, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="key"
                value={param.key}
                onChange={(e) => api.updateQueryParam(index, "key", e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="value"
                value={param.value}
                onChange={(e) => api.updateQueryParam(index, "value", e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => api.removeQueryParam(index)}
                disabled={api.queryParameters.length <= 1}
                aria-label="Remove parameter"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={api.addQueryParam}>
            <Plus className="size-3.5" />
            Add parameter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
