import type { CSSProperties } from "react";

const PARTICLES = [
  { l: 4, d: 0, x: -3 },
  { l: 14, d: 0.7, x: 2 },
  { l: 24, d: 1.3, x: -2 },
  { l: 33, d: 0.35, x: 3 },
  { l: 43, d: 1.0, x: -1 },
  { l: 53, d: 1.7, x: 2 },
  { l: 62, d: 0.2, x: -3 },
  { l: 71, d: 1.15, x: 1 },
  { l: 80, d: 0.55, x: 3 },
  { l: 90, d: 1.45, x: -2 },
];

export function BrandLogo({
  particles = true,
  className = "",
}: {
  particles?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img_1.png"
        alt="Dilshod Abilov"
        className="animate-float-sm h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-border"
      />

      <span className="relative inline-block font-mono text-lg font-bold tracking-tight">
        <span className="text-gradient">Dilshod Abilov</span>

        {particles && (
          <span aria-hidden className="pointer-events-none absolute inset-0">
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="animate-particle absolute bottom-1 h-[3px] w-[3px] rounded-full bg-accent"
                style={
                  {
                    left: `${p.l}%`,
                    animationDelay: `${p.d}s`,
                    "--dx": `${p.x}px`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        )}
      </span>
    </span>
  );
}
