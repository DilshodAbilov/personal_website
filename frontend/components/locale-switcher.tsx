"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  uz: "O'zbekcha",
  en: "English",
  ru: "Русский",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function change(next: string) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Tilni almashtirish"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-xl border border-border bg-background-alt p-1 shadow-xl">
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => change(l)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface",
                l === locale ? "text-accent" : "text-foreground",
              )}
            >
              {LABELS[l]}
              {l === locale && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
