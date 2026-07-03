import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  className?: string;
  showCopy?: boolean;
};

export function CodeBlock({ code, className, showCopy = true }: CodeBlockProps) {
  return (
    <div className={cn("relative rounded-lg bg-muted", className)}>
      {showCopy && (
        <div className="absolute right-2 top-2">
          <CopyButton value={code} label="Copy" />
        </div>
      )}
      <pre className="overflow-x-auto p-3 pr-20 font-mono text-xs leading-relaxed">{code}</pre>
    </div>
  );
}
