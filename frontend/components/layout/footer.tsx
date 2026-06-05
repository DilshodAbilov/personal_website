import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/layout/brand-logo";
import { socialIcon } from "@/components/social-links";
import type { SocialLink } from "@/lib/types";

const NAV = [
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "projects", key: "projects" },
  { id: "academic", key: "academic" },
  { id: "contact", key: "contact" },
] as const;

export function Footer({ socials }: { socials: SocialLink[] }) {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = 2026;

  return (
    <footer className="border-t border-border bg-background-alt print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <BrandLogo />
            <p className="mt-3 text-sm text-muted">{t("tagline")}</p>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {tNav(item.key)}
              </a>
            ))}
          </nav>

          {socials.length > 0 && (
            <div className="flex flex-wrap gap-2">
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

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} Dilshod Abilov. {t("rights")}
          </span>
          <span className="font-mono">{t("builtWith")}</span>
        </div>
      </div>
    </footer>
  );
}
