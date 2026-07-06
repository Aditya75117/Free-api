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
      description="Everything you need to prototype faster and ship with confidence."
    >
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
