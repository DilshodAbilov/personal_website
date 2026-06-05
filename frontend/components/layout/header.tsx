"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { BrandShowcase } from "@/components/layout/brand-showcase";
import { cn } from "@/lib/utils";

// Bitta sahifadagi bo'limlar (anchor scroll)
const NAV = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "projects", key: "projects" },
  { id: "academic", key: "academic" },
  { id: "contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  // Scrollspy — qaysi bo'lim ko'rinib turganini aniqlash
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function go(id: string) {
    setOpen(false);
    setActive(id);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border glass print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <BrandShowcase />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => go(item.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active === item.id
                  ? "text-accent"
                  : "text-muted hover:text-foreground",
              )}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menyu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-border bg-background-alt px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => go(item.id)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active === item.id
                  ? "bg-surface text-accent"
                  : "text-muted hover:bg-surface hover:text-foreground",
              )}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
