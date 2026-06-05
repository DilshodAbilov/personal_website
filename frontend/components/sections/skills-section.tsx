import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";
import { SkillsGrid } from "@/components/skills-grid";
import type { Skill } from "@/lib/types";

export async function SkillsSection({ skills }: { skills: Skill[] }) {
  const t = await getTranslations("Skills");

  return (
    <Section id="skills" className="scroll-mt-20 bg-background-alt !max-w-none">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-10">
          <SkillsGrid skills={skills} />
        </div>
      </div>
    </Section>
  );
}
