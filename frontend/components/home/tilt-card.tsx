"use client";

import { useRef } from "react";

/**
 * Sichqoncha harakatiga qarab 3D qiyshayadigan (parallaks) karta.
 * prefers-reduced-motion yoqilgan bo'lsa qiyshaymaydi.
 */
export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = (py * -8).toFixed(2);
    const rotateY = (px * 12).toFixed(2);
    el.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
