"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { X } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";

// Katta ko'rinishdagi ism atrofida sochiluvchi zarrachalar
const BIG_PARTICLES = [
  { l: 2, t: 70, d: 0, x: -6 },
  { l: 10, t: 30, d: 0.8, x: 4 },
  { l: 18, t: 85, d: 1.6, x: -3 },
  { l: 25, t: 15, d: 0.4, x: 5 },
  { l: 33, t: 60, d: 1.2, x: -4 },
  { l: 40, t: 90, d: 2.0, x: 3 },
  { l: 47, t: 25, d: 0.6, x: -5 },
  { l: 54, t: 70, d: 1.4, x: 4 },
  { l: 61, t: 10, d: 0.2, x: -3 },
  { l: 68, t: 80, d: 1.8, x: 5 },
  { l: 75, t: 35, d: 1.0, x: -4 },
  { l: 82, t: 65, d: 0.5, x: 3 },
  { l: 89, t: 20, d: 1.5, x: -5 },
  { l: 96, t: 75, d: 0.9, x: 4 },
  { l: 6, t: 45, d: 2.2, x: 3 },
  { l: 30, t: 95, d: 1.1, x: -4 },
  { l: 58, t: 95, d: 0.3, x: 5 },
  { l: 86, t: 50, d: 1.9, x: -3 },
];

export function BrandShowcase() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Bosiladigan logo (header) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Logoni katta ko'rish"
        className="rounded-lg outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-accent"
      >
        <BrandLogo />
      </button>

      {/* Markaziy katta ko'rinish */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-background/80 px-6 backdrop-blur-md"
        >
          <button
            type="button"
            aria-label="Yopish"
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-pop relative flex flex-col items-center gap-7 text-center"
          >
            {/* Orqa glow (pulslovchi) */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent/20 blur-3xl" />

            {/* Katta logo — suzib turadi + aylanuvchi nurli halqa */}
            <div className="animate-float relative">
              <div className="animate-spin-slow absolute -inset-2 -z-10 rounded-[2.2rem] bg-[conic-gradient(from_0deg,var(--accent),transparent_35%,var(--accent)_70%,transparent)] opacity-80 blur-[3px]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img_1.png"
                alt="Dilshod Abilov"
                className="relative h-36 w-36 rounded-3xl shadow-2xl ring-1 ring-accent/30 sm:h-44 sm:w-44"
              />
            </div>

            {/* Ism + zarrachalar */}
            <div className="relative">
              <h2 className="text-gradient font-mono text-4xl font-bold tracking-tight sm:text-6xl">
                Dilshod Abilov
              </h2>

              <span aria-hidden className="pointer-events-none absolute -inset-10">
                {BIG_PARTICLES.map((p, i) => (
                  <span
                    key={i}
                    className="animate-particle-lg absolute h-1.5 w-1.5 rounded-full bg-accent"
                    style={
                      {
                        left: `${p.l}%`,
                        top: `${p.t}%`,
                        animationDelay: `${p.d}s`,
                        "--dx": `${p.x}px`,
                      } as CSSProperties
                    }
                  />
                ))}
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img_1.png"
              alt="CodeDevion logo"
              className="h-12 w-auto rounded-lg opacity-90 sm:h-14"
            />
          </div>
        </div>
      )}
    </>
  );
}
