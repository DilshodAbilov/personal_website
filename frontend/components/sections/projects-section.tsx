import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProjectsExplorer } from "@/components/projects-explorer";
import type { Project } from "@/lib/types";

export async function ProjectsSection({ projects }: { projects: Project[] }) {
  const t = await getTranslations("Projects");

  return (
    <Section id="projects" className="scroll-mt-20">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-10">
        {projects.length > 0 ? (
          <ProjectsExplorer projects={projects} />
        ) : (
          <p className="text-muted">—</p>
        )}
      </div>
    </Section>
  );
}
