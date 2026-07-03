"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Zap className="size-4" />
          </span>
          <span>Free API</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Menu className="size-4" />
          </Button>

          <Link
            href="/playground"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Open Playground
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/playground"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants({ size: "sm" }), "mt-2")}
            >
              Open Playground
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
