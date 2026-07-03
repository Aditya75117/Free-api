"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResponseFieldsFilterProps = {
  availableFields: string[];
  selectedFields: string[];
  onSelectionChange: (fields: string[]) => void;
};

export function ResponseFieldsFilter({
  availableFields,
  selectedFields,
  onSelectionChange,
}: ResponseFieldsFilterProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (availableFields.length === 0) return null;

  const allSelected = selectedFields.length === availableFields.length;
  const noneSelected = selectedFields.length === 0;
  const label = allSelected
    ? "All fields"
    : noneSelected
      ? "No fields"
      : `${selectedFields.length} of ${availableFields.length} fields`;

  function toggleField(field: string) {
    if (selectedFields.includes(field)) {
      onSelectionChange(selectedFields.filter((f) => f !== field));
    } else {
      onSelectionChange([...selectedFields, field]);
    }
  }

  function selectAll() {
    onSelectionChange([...availableFields]);
  }

  function clearAll() {
    onSelectionChange([]);
  }

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="min-w-[140px] justify-between gap-1.5 text-xs"
      >
        <span className="truncate">{label}</span>
        <ChevronsUpDown className="size-3 shrink-0 opacity-50" />
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-border bg-popover p-1 shadow-md">
          <div className="flex items-center justify-between border-b border-border px-2 pb-1.5 mb-1">
            <span className="text-xs font-medium text-muted-foreground">Response Fields</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={selectAll}
                className="rounded px-1.5 py-0.5 text-[10px] font-medium text-primary hover:bg-muted"
              >
                All
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="rounded px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground hover:bg-muted"
              >
                <X className="size-3" />
              </button>
            </div>
          </div>

          <div className="max-h-52 overflow-y-auto">
            {availableFields.map((field) => {
              const isSelected = selectedFields.includes(field);
              return (
                <button
                  key={field}
                  type="button"
                  onClick={() => toggleField(field)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-muted",
                    isSelected && "font-medium",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30",
                    )}
                  >
                    {isSelected && <Check className="size-3" />}
                  </span>
                  <code className="truncate">{field}</code>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
