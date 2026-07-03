"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { CopyButton } from "@/components/copy-button";
import { ErrorCard } from "@/components/error-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

type JsonPreviewProps = {
  url: string;
  data: unknown | null;
  loading: boolean;
  error: string | null;
  filterSlot?: ReactNode;
};

export function JsonPreview({ url, data, loading, error, filterSlot }: JsonPreviewProps) {
  const jsonString = data ? JSON.stringify(data, null, 2) : "";

  function handleDownload() {
    if (!jsonString) {
      toast.error("No JSON to download");
      return;
    }

    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "response.json";
    anchor.click();
    URL.revokeObjectURL(href);
    toast.success("JSON downloaded");
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle>JSON Preview</CardTitle>
          <CardDescription className="mt-1 break-all">
            {url || "Generate an endpoint to preview the response"}
          </CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {filterSlot}
          <CopyButton value={url} label="Copy URL" />
          <CopyButton value={jsonString} label="Copy JSON" />
          <Button variant="outline" size="sm" onClick={handleDownload} disabled={!jsonString}>
            <Download className="size-3.5" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading && <LoadingSkeleton />}
        {error && !loading && <ErrorCard message={error} />}
        {!loading && !error && data !== null && (
          <div className="overflow-hidden rounded-lg border border-border">
            <MonacoEditor
              height="360px"
              language="json"
              theme="vs-dark"
              value={jsonString}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                scrollBeyondLastLine: false,
                wordWrap: "on",
              }}
            />
          </div>
        )}
        {!loading && !error && data === null && (
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Your JSON response will appear here
          </div>
        )}
      </CardContent>
    </Card>
  );
}
