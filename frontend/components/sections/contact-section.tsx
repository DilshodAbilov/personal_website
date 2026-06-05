import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/contact-form";
import { socialIcon } from "@/components/social-links";
import { getSocials } from "@/lib/api";

export async function ContactSection() {
  const t = await getTranslations("Contact");
  const socials = await getSocials();

  return (
    <Section id="contact" className="scroll-mt-20 bg-background-alt !max-w-none">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm />

          {socials.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {t("socialTitle")}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {socials.map((s) => {
                  const Icon = socialIcon(s.platform);
                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-chip flex items-center gap-3 rounded-xl p-3 transition-colors hover:border-accent"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium">
                          {s.platform_display}
                        </div>
                        {s.label && (
                          <div className="truncate text-xs text-muted">
                            {s.label}
                          </div>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
