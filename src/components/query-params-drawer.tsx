"use client";

import { QUERY_PARAM_DOCS } from "@/constants/query-params";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type QueryParamsDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QueryParamsDrawer({ open, onOpenChange }: QueryParamsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" aria-labelledby="query-params-title">
        <SheetHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1.5">
              <SheetTitle id="query-params-title">Query Parameters</SheetTitle>
              <SheetDescription>
                Supported URL parameters for{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">GET /:keyword</code>.
                Unknown keys are ignored by the API.
              </SheetDescription>
            </div>
            <SheetClose onClick={() => onOpenChange(false)} />
          </div>
        </SheetHeader>

        <SheetBody className="space-y-3">
          {QUERY_PARAM_DOCS.map((param) => (
            <article
              key={param.name}
              className="rounded-lg border border-border p-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <code className="text-sm font-semibold">{param.name}</code>
                  <Badge variant="outline" className="text-[10px] font-normal">
                    {param.type}
                  </Badge>
                  {param.optional && (
                    <Badge variant="outline" className="text-[10px] font-normal text-muted-foreground">
                      optional
                    </Badge>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {param.description}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {param.default && (
                    <span>
                      Default: <code className="text-foreground">{param.default}</code>
                    </span>
                  )}
                  {param.limits && (
                    <span>
                      Range: <code className="text-foreground">{param.limits}</code>
                    </span>
                  )}
                  <span>
                    Example:{" "}
                    <code className="text-foreground">
                      {param.name}={param.example}
                    </code>
                  </span>
                </div>
              </div>
            </article>
          ))}

          <p className="pb-2 text-xs text-muted-foreground">
            Tip: combine parameters — e.g.{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              ?count=20&fields=id,email&page=2&limit=5
            </code>
          </p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
