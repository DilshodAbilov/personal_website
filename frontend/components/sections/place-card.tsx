"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLeftRight } from "lucide-react";

// Shatter to'ri (ustun × qator) — juda mayda zarrachalar
const COLS = 24;
const ROWS = 14;

type Tile = {
  bgX: number;
  bgY: number;
  tx: number;
  ty: number;
  rot: number;
  delay: number;
};

export function PlaceCard({
  eyebrow,
  icon,
  images,
  logo,
  period,
  title,
  org,
}: {
  eyebrow: string;
  icon: ReactNode;
  images: string[];
  logo?: string;
  period: string;
  title: string;
  org: string;
}) {
  const [active, setActive] = useState(0);
  const [shards, setShards] = useState<{ src: string; tiles: Tile[] } | null>(
    null,
  );
  const activeRef = useRef(0);
  const busyRef = useRef(false);
  const bigRef = useRef<HTMLDivElement>(null);

  const main = images[active];

  const swapTo = useCallback(
    (next: number) => {
      const current = activeRef.current;
      if (busyRef.current || next === current || next < 0 || next >= images.length) {
        return;
      }
      const el = bigRef.current;
      const oldSrc = images[current];

      if (el) {
        const { width: W, height: H } = el.getBoundingClientRect();
        // Bo'laklar pastki-o'ng tomondagi kichik rasm tomon uchadi
        const targetX = W * 0.92;
        const targetY = H * 1.18;
        const tiles: Tile[] = [];
        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const cx = (col + 0.5) * (W / COLS);
            const cy = (row + 0.5) * (H / ROWS);
            const idx = row * COLS + col;
            const dist = COLS - 1 - col + (ROWS - 1 - row);
            tiles.push({
              bgX: (col / (COLS - 1)) * 100,
              bgY: (row / (ROWS - 1)) * 100,
              tx: Math.round(targetX - cx),
              ty: Math.round(targetY - cy),
              rot: (idx % 2 ? 1 : -1) * (30 + (idx % 6) * 15),
              delay: dist * 9,
            });
          }
        }
        setShards({ src: oldSrc, tiles });
        setTimeout(() => setShards(null), 1150);
      }

      busyRef.current = true;
      activeRef.current = next;
      setActive(next);
      setTimeout(() => {
        busyRef.current = false;
      }, 700);
    },
    [images],
  );

  // Har 3 sekundda avtomatik almashinuv
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      swapTo((activeRef.current + 1) % images.length);
    }, 2000);
    return () => clearInterval(id);
  }, [images.length, swapTo]);

  return (
    <div className="group relative flex h-[420px] flex-col overflow-hidden rounded-2xl border border-border bg-background-alt transition-all hover:border-accent/50 hover:glow">
      {/* Rasm — kartaning ~75% qismi */}
      <div ref={bigRef} className="relative h-[75%] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={main}
          src={main}
          alt={org}
          className="animate-img-swap h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-alt via-transparent to-transparent" />

        {/* Eyebrow chip */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur">
          {icon}
          {eyebrow}
        </div>

        {/* Logo */}
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt=""
            className="absolute bottom-3 left-4 h-8 w-auto rounded-md ring-1 ring-white/10"
          />
        )}
      </div>

      {/* Yozuvlar + almashtiriladigan kichik rasm(lar) */}
      <div className="flex h-[25%] items-center gap-3 px-4">
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[11px] text-accent">{period}</div>
          <h4 className="mt-0.5 truncate text-sm font-semibold tracking-tight">
            {title}
          </h4>
          <div className="truncate text-xs text-muted">{org}</div>
        </div>

        <div className="flex shrink-0 gap-2">
          {images.map((src, i) =>
            i === active ? null : (
              <button
                key={src}
                type="button"
                onClick={() => swapTo(i)}
                aria-label="Rasmni almashtirish"
                className="group/thumb relative h-14 w-20 overflow-hidden rounded-lg ring-1 ring-border transition hover:ring-accent"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={org}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 backdrop-blur-[1px] transition-opacity group-hover/thumb:opacity-100">
                  <ArrowLeftRight className="h-4 w-4 text-white" />
                </span>
              </button>
            ),
          )}
        </div>
      </div>

      {/* Shatter overlay — eski rasm bo'laklari uchib ketadi */}
      {shards && (
        <div
          className="pointer-events-none absolute left-0 top-0 z-20 h-[75%] w-full"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {shards.tiles.map((tile, i) => (
            <div
              key={i}
              className="animate-shatter"
              style={
                {
                  backgroundImage: `url(${shards.src})`,
                  backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                  backgroundPosition: `${tile.bgX}% ${tile.bgY}%`,
                  "--tx": `${tile.tx}px`,
                  "--ty": `${tile.ty}px`,
                  "--rot": `${tile.rot}deg`,
                  animationDelay: `${tile.delay}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
