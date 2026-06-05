import { getLocale, getTranslations } from "next-intl/server";
import type { ComponentType } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Mic,
  ShieldCheck,
  User,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { localized } from "@/lib/utils";
import { getAcademicWorks } from "@/lib/api";

type IconType = ComponentType<{ className?: string }>;

const TYPE_ICON: Record<string, IconType> = {
  thesis: BookOpen,
  course: GraduationCap,
  dgu: ShieldCheck,
  article: FileText,
  conference: Mic,
  certificate: Award,
};

function LinkChip({
  href,
  label,
  icon: Icon = ExternalLink,
}: {
  href: string;
  label: string;
  icon?: IconType;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}

export async function AcademicSection() {
  const t = await getTranslations("Academic");
  const locale = await getLocale();
  const works = await getAcademicWorks();

  return (
    <Section id="academic" className="scroll-mt-20">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      {works.length === 0 ? (
        <p className="mt-10 text-muted">{t("empty")}</p>
      ) : (
        <div className="mt-10 space-y-5">
          {works.map((w) => {
            const title = localized(w, "title", locale);
            const abstract = localized(w, "abstract", locale);
            const Icon = TYPE_ICON[w.work_type] ?? FileText;
            const cover = w.certificate_url;

            return (
              <article
                key={w.id}
                className="group glass-panel grid grid-cols-1 overflow-hidden rounded-2xl transition-all hover:border-accent/50 hover:glow sm:grid-cols-[220px_1fr]"
              >
                <a
                  href={cover || undefined}
                  target={cover ? "_blank" : undefined}
                  rel={cover ? "noopener noreferrer" : undefined}
                  className="relative flex h-52 items-center justify-center overflow-hidden border-b border-border bg-surface p-3 sm:h-auto sm:min-h-[200px] sm:border-b-0 sm:border-r"
                >
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover}
                      alt={t("certificate")}
                      className="max-h-full max-w-full rounded object-contain shadow-md ring-1 ring-border transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <Icon className="h-12 w-12 text-accent/30" />
                  )}

                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/85 px-2.5 py-1 font-mono text-[11px] text-accent backdrop-blur">
                    <Icon className="h-3 w-3" />
                    {t(`types.${w.work_type}`)}
                  </span>
                </a>

                <div className="flex flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {w.year}
                    </span>
                    {w.supervisor && (
                      <span className="inline-flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {w.supervisor}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight">
                    {title}
                  </h3>

                  {abstract && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {abstract}
                    </p>
                  )}

                  {w.keywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {w.keywords.map((k) => (
                        <span
                          key={k}
                          className="rounded-md bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                    {w.doi && <LinkChip href={w.doi} label="DOI" />}
                    {w.source_url && (
                      <LinkChip href={w.source_url} label={t("source")} />
                    )}
                    {w.openaire_url && (
                      <LinkChip href={w.openaire_url} label="OpenAIRE" />
                    )}
                    {w.file && (
                      <LinkChip href={w.file} label="PDF" icon={Download} />
                    )}
                    {w.diploma_url && (
                      <LinkChip
                        href={w.diploma_url}
                        label={t("diploma")}
                        icon={Award}
                      />
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Section>
  );
}
