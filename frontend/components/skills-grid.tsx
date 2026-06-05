"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Skill } from "@/lib/types";

const CATEGORIES = ["backend", "database", "devops", "tools", "design", "other"] as const;

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const t = useTranslations("Skills");
  const [active, setActive] = useState<string>("all");

  const available = useMemo(
    () => CATEGORIES.filter((c) => skills.some((s) => s.category === c)),
    [skills],
  );

  const filtered = useMemo(
    () => (active === "all" ? skills : skills.filter((s) => s.category === active)),
    [skills, active],
  );

  if (skills.length === 0) {
    return <p className="text-muted">{t("subtitle")}</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterButton
          label={t("all")}
          active={active === "all"}
          onClick={() => setActive("all")}
        />
        {available.map((cat) => (
          <FilterButton
            key={cat}
            label={t(`categories.${cat}`)}
            active={active === cat}
            onClick={() => setActive(cat)}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="glass-panel rounded-xl p-4 transition-colors hover:border-accent/50"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{skill.name}</span>
              <span className="font-mono text-xs text-muted">
                {skill.proficiency_level}%
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-accent transition-all duration-700"
                style={{ width: `${skill.proficiency_level}%` }}
              />
            </div>
            {Number(skill.years_experience) > 0 && (
              <span className="mt-2 inline-block text-xs text-muted">
                {skill.years_experience} {t("yearsShort")}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border border-accent bg-accent/10 text-accent"
          : "glass-chip text-muted hover:border-accent/50 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
