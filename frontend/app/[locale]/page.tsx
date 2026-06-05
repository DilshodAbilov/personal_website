import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { TechMarquee } from "@/components/home/tech-marquee";
import { Stats } from "@/components/home/stats";
import { Section } from "@/components/ui/section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AcademicSection } from "@/components/sections/academic-section";
import { ContactSection } from "@/components/sections/contact-section";
import {
  getExperience,
  getProjects,
  getSkills,
  getSocials,
} from "@/lib/api";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [skills, projects, experience, socials] = await Promise.all([
    getSkills(),
    getProjects(),
    getExperience(),
    getSocials(),
  ]);

  const tStats = await getTranslations("Stats");

  const earliest = experience
    .map((e) => new Date(e.start_date).getFullYear())
    .sort((a, b) => a - b)[0];
  const years = earliest ? Math.max(1, 2026 - earliest) : 1;

  const stats = [
    { value: `${projects.length}+`, label: tStats("projects") },
    { value: `${skills.length}+`, label: tStats("skills") },
    { value: `${years}+`, label: tStats("experience") },
    { value: "100%", label: tStats("articles") },
  ];

  const techNames = skills.map((s) => s.name);

  return (
    <>
      <Hero socials={socials} />
      <TechMarquee items={techNames} />

      <Section className="scroll-mt-20">
        <Stats items={stats} />
      </Section>

      <AboutSection experience={experience} locale={locale} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <AcademicSection />
      <ContactSection />
    </>
  );
}
