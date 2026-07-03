"use client";

import { ArrowRight, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type EndpointCardProps = {
  keyword: string;
  label: string;
  description: string;
  icon?: LucideIcon;
  aiPowered?: boolean;
  onSelect?: (keyword: string) => void;
};

export function EndpointCard({
  keyword,
  label,
  description,
  icon: Icon,
  aiPowered,
  onSelect,
}: EndpointCardProps) {
  return (
    <Card className="group flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-1 flex-col gap-0">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{label}</CardTitle>
              {aiPowered && (
                <span className="rounded-full bg-ai/10 px-2 py-0.5 text-[10px] font-medium text-ai">
                  AI
                </span>
              )}
            </div>
            <code className="text-xs text-muted-foreground">/{keyword}</code>
          </div>
        </div>
        <CardDescription className="mt-3 flex-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="group-hover:bg-muted"
          onClick={() => onSelect?.(keyword)}
        >
          Try endpoint
          <ArrowRight className="size-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
