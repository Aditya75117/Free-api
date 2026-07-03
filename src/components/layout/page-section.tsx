import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageSectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  id?: string;
};

export function PageSection({
  title,
  description,
  children,
  className,
  bordered = true,
  id,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(bordered && "border-b border-border", className)}
    >
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-16 sm:px-6">
        {(title || description) && (
          <div>
            {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
            {description && <p className="mt-2 text-muted-foreground">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
