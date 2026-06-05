"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

const TYPES = ["pet", "work", "opensource"] as const;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const [type, setType] = useState<string>("all");
  const [tech, setTech] = useState<string | null>(null);

  const availableTypes = useMemo(
    () => TYPES.filter((tp) => projects.some((p) => p.project_type === tp)),
    [projects],
  );

  const allTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((tch) => set.add(tch)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const typeOk = type === "all" || p.project_type === type;
        const techOk = !tech || p.technologies.includes(tech);
        return typeOk && techOk;
      }),
    [projects, type, tech],
  );

  return (
    <div>
      {/* Tur filtri */}
      <div className="flex flex-wrap gap-2">
        <Chip label={t("all")} active={type === "all"} onClick={() => setType("all")} />
        {availableTypes.map((tp) => (
          <Chip
            key={tp}
            label={t(`types.${tp}`)}
            active={type === tp}
            onClick={() => setType(tp)}
          />
        ))}
      </div>

      {/* Texnologiya filtri */}
      {allTech.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {allTech.map((tch) => (
            <button
              key={tch}
              type="button"
              onClick={() => setTech(tech === tch ? null : tch)}
              className={cn(
                "rounded-md px-2.5 py-1 font-mono text-xs transition-colors",
                tech === tch
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface text-muted hover:text-foreground",
              )}
            >
              {tch}
            </button>
          ))}
        </div>
      )}

      {/* Natijalar */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted">—</p>
      )}
    </div>
  );
}

function Chip({
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
