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
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
          )}
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{label}</CardTitle>
              {aiPowered && (
                <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-600 dark:text-violet-400">
                  AI
                </span>
              )}
            </div>
            <code className="text-xs text-muted-foreground">/{keyword}</code>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
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
