import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  width?: "default" | "narrow";
  className?: string;
  padding?: "default" | "marketing";
};

export function PageShell({
  children,
  width = "default",
  className,
  padding = "default",
}: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6",
        width === "narrow" ? "max-w-4xl" : "max-w-6xl",
        padding === "marketing" ? "py-16" : "py-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
