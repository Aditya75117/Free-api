import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import {
  FOOTER_COMPARE_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_USE_CASE_LINKS,
  NAV_LINKS,
} from "@/constants/navigation";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <h2 className="sr-only">Site footer</h2>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-2">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Generate mock REST APIs instantly. Built for developers who need fast, reliable test
            data for frontend prototyping and testing.
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
          <h3 className="mb-3 font-heading text-sm font-semibold">Compare</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_COMPARE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-6 font-heading text-sm font-semibold">Use Cases</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_USE_CASE_LINKS.map((link) => (
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
          <h3 className="mb-3 mt-6 font-heading text-sm font-semibold">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ApiGenerator. Open source mock REST API generator.
      </div>
    </footer>
  );
}
