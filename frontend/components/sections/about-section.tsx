import { getTranslations } from "next-intl/server";
import { GraduationCap, Briefcase, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { PlaceCard } from "@/components/sections/place-card";
import type { Experience } from "@/lib/types";

export async function AboutSection({
  experience,
  locale,
}: {
  experience: Experience[];
  locale: string;
}) {
  const t = await getTranslations("About");
  const values = t.raw("values") as string[];
  void locale;

  // Ish tajribasi (bazadan birinchisi — UZINFOCOM), bo'lmasa standart
  const exp = experience[0];
  const expPosition = exp?.position ?? "Backend Developer";
  const expPeriod = exp
    ? `${new Date(exp.start_date).getFullYear()} — ${
        exp.is_current ? t("present") : new Date(exp.end_date!).getFullYear()
      }`
    : `2024 — ${t("present")}`;

  return (
    <Section id="about" className="scroll-mt-20">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">
        {t("intro")}
      </p>

      {/* O'qish va ish joyi kartalari */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* TA'LIM — TATU */}
        <PlaceCard
          eyebrow={t("educationTitle")}
          icon={<GraduationCap className="h-3.5 w-3.5 text-accent" />}
          images={["/img_6.png", "/img_7.png"]}
          period={`2024 — ${t("present")}`}
          title="Dasturiy injiniring"
          org="Toshkent Axborot Texnologiyalari Universiteti (TATU)"
        />

        {/* ISH — UZINFOCOM */}
        <PlaceCard
          eyebrow={t("experienceTitle")}
          icon={<Briefcase className="h-3.5 w-3.5 text-accent" />}
          images={["/img_4.png", "/img_5.png"]}
          logo="/img_3.png"
          period={expPeriod}
          title={expPosition}
          org="Yagona Integrator UZINFOCOM"
        />
      </div>

      {/* Tamoyillar */}
      <div className="mt-16">
        <h3 className="text-xl font-semibold">{t("valuesTitle")}</h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v}
              className="flex items-start gap-3 rounded-xl border border-border bg-background-alt p-4"
            >
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="text-sm text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
