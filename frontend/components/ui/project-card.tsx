"use client";

import { useLocale, useTranslations } from "next-intl";
import { ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { localized } from "@/lib/utils";
import type { Project } from "@/lib/types";

const STATUS_COLOR: Record<Project["status"], string> = {
  active: "bg-green-500",
  completed: "bg-blue-500",
  archived: "bg-gray-500",
};

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations("Projects");
  const description = localized(project, "description", locale);

  return (
    <article className="group glass-panel relative flex flex-col overflow-hidden rounded-2xl p-5 transition-all hover:border-accent/50 hover:glow">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
        <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
          <span className={`h-2 w-2 rounded-full ${STATUS_COLOR[project.status]}`} />
          {t(`statuses.${project.status}`)}
        </span>
      </div>

      <Badge variant="accent" className="mt-2 self-start">
        {t(`types.${project.project_type}`)}
      </Badge>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>

      {project.technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      )}

      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-center gap-3">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              title={project.is_private ? t("privateNote") : undefined}
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              {project.is_private ? (
                <Lock className="h-4 w-4" />
              ) : (
                <GithubIcon className="h-4 w-4" />
              )}
              {t("viewCode")}
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" />
              {t("liveDemo")}
            </a>
          )}
        </div>

        {project.is_private && (
          <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-amber-500/10 px-2.5 py-1.5 text-xs text-amber-600 dark:text-amber-400">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {t("privateNote")}
          </p>
        )}
      </div>
    </article>
  );
}
