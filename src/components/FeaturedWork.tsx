"use client";

import { useLang } from "./LanguageProvider";
import { PROJECTS } from "@/content/data";
import { ProjectThumb } from "./Media";
import { Reveal } from "./anim";

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M17 7H8M17 7v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FeaturedWork() {
  const { t } = useLang();
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section className="py-[var(--section-y)]">
      <div className="container-x">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t({ en: "Highlights", id: "Sorotan" })}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-on-dark">
            {t({ en: "Featured work", id: "Karya unggulan" })}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p, idx) => {
            const card = (
              <>
                <ProjectThumb
                  symbol={p.symbol}
                  src={p.image}
                  accent={p.accent}
                  className="aspect-[16/10] w-full rounded-lg"
                />
                <div className="mt-5 flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-on-dark">{p.name}</h3>
                  {p.url && (
                    <span className="text-muted-strong transition-colors group-hover:text-primary">
                      <ExternalIcon />
                    </span>
                  )}
                </div>
                {p.blurb && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-strong text-pretty">
                    {t(p.blurb)}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-sm bg-surface-elevated-dark px-2 py-0.5 text-xs text-muted-strong"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </>
            );

            const base =
              "group block h-full rounded-xl border border-hairline-dark bg-surface-card-dark p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40";

            return (
              <Reveal key={p.symbol} delay={idx * 120}>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={base}
                  >
                    {card}
                  </a>
                ) : (
                  // No public URL (e.g. GCA) — link to the full project list
                  // so the card stays interactive and shows a pointer cursor.
                  <a href="#projects" className={base}>
                    {card}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
