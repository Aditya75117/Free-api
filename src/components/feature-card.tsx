import { type LucideIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Icon className="size-4 text-primary" />
            </span>
          )}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
