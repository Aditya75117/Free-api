import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  as?: "h2" | "h3" | "h4";
  id?: string;
  children: ReactNode;
  className?: string;
};

export function SectionHeading({
  as: Tag = "h2",
  id,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "tracking-tight",
        Tag === "h2" && "text-2xl font-bold",
        Tag === "h3" && "font-heading text-base font-medium",
        Tag === "h4" && "font-heading text-sm font-medium",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
