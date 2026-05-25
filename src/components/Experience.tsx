"use client";

import { useLang } from "./LanguageProvider";
import { EXPERIENCE } from "@/content/data";
import { Reveal } from "./anim";

export default function Experience() {
  const { t } = useLang();

  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-hairline-dark py-[var(--section-y)]"
    >
      <div className="container-x">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {t({ en: "Career", id: "Karier" })}
        </p>
        <h2 className="mt-2 mb-10 text-3xl sm:text-4xl font-bold tracking-tight text-on-dark">
          {t({ en: "Experience", id: "Pengalaman" })}
        </h2>

        <div className="space-y-4">
          {EXPERIENCE.map((exp, i) => (
            <Reveal
              key={exp.company + exp.title.en}
              delay={i * 120}
              className="grid gap-3 rounded-lg border border-hairline-dark bg-surface-card-dark p-6 transition-colors hover:border-muted md:grid-cols-[1fr_2fr] md:gap-8"
            >
              <div>
                <p className="text-base font-semibold text-on-dark">
                  {t(exp.title)}
                </p>
                <p className="mt-1 text-sm text-primary">{exp.company}</p>
                <p className="mt-2 font-num text-xs text-muted">
                  {t(exp.period)}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-strong">
                {t(exp.desc)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
