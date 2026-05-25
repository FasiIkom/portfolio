"use client";

import { useLang } from "./LanguageProvider";
import { PROFILE } from "@/content/data";
import { Reveal } from "./anim";

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="scroll-mt-20 pb-[var(--section-y)]">
      <div className="container-x">
        <Reveal className="rounded-xl bg-surface-card-dark p-8 sm:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-on-dark">
                {t({
                  en: "Let's build something solid.",
                  id: "Ayo bangun sesuatu yang solid.",
                })}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-strong">
                {t({
                  en: "Open to internship, full-time and freelance fullstack roles. The fastest way to reach me is email.",
                  id: "Terbuka untuk peran fullstack: magang, full-time, maupun freelance. Cara tercepat menghubungi saya adalah lewat email.",
                })}
              </p>
            </div>

            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-active"
            >
              {t({ en: "Email me", id: "Email saya" })}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
