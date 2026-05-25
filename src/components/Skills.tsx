"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { SKILLS, AWARDS } from "@/content/data";
import { Reveal } from "./anim";
import { TechIcon } from "@/content/techIcons";

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 21h8M12 17v4M7 4H4a1 1 0 0 0-1 1v2a4 4 0 0 0 4 4h1M17 4h3a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 4h10v7a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Skills() {
  const { t } = useLang();

  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-hairline-dark py-[var(--section-y)]"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[2fr_1fr]">
        {/* Skills */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t({ en: "Toolkit", id: "Perangkat" })}
          </p>
          <h2 className="mt-2 mb-8 text-3xl sm:text-4xl font-bold tracking-tight text-on-dark">
            {t({ en: "Skills", id: "Keahlian" })}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {SKILLS.map((group, i) => (
              <Reveal key={group.group.en} delay={i * 80}>
                <p className="mb-3 text-sm font-semibold text-muted-strong">
                  {t(group.group)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-md border border-hairline-dark bg-surface-card-dark px-3 py-1.5 text-sm text-body transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-on-dark"
                    >
                      <TechIcon name={item} size={16} />
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t({ en: "Recognition", id: "Penghargaan" })}
          </p>
          <h2 className="mt-2 mb-8 text-3xl sm:text-4xl font-bold tracking-tight text-on-dark">
            {t({ en: "Awards", id: "Prestasi" })}
          </h2>

          <ul className="space-y-3">
            {AWARDS.map((a, i) => (
              <Reveal
                as="li"
                key={a.title.en}
                delay={i * 100}
                className="flex items-center gap-4 rounded-lg border border-hairline-dark bg-surface-card-dark p-4 transition-colors hover:border-primary/40"
              >
                {/* Logo or trophy fallback */}
                {a.logo ? (
                  <Image
                    src={a.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 object-contain"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-elevated-dark">
                    <span className="text-primary"><TrophyIcon /></span>
                  </div>
                )}

                <span className="flex-1 text-sm leading-relaxed text-body">
                  {t(a.title)}
                </span>
                <span className="font-num shrink-0 rounded-sm bg-primary/15 px-2 py-1 text-xs font-bold text-primary">
                  {a.year}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
