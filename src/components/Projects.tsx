"use client";

import { useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { PROJECTS, UI, type Project } from "@/content/data";
import { Reveal } from "./anim";

type Filter = "all" | "live" | "shipped";

function StatusBadge({ status, label }: { status: Project["status"]; label: string }) {
  const live = status === "live";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs font-semibold ${
        live ? "text-trading-up" : "text-muted-strong"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          live ? "bg-trading-up animate-pulse" : "bg-muted"
        }`}
      />
      {label}
    </span>
  );
}

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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-hairline-dark last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="grid w-full grid-cols-[1fr_auto] items-start gap-3 py-4 text-left transition-colors hover:bg-surface-elevated-dark/40 md:grid-cols-[200px_1fr_140px_120px_auto] md:items-center md:gap-4 md:px-3"
      >
        {/* Symbol + name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-on-dark leading-snug">
              {project.name}
            </p>
            <p className="mt-0.5 text-xs text-muted">{t(project.role)}</p>
          </div>
        </div>

        {/* Stack (desktop) */}
        <div className="hidden md:flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-sm bg-surface-elevated-dark px-2 py-0.5 text-xs text-muted-strong"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-sm px-1 py-0.5 text-xs text-muted">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Period (desktop) */}
        <p className="hidden md:block font-num text-xs text-muted-strong">
          {t(project.period)}
        </p>

        {/* Status (desktop) */}
        <div className="hidden md:block">
          <StatusBadge
            status={project.status}
            label={
              project.status === "live"
                ? t({ en: "Live", id: "Aktif" })
                : t({ en: "Shipped", id: "Selesai" })
            }
          />
        </div>

        {/* Chevron + mobile status */}
        <div className="flex items-center gap-2 text-muted-strong">
          <span className="md:hidden">
            <StatusBadge
              status={project.status}
              label={
                project.status === "live"
                  ? t({ en: "Live", id: "Aktif" })
                  : t({ en: "Shipped", id: "Selesai" })
              }
            />
          </span>
          <Chevron open={open} />
        </div>
      </button>

      {/* Expanded detail — grid-rows trick animates height without JS */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-4 px-3 pb-5 md:grid-cols-[200px_1fr] md:gap-6">
            <div className="hidden md:block" />
            <div>
              {/* mobile stack + period */}
              <div className="mb-4 flex flex-wrap items-center gap-1.5 md:hidden">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-sm bg-surface-elevated-dark px-2 py-0.5 text-xs text-muted-strong"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mb-3 font-num text-xs text-muted md:hidden">
                {t(project.period)}
              </p>

              <ul className="space-y-2">
                {project.points.map((p) => (
                  <li key={p.en} className="flex gap-2.5 text-sm leading-relaxed text-muted-strong">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{t(p)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {project.highlight && (
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-trading-up/10 px-2.5 py-1 text-xs font-semibold text-trading-up">
                    {t(project.highlight)}
                  </span>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-active"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t({ en: "Visit site", id: "Kunjungi situs" })}
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      PROJECTS.filter((p) => filter === "all" || p.status === filter),
    [filter]
  );

  const tabs: { key: Filter; label: { en: string; id: string } }[] = [
    { key: "all", label: { en: "All", id: "Semua" } },
    { key: "live", label: { en: "Live", id: "Aktif" } },
    { key: "shipped", label: { en: "Shipped", id: "Selesai" } },
  ];

  return (
    <section id="projects" className="scroll-mt-20 py-[var(--section-y)]">
      <div className="container-x">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              {t({ en: "Portfolio", id: "Portofolio" })}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-on-dark">
              {t({ en: "All projects", id: "Semua proyek" })}
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="self-start flex gap-1 rounded-md border border-hairline-dark p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-surface-elevated-dark text-on-dark"
                    : "text-muted-strong hover:text-on-dark"
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Markets-table-style card */}
        <Reveal className="rounded-xl border border-hairline-dark bg-surface-card-dark p-2 sm:p-4">
          {/* Column header (desktop) */}
          <div className="hidden md:grid grid-cols-[200px_1fr_140px_120px_auto] gap-4 border-b border-hairline-dark px-3 pb-3 text-xs font-medium uppercase tracking-wide text-muted">
            <span>{t({ en: "Project", id: "Proyek" })}</span>
            <span>{t({ en: "Stack", id: "Stack" })}</span>
            <span>{t({ en: "Period", id: "Periode" })}</span>
            <span>{t({ en: "Status", id: "Status" })}</span>
            <span />
          </div>

          {filtered.map((p) => (
            <ProjectRow key={p.symbol} project={p} />
          ))}
        </Reveal>

        <p className="mt-4 text-xs text-muted">
          {t({
            en: "Tap a row to expand details.",
            id: "Klik baris untuk melihat detail.",
          })}
        </p>
      </div>
    </section>
  );
}
