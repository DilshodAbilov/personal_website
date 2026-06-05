import type { CSSProperties } from "react";

// Katta ism ustidan sochiluvchi (parchalanuvchi) zarrachalar — showcase bilan bir xil
const PARTICLES = [
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
];

export function NameParticles({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute -inset-6 ${className}`}>
      {PARTICLES.map((p, i) => (
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
  );
}
