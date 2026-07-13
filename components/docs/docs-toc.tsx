"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DocsTocItem = {
  id: string;
  label: string;
};

type DocsTocProps = {
  items: DocsTocItem[];
  className?: string;
};

export function DocsToc({ items, className }: DocsTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sectionElements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -75% 0px", threshold: 0 },
    );

    for (const element of sectionElements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [items]);

  function handleClick(id: string) {
    setActiveId(id);
  }

  return (
    <Card className={cn("bg-muted/50 ring-foreground/10", className)}>
      <CardContent className="pt-4">
        <nav aria-label="Table of contents">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            On this page
          </p>
          <ul className="space-y-0.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    "block border-l-2 py-1.5 pl-3 text-sm transition-colors",
                    activeId === item.id
                      ? "border-foreground font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}
