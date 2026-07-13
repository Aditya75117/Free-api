import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  className?: string;
  showCopy?: boolean;
};

export function CodeBlock({ code, className, showCopy = true }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 max-w-full items-start gap-2 overflow-hidden rounded-lg bg-muted p-3",
        className,
      )}
    >
      <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-xs leading-relaxed">{code}</pre>
      {showCopy && (
        <div className="shrink-0">
          <CopyButton value={code} label="Copy" />
        </div>
      )}
    </div>
  );
}
