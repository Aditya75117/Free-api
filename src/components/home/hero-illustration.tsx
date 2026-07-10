import { SeoImage } from "@/components/seo/seo-image";
import { cn } from "@/lib/utils";

type HeroIllustrationProps = {
  className?: string;
};

export function HeroIllustration({ className }: HeroIllustrationProps) {
  return (
    <figure className={cn("relative mx-auto w-full", className)}>
      <SeoImage
        src="/images/hero-developer.png"
        alt="Developer at a desk using ApiGenerator to create mock REST API endpoints with instant JSON responses"
        width={1024}
        height={1024}
        priority
        className="w-full rounded-2xl ring-1 ring-foreground/10"
      />
      <figcaption className="sr-only">
        Developer working at a desk with ApiGenerator mock REST API tool showing JSON responses,
        query parameters, and AI-powered schemas
      </figcaption>
    </figure>
  );
}
