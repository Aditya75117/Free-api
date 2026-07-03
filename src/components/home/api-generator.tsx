"use client";

import Link from "next/link";
import { ArrowRight, Wand2 } from "lucide-react";

import { ParameterForm } from "@/components/parameter-form";
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
    <Card id="generator" className="scroll-mt-20 border-primary/20 shadow-sm">
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
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="home-endpoint-keyword" className="text-sm font-medium">
            Endpoint
          </label>
          <div className="flex rounded-lg border border-input bg-background transition-[border-color,box-shadow] focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15">
            <span className="flex items-center border-r border-input px-3 text-sm text-muted-foreground">
              /
            </span>
            <Input
              id="home-endpoint-keyword"
              placeholder="users"
              value={api.keyword}
              onChange={(e) => api.setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && api.generate()}
              className="border-0 shadow-none focus-visible:border-transparent focus-visible:ring-0"
            />
          </div>
        </div>

        <ParameterForm
          parameters={api.queryParameters}
          onUpdate={api.updateQueryParam}
          onAdd={api.addQueryParam}
          onRemove={api.removeQueryParam}
        />

        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Need field filtering or saved groups?{" "}
            <Link href="/playground" className="text-primary hover:underline">
              Open Playground
              <ArrowRight className="ml-0.5 inline size-3" />
            </Link>
          </p>
          <Button
            onClick={api.generate}
            disabled={api.loading || !api.keyword.trim()}
            className="min-w-[120px]"
          >
            {api.loading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
