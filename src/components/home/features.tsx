import {
  Code2,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { FeatureCard } from "@/components/feature-card";
import { FEATURES } from "@/constants/endpoints";

const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  "sliders-horizontal": SlidersHorizontal,
  "code-2": Code2,
  sparkles: Sparkles,
  terminal: Terminal,
};

export function Features() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Why Free API?</h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need to prototype faster and ship with confidence.
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
    </section>
  );
}
