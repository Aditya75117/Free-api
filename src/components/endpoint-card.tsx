import Link from "next/link";
import {
  BookOpen,
  FileText,
  Film,
  MessageSquare,
  ShoppingBag,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  "file-text": FileText,
  "shopping-bag": ShoppingBag,
  "book-open": BookOpen,
  film: Film,
  "message-square": MessageSquare,
  dog: Users,
  globe: BookOpen,
  receipt: FileText,
};

type EndpointCardProps = {
  keyword: string;
  label: string;
  description: string;
  icon?: string;
  aiPowered?: boolean;
  exampleHref?: string;
  playgroundHref?: string;
};

export function EndpointCard({
  keyword,
  label,
  description,
  icon,
  aiPowered,
  exampleHref,
  playgroundHref,
}: EndpointCardProps) {
  const Icon = icon ? ICON_MAP[icon] : undefined;

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
              {exampleHref ? (
                <Link href={exampleHref}>
                  <CardTitle className="text-base transition-colors hover:text-primary">
                    {label}
                  </CardTitle>
                </Link>
              ) : (
                <CardTitle className="text-base">{label}</CardTitle>
              )}
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
      <CardContent className="flex flex-wrap gap-2 pt-0">
        {exampleHref && (
          <Link
            href={exampleHref}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            View example
            <ArrowRight className="size-3.5" />
          </Link>
        )}
        {playgroundHref && (
          <Link
            href={playgroundHref}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "group-hover:bg-muted")}
          >
            Try endpoint
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
