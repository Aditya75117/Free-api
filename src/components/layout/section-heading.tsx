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
        "font-heading font-medium tracking-tight",
        Tag === "h2" && "text-2xl",
        Tag === "h3" && "text-base",
        Tag === "h4" && "text-sm",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
