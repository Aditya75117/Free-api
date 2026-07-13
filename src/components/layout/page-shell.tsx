import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  width?: "default" | "narrow";
  className?: string;
};

export function PageShell({ children, width = "default", className }: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-4 py-16 sm:px-6",
        width === "narrow" ? "max-w-4xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
