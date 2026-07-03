"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { QueryParameter } from "@/types/api";

type ParameterFormProps = {
  parameters: QueryParameter[];
  onUpdate: (index: number, field: "key" | "value", value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

export function ParameterForm({
  parameters,
  onUpdate,
  onAdd,
  onRemove,
}: ParameterFormProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Query Parameters</h3>
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          <Plus className="size-3.5" />
          Add
        </Button>
      </div>
      {parameters.map((param, index) => (
        <div key={index} className="flex gap-2">
          <Input
            placeholder="key"
            value={param.key}
            onChange={(e) => onUpdate(index, "key", e.target.value)}
          />
          <Input
            placeholder="value"
            value={param.value}
            onChange={(e) => onUpdate(index, "value", e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
            disabled={parameters.length <= 1}
            aria-label="Remove parameter"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
