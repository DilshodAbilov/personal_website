import { useTranslations } from "next-intl";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { socialIcon } from "@/components/social-links";
import { NameParticles } from "@/components/layout/name-particles";
import { TiltCard } from "@/components/home/tilt-card";
import type { SocialLink } from "@/lib/types";

export function Hero({
  socials,
  avatar,
}: {
  socials: SocialLink[];
  avatar?: string | null;
}) {
  const t = useTranslations("Hero");

  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden">
      {/* Yumshoq aura fon (nuqtali fon o'rniga) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-[12%] h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute -bottom-16 right-[8%] h-80 w-80 rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        {/* Butun hero — bitta katta 3D shisha ramka */}
        <TiltCard className="glass-panel rounded-3xl p-6 sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* ===== Chap: matn ===== */}
            <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            {/* Status badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {t("badge")}
            </div>

            {/* Greeting */}
            <p className="animate-fade-up mt-6 text-sm text-muted sm:text-base">
              {t("greeting")}
            </p>

            {/* Logo + ism (zarrachalar bilan) — yuqoridagi brending bilan bir xil */}
            <div className="animate-fade-up mt-2 flex items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              {/* Logo — suzadi + aylanuvchi och ko'k halqa (showcase bilan bir xil) */}
              <div className="animate-float-sm relative shrink-0">
                <div className="animate-spin-slow absolute -inset-1.5 -z-10 rounded-2xl bg-[conic-gradient(from_0deg,var(--accent),transparent_35%,var(--accent)_70%,transparent)] opacity-80 blur-[3px]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img_1.png"
                  alt="Dilshod Abilov"
                  className="relative h-12 w-12 rounded-xl object-cover ring-1 ring-accent/30 sm:h-16 sm:w-16"
                />
              </div>
              <h1 className="relative text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                <span className="text-gradient">{t("name")}</span>
                <NameParticles />
              </h1>
            </div>
            <p className="animate-fade-up mt-1.5 text-lg text-muted-foreground sm:text-2xl">
              {t("patronymic")}
            </p>

            {/* Role with accent underline */}
            <div className="animate-fade-up mt-5">
              <span className="font-mono text-base font-semibold text-accent sm:text-lg">
                {t("role")}
              </span>
              <span className="mt-2 block h-1 w-16 rounded-full bg-accent/60 lg:mx-0 mx-auto" />
            </div>

            {/* Bio */}
            <p className="animate-fade-up mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {t("bio")}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#projects"
                className="group glass-sheen inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                {t("ctaProjects")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/resume"
                className="glass-panel inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-foreground transition-all hover:text-accent hover:scale-[1.03]"
              >
                <Download className="h-4 w-4" />
                {t("ctaResume")}
              </Link>
            </div>

            {/* Socials */}
            {socials.length > 0 && (
              <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {socials.map((s) => {
                  const Icon = socialIcon(s.platform);
                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label || s.platform_display}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
            </div>

          {/* ===== O'ng: foto ===== */}
          <div className="animate-fade-up order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              {/* Orqa fon halqasi / glow */}
              <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-tr from-accent/30 to-transparent blur-2xl" />
              <div className="absolute inset-0 -z-10 rounded-[2rem] border border-accent/20" />

              {/* Foto */}
              <div className="animate-float-sm relative h-64 w-64 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-2xl sm:h-80 sm:w-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar || "/dilshod.jpg"}
                  alt={t("name")}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Suzuvchi mono badge */}
              <div className="glass absolute -bottom-4 -left-4 rounded-xl border border-border px-4 py-2 font-mono text-sm shadow-lg">
                <span className="text-accent">&lt;/&gt;</span> {t("role")}
              </div>
            </div>
          </div>
        </div>
        </TiltCard>
      </div>
    </section>
  );
}
