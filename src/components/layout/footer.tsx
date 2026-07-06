import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { NAV_LINKS } from "@/constants/navigation";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
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
        © {new Date().getFullYear()} ApiGenerator. Open source mock REST API generator.
      </div>
    </footer>
  );
}
