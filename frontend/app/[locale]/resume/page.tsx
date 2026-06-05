import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PrintButton } from "@/components/resume/print-button";
import { localized } from "@/lib/utils";
import {
  getAcademicWorks,
  getExperience,
  getFeaturedProjects,
  getSkills,
} from "@/lib/api";

const EMAIL = "abilovdilshod55@gmail.com";
const PHONE = "+998 20 000 35 01";
const FULL_NAME = "Dilshod Abilov Bekzod o'g'li";

const SKILL_CATEGORIES = [
  "backend",
  "database",
  "devops",
  "tools",
  "design",
  "other",
] as const;

function year(d: string) {
  return new Date(d).getFullYear();
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Resume");
  const tSkills = await getTranslations("Skills");
  const tAcademic = await getTranslations("Academic");

  const [skills, experience, projects, academic] = await Promise.all([
    getSkills(),
    getExperience(),
    getFeaturedProjects(),
    getAcademicWorks(),
  ]);

  const languages = t.raw("languages") as { name: string; level: string }[];
  const grouped = SKILL_CATEGORIES.map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="bg-zinc-100 py-8 print:bg-white print:py-0">
      <div className="mx-auto mb-6 flex max-w-[820px] items-center justify-between px-4 print:hidden">
        <Link
          href="/"
          className="text-sm text-zinc-600 transition-colors hover:text-accent"
        >
          ← {t("back")}
        </Link>
        <PrintButton label={t("download")} />
      </div>

      <article className="mx-auto max-w-[820px] bg-white px-10 py-10 text-zinc-800 shadow-xl print:max-w-none print:px-7 print:py-1 print:text-[13px] print:shadow-none print:[zoom:0.85]">
        <header className="flex items-center gap-6 border-b border-zinc-200 pb-6 print:gap-4 print:pb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dilshod1.jpg"
            alt={FULL_NAME}
            className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-zinc-200 print:h-20 print:w-20"
          />
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-zinc-900 print:text-2xl">
              {FULL_NAME}
            </h1>
            <p className="mt-0.5 text-lg font-medium text-blue-700 print:text-base">
              {t("role")}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-600">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> {PHONE}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> {EMAIL}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {t("location")}
              </span>
            </div>
          </div>
        </header>

        <Block title={t("summaryTitle")}>
          <p className="text-sm leading-relaxed text-zinc-700">{t("summary")}</p>
        </Block>

        {experience.length > 0 && (
          <Block title={t("experienceTitle")}>
            {experience.map((e) => (
              <div key={e.id} className="mb-4 last:mb-0 print:mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold text-zinc-900">{e.position}</h3>
                  <span className="shrink-0 text-xs text-zinc-500">
                    {year(e.start_date)} –{" "}
                    {e.end_date ? year(e.end_date) : t("present")}
                  </span>
                </div>
                <div className="text-sm font-medium text-blue-700">
                  {e.company}
                </div>
                <p className="mt-1 text-sm text-zinc-700">
                  {localized(e, "description", locale)}
                </p>
                {e.technologies.length > 0 && (
                  <p className="mt-1 text-xs text-zinc-500">
                    {e.technologies.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </Block>
        )}

        {projects.length > 0 && (
          <Block title={t("projectsTitle")}>
            {projects.map((p) => (
              <div key={p.id} className="mb-3 last:mb-0 print:mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold text-zinc-900">{p.name}</h3>
                  <span className="shrink-0 text-xs text-zinc-500">
                    {p.technologies.slice(0, 4).join(" · ")}
                  </span>
                </div>
                <p className="text-sm text-zinc-700">
                  {localized(p, "description", locale)}
                </p>
              </div>
            ))}
          </Block>
        )}

        <Block title={t("educationTitle")}>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-semibold text-zinc-900">
              {t("educationDegree")}
            </h3>
            <span className="shrink-0 text-xs text-zinc-500">
              2024 – {t("present")}
            </span>
          </div>
          <div className="text-sm font-medium text-blue-700">
            {t("educationSchool")}
          </div>
        </Block>

        {grouped.length > 0 && (
          <Block title={t("skillsTitle")}>
            <div className="space-y-1.5">
              {grouped.map((g) => (
                <div key={g.cat} className="text-sm">
                  <span className="font-semibold text-zinc-900">
                    {tSkills(`categories.${g.cat}`)}:{" "}
                  </span>
                  <span className="text-zinc-700">
                    {g.items.map((s) => s.name).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </Block>
        )}

        <Block title={t("languagesTitle")}>
          <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm">
            {languages.map((l) => (
              <span key={l.name}>
                <span className="font-semibold text-zinc-900">{l.name}</span>{" "}
                <span className="text-zinc-600">— {l.level}</span>
              </span>
            ))}
          </div>
        </Block>

        {academic.length > 0 && (
          <Block title={t("certificationsTitle")}>
            <ul className="space-y-1.5 print:space-y-0.5">
              {academic.map((w) => (
                <li
                  key={w.id}
                  className="text-sm leading-snug text-zinc-700 print:text-[11px] print:leading-tight"
                >
                  <span className="text-zinc-900">
                    {localized(w, "title", locale)}
                  </span>
                  <span className="text-zinc-500">
                    {" "}
                    — {tAcademic(`types.${w.work_type}`)}, {w.year}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
        )}
      </article>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 break-inside-avoid print:mt-3">
      <h2 className="mb-2 border-b-2 border-blue-700/70 pb-1 text-sm font-bold uppercase tracking-wide text-blue-800 print:mb-1">
        {title}
      </h2>
      {children}
    </section>
  );
}
