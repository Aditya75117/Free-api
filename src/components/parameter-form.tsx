"use client";

import { useState } from "react";
import { CircleHelp, Plus, Trash2 } from "lucide-react";

import { QueryParamsDrawer } from "@/components/query-params-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  CUSTOM_PARAM_KEY,
  getQueryParamValuePlaceholder,
  isKnownQueryParam,
  QUERY_PARAM_DOCS,
} from "@/constants/query-params";
import type { QueryParameter } from "@/types/api";

type ParameterFormProps = {
  parameters: QueryParameter[];
  onUpdate: (index: number, field: "key" | "value", value: string) => void;
  onSetKey: (index: number, key: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const VALUE_OPTIONS: Record<string, string[]> = {
  order: ["asc", "desc"],
  pretty: ["true", "false"],
};

function ParamKeyField({
  param,
  index,
  isCustom,
  onSelectCustom,
  onSelectKnown,
  onSetKey,
  onUpdate,
}: {
  param: QueryParameter;
  index: number;
  isCustom: boolean;
  onSelectCustom: () => void;
  onSelectKnown: () => void;
  onSetKey: (index: number, key: string) => void;
  onUpdate: (index: number, field: "key" | "value", value: string) => void;
}) {
  const selectValue = isCustom ? CUSTOM_PARAM_KEY : param.key;

  function handleSelectChange(value: string) {
    if (value === CUSTOM_PARAM_KEY) {
      onSelectCustom();
      onUpdate(index, "key", "");
      onUpdate(index, "value", "");
      return;
    }

    onSelectKnown();
    onSetKey(index, value);
  }

  if (isCustom) {
    return (
      <div className="space-y-2">
        <Select
          value={CUSTOM_PARAM_KEY}
          onChange={(e) => handleSelectChange(e.target.value)}
          aria-label="Parameter key"
        >
          <option value="" disabled>
            Select key
          </option>
          {QUERY_PARAM_DOCS.map((doc) => (
            <option key={doc.name} value={doc.name}>
              {doc.name}
            </option>
          ))}
          <option value={CUSTOM_PARAM_KEY}>Custom key...</option>
        </Select>
        <Input
          placeholder="Custom key"
          value={param.key}
          onChange={(e) => onUpdate(index, "key", e.target.value)}
          aria-label="Custom parameter key"
        />
      </div>
    );
  }

  return (
    <Select
      value={selectValue}
      onChange={(e) => handleSelectChange(e.target.value)}
      aria-label="Parameter key"
    >
      <option value="" disabled>
        Select key
      </option>
      {QUERY_PARAM_DOCS.map((doc) => (
        <option key={doc.name} value={doc.name}>
          {doc.name}
        </option>
      ))}
      <option value={CUSTOM_PARAM_KEY}>Custom key...</option>
    </Select>
  );
}

function ParamValueField({
  param,
  index,
  onUpdate,
}: {
  param: QueryParameter;
  index: number;
  onUpdate: (index: number, field: "key" | "value", value: string) => void;
}) {
  const placeholder = getQueryParamValuePlaceholder(param.key);
  const presetValues = VALUE_OPTIONS[param.key];

  if (presetValues) {
    return (
      <Select
        value={param.value}
        onChange={(e) => onUpdate(index, "value", e.target.value)}
        aria-label="Parameter value"
        title={placeholder}
      >
        <option value="">{placeholder}</option>
        {presetValues.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    );
  }

  return (
    <Input
      placeholder={placeholder}
      value={param.value}
      onChange={(e) => onUpdate(index, "value", e.target.value)}
      aria-label="Parameter value"
      title={placeholder}
    />
  );
}

export function ParameterForm({
  parameters,
  onUpdate,
  onSetKey,
  onAdd,
  onRemove,
}: ParameterFormProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customRows, setCustomRows] = useState<Set<number>>(new Set());

  function handleRemove(index: number) {
    setCustomRows((prev) => {
      const next = new Set<number>();
      prev.forEach((i) => {
        if (i < index) next.add(i);
        if (i > index) next.add(i - 1);
      });
      return next;
    });
    onRemove(index);
  }

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-medium">Query Parameters</h3>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => setDrawerOpen(true)}
              aria-label="View allowed query parameters"
              className="text-muted-foreground hover:text-foreground"
            >
              <CircleHelp className="size-3.5" />
            </Button>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onAdd}>
            <Plus className="size-3.5" />
            Add
          </Button>
        </div>
        {parameters.map((param, index) => (
          <div key={index} className="flex gap-2">
            <div className="min-w-0 flex-1">
              <ParamKeyField
                param={param}
                index={index}
                isCustom={customRows.has(index) || (param.key !== "" && !isKnownQueryParam(param.key))}
                onSelectCustom={() =>
                  setCustomRows((prev) => new Set(prev).add(index))
                }
                onSelectKnown={() =>
                  setCustomRows((prev) => {
                    const next = new Set(prev);
                    next.delete(index);
                    return next;
                  })
                }
                onSetKey={onSetKey}
                onUpdate={onUpdate}
              />
            </div>
            <div className="min-w-0 flex-1">
              <ParamValueField param={param} index={index} onUpdate={onUpdate} />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(index)}
              disabled={parameters.length <= 1}
              aria-label="Remove parameter"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <QueryParamsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
