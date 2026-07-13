import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  size?: number;
  simplified?: boolean;
};

export function LogoMark({ className, size = 32, simplified = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn("text-primary", className)}
      aria-hidden
    >
      <path
        d="M12 7.5C8.5 7.5 7.5 10 7.5 13v6c0 3 1 5.5 4.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 7.5c3.5 0 4.5 2.5 4.5 5.5v6c0 3-1 5.5-4.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {simplified ? (
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      ) : (
        <path
          d="M16 11.5l1.1 2.9 2.9 1.1-2.9 1.1L16 19.5l-1.1-2.9-2.9-1.1 2.9-1.1z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  size?: "sm" | "md";
};

export function Logo({
  className,
  markClassName,
  showWordmark = true,
  size = "md",
}: LogoProps) {
  const markSize = size === "sm" ? 32 : 32;

  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg bg-primary/10",
          size === "sm" ? "size-8" : "size-8",
          markClassName,
        )}
      >
        <LogoMark size={markSize - 8} />
      </span>
      {showWordmark && (
        <span className="font-heading font-semibold tracking-tight">
          <span className="text-primary">Api</span>
          <span className="text-foreground">Generator</span>
        </span>
      )}
    </span>
  );
}
