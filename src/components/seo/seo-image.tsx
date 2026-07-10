import Image from "next/image";

import { cn } from "@/lib/utils";

type SeoImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
};

export function SeoImage({
  src,
  alt,
  width = 640,
  height = 400,
  priority = false,
  className,
}: SeoImageProps) {
  const isSvg = src.endsWith(".svg");

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized={isSvg}
      className={cn("rounded-xl ring-1 ring-foreground/10", className)}
      loading={priority ? undefined : "lazy"}
    />
  );
}
