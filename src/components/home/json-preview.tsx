"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { CopyButton } from "@/components/copy-button";
import { ErrorCard } from "@/components/error-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  filterHint?: string;
  maxHeight?: number;
  compact?: boolean;
};

export function JsonPreview({
  url,
  data,
  loading,
  error,
  filterSlot,
  filterHint,
  maxHeight = 360,
  compact = false,
}: JsonPreviewProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const jsonString = data ? JSON.stringify(data, null, 2) : "";
  const editorTheme = mounted && resolvedTheme === "dark" ? "vs-dark" : "vs";
  const hasData = data !== null;

  useEffect(() => setMounted(true), []);

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

  const emptyHeight = Math.min(maxHeight, 192);

  return (
    <Card>
      <CardHeader className={compact ? "space-y-3 p-4" : "space-y-4"}>
        <CardTitle className={compact ? "text-sm" : undefined}>JSON Preview</CardTitle>

        <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5">
          <code className="block break-all font-mono text-xs text-muted-foreground">
            {url || "Generate an endpoint to preview the response"}
          </code>
        </div>

        {filterHint && (
          <p className="text-xs leading-relaxed text-muted-foreground">{filterHint}</p>
        )}

        <div
          className={`flex flex-wrap items-center gap-3 border-t border-border pt-4 ${
            filterSlot ? "justify-between" : "justify-end"
          }`}
        >
          {filterSlot && <div className="shrink-0">{filterSlot}</div>}
          <div className="flex flex-wrap items-center justify-end gap-2">
            <CopyButton value={url} label="Copy URL" />
            <CopyButton value={jsonString} label="Copy JSON" />
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={!jsonString}>
              <Download className="size-3.5" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && <LoadingSkeleton />}
        {error && !loading && <ErrorCard message={error} />}
        {!loading && !error && hasData && (
          <div className="overflow-hidden rounded-lg border border-border">
            <MonacoEditor
              height={`${maxHeight}px`}
              language="json"
              theme={editorTheme}
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
        {!loading && !error && !hasData && (
          <div
            className="flex items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground"
            style={{ height: `${emptyHeight}px` }}
          >
            Your JSON response will appear here
          </div>
        )}
      </CardContent>
    </Card>
  );
}
