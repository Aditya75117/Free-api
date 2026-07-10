import Link from "next/link";
import {
  Code2,
  FolderOpen,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { FeatureCard } from "@/components/feature-card";
import { PageSection } from "@/components/layout/page-section";
import { SeoImage } from "@/components/seo/seo-image";
import { FEATURES } from "@/constants/endpoints";

const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  "sliders-horizontal": SlidersHorizontal,
  "code-2": Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  folder: FolderOpen,
};

export function Features() {
  return (
    <PageSection
      title="Why ApiGenerator?"
      description="Everything you need to prototype faster and ship with confidence — a free mock REST API generator built for frontend developers."
    >
      <div className="mb-10 grid items-center gap-8 lg:grid-cols-2">
        <SeoImage
          src="/images/feature-generator.png"
          alt="ApiGenerator workflow: enter a keyword like user management, generate instant mock API endpoints, and receive a formatted JSON response with 200 OK status"
          width={1024}
          height={576}
          className="w-full"
        />
        <p className="text-muted-foreground leading-relaxed">
          Unlike fixed mock APIs, ApiGenerator lets you create endpoints from any keyword with
          realistic JSON, query parameters, and field filtering. Compare us to{" "}
          <Link href="/compare/jsonplaceholder" className="text-primary hover:underline">
            JSONPlaceholder
          </Link>{" "}
          or see how we work as a{" "}
          <Link href="/compare/mockoon" className="text-primary hover:underline">
            Mockoon alternative
          </Link>{" "}
          for zero-install browser prototyping.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={ICON_MAP[feature.icon]}
          />
        ))}
      </div>
    </PageSection>
  );
}
