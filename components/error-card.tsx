import { AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ErrorCardProps = {
  title?: string;
  message: string;
};

export function ErrorCard({ title = "Request failed", message }: ErrorCardProps) {
  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <AlertCircle className="size-5 text-destructive" />
        <CardTitle className="text-base text-destructive">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
