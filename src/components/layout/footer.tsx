import Link from "next/link";
import { ExternalLink, Zap } from "lucide-react";

import { NAV_LINKS } from "@/constants/navigation";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-heading font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Zap className="size-4" />
            </span>
            Free API
          </div>
          <p className="text-sm text-muted-foreground">
            Generate mock REST APIs instantly. Built for developers who need fast,
            reliable test data.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-semibold">Navigation</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-semibold">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/docs" className="transition-colors hover:text-foreground">
                API Documentation
              </Link>
            </li>
            <li>
              <Link href="/examples" className="transition-colors hover:text-foreground">
                Example Endpoints
              </Link>
            </li>
            <li>
              <Link href="/playground" className="transition-colors hover:text-foreground">
                Playground
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Free API. Open source mock REST API generator.
      </div>
    </footer>
  );
}
