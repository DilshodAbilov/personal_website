"use client";

import { useTranslations } from "next-intl";
import { socialIcon } from "@/components/social-links";
import type { SocialLink } from "@/lib/types";

export function SideRail({ socials }: { socials: SocialLink[] }) {
  const t = useTranslations("Hero");
  if (socials.length === 0) return null;

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-full w-16 flex-col items-center justify-center gap-4 border-r border-border bg-surface/20 backdrop-blur-sm xl:flex">
      {socials.slice(0, 6).map((s) => {
        const Icon = socialIcon(s.platform);
        return (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label || s.platform_display}
            className="text-muted transition-colors hover:text-accent"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
      <span className="my-1 h-px w-6 bg-border" />
      <div
        title={t("badge")}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-border"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
      </div>
    </aside>
  );
}
