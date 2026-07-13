"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResponseFieldsFilterProps = {
  availableFields: string[];
  selectedFields: string[];
  onSelectionChange: (fields: string[]) => void;
  variant?: "compact" | "panel";
  loading?: boolean;
  aiFieldsPending?: boolean;
};

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
};

export function ResponseFieldsFilter({
  availableFields,
  selectedFields,
  onSelectionChange,
  variant = "compact",
  loading = false,
  aiFieldsPending = false,
}: ResponseFieldsFilterProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<DropdownPosition | null>(null);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const dropdownWidth = Math.max(rect.width, 336);
    const viewportPadding = 8;

    let left = rect.left;
    left = Math.max(viewportPadding, Math.min(left, window.innerWidth - dropdownWidth - viewportPadding));

    setPosition({
      top: rect.bottom + 4,
      left,
      width: dropdownWidth,
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    updatePosition();

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    function handleReposition() {
      updatePosition();
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open, updatePosition]);

  const allSelected =
    availableFields.length > 0 && selectedFields.length === availableFields.length;
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

  if (variant === "panel") {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium">Response Fields</h3>
            <p className="text-xs text-muted-foreground">
              Optional — pick fields to include in the response
            </p>
          </div>
          {availableFields.length > 0 && !loading && (
            <div className="flex shrink-0 gap-1.5">
              <Button type="button" variant="outline" size="sm" onClick={selectAll}>
                All
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearAll}
                disabled={noneSelected}
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        <div className="flex h-36 flex-col rounded-lg border border-input bg-background p-3">
          {loading ? (
            <div className="flex flex-1 items-start text-left text-xs text-muted-foreground animate-pulse">
              Loading available fields...
            </div>
          ) : aiFieldsPending ? (
            <p className="text-left text-xs leading-relaxed text-muted-foreground">
              AI keywords have dynamic fields — generate once to discover available fields.
            </p>
          ) : availableFields.length > 0 ? (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="flex flex-wrap gap-1.5">
                  {availableFields.map((field) => {
                    const isSelected = selectedFields.includes(field);
                    return (
                      <button
                        key={field}
                        type="button"
                        onClick={() => toggleField(field)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors",
                          isSelected
                            ? "border-primary/40 bg-primary/10 font-medium text-foreground"
                            : "border-border bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                        aria-pressed={isSelected}
                      >
                        {isSelected && <Check className="size-3 shrink-0 text-primary" />}
                        <code>{field}</code>
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="mt-2 shrink-0 text-xs text-muted-foreground">
                {allSelected
                  ? `All ${availableFields.length} fields selected`
                  : noneSelected
                    ? "No fields selected — response will be empty"
                    : `${selectedFields.length} of ${availableFields.length} fields selected`}
                {!allSelected && selectedFields.length > 0 && (
                  <>
                    {" "}
                    · sent as <code className="rounded bg-muted px-1">fields</code> query param
                  </>
                )}
              </p>
            </>
          ) : (
            <p className="text-left text-xs leading-relaxed text-muted-foreground">
              Generate once to load available fields for this keyword.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (availableFields.length === 0) return null;

  const dropdown =
    open && position && isMounted
      ? createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: position.width,
              zIndex: 9999,
            }}
            className="rounded-lg border border-border bg-popover p-1 shadow-md"
          >
            <div className="mb-1 flex items-center justify-between border-b border-border px-2 pb-1.5">
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
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div ref={triggerRef} className="inline-block">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen((prev) => !prev)}
          className="min-w-[210px] justify-between gap-1.5 text-xs"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className="truncate">{label}</span>
          <ChevronsUpDown className="size-3 shrink-0 opacity-50" />
        </Button>
      </div>
      {dropdown}
    </>
  );
}
