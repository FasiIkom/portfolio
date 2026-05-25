"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { PROFILE, STATS, EDUCATION, UI } from "@/content/data";
import { CountUp, Reveal } from "./anim";

function TerminalPrompt() {
  return (
    <span>
      <span className="text-trading-up">firaz@dev</span>
      <span className="text-muted-strong">:</span>
      <span className="text-info">~</span>
      <span className="text-muted-strong">$ </span>
    </span>
  );
}

function TerminalCard({ school, major, gpa }: { school: string; major: string; gpa: string }) {
  const CMDS = useMemo(() => [
    { cmd: "cat education.txt", output: school },
    { cmd: "cat major.txt",     output: major },
    { cmd: "cat gpa.txt",       output: gpa, isGpa: true },
  ], [school, major, gpa]);

  const [started, setStarted]   = useState(false);
  const [cmdIdx, setCmdIdx]     = useState(0);
  const [chars, setChars]       = useState(0);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [phase, setPhase]       = useState<"typing" | "post-type" | "post-reveal" | "done">("typing");

  // Small initial delay so the page hero animation finishes first
  useEffect(() => {
    const id = setTimeout(() => setStarted(true), 700);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!started || phase === "done" || cmdIdx >= CMDS.length) return;
    const cmd = CMDS[cmdIdx].cmd;

    if (phase === "typing") {
      if (chars < cmd.length) {
        const id = setTimeout(() => setChars((c) => c + 1), 65);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("post-type"), 180);
      return () => clearTimeout(id);
    }

    if (phase === "post-type") {
      setRevealed((r) => [...r, cmdIdx]);
      setPhase("post-reveal");
      return;
    }

    if (phase === "post-reveal") {
      const id = setTimeout(() => {
        const next = cmdIdx + 1;
        if (next < CMDS.length) {
          setCmdIdx(next);
          setChars(0);
          setPhase("typing");
        } else {
          setPhase("done");
        }
      }, 380);
      return () => clearTimeout(id);
    }
  }, [started, phase, cmdIdx, chars, CMDS]);

  return (
    <div className="mt-10 max-w-md overflow-hidden rounded-lg border border-hairline-dark bg-[#0d1117]">
      {/* title bar */}
      <div className="flex items-center gap-1.5 border-b border-hairline-dark bg-surface-elevated-dark px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#f6465d]" />
        <span className="h-3 w-3 rounded-full bg-primary" />
        <span className="h-3 w-3 rounded-full bg-trading-up" />
        <span className="ml-3 font-mono text-xs text-muted">firaz@dev: ~</span>
      </div>
      {/* body — always renders full final layout; opacity controls visibility */}
      <div className="p-4 font-mono text-sm leading-relaxed">
        {CMDS.map((cmdItem, idx) => {
          const isRevealed = revealed.includes(idx);
          const isCurrent  = idx === cmdIdx && phase !== "done";
          const isFuture   = !started || (!isRevealed && !isCurrent);

          return (
            <div key={idx} className="mb-3">
              {/* command line */}
              <div style={{ opacity: isFuture ? 0 : 1 }}>
                <TerminalPrompt />
                <span className="text-body">
                  {isCurrent ? cmdItem.cmd.slice(0, chars) : cmdItem.cmd}
                </span>
                {isCurrent && (
                  <span className="inline-block h-[0.9em] w-[0.5em] translate-y-[1px] bg-body animate-pulse" />
                )}
              </div>
              {/* output line */}
              <div style={{ opacity: isRevealed ? 1 : 0 }}>
                {cmdItem.isGpa
                  ? <CountUp value={cmdItem.output} className="font-bold text-primary" />
                  : <span className="text-muted-strong">{cmdItem.output}</span>}
              </div>
            </div>
          );
        })}

        {/* idle prompt */}
        <div style={{ opacity: phase === "done" ? 1 : 0 }}>
          <TerminalPrompt />
          <span className="inline-block h-[0.9em] w-[0.5em] translate-y-[1px] bg-body animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-hairline-dark bg-surface-card-dark text-muted-strong transition-colors hover:border-primary/60 hover:text-on-dark"
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* decorative framing — structural grid, no atmospheric gradient */}
      <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-x relative pt-14 pb-[var(--section-y)] md:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Left: headline */}
          <div className="animate-rise min-w-0 pb-2 lg:pb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.05] tracking-tight text-on-dark text-balance">
              {PROFILE.name}
            </h1>
            <p className="mt-3 text-xl sm:text-2xl font-semibold text-primary">
              {t(PROFILE.role)}
            </p>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-strong text-pretty">
              {t(PROFILE.tagline)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-active"
              >
                {t(UI.cta.contact)}
              </a>
              <a
                href="#projects"
                className="inline-flex h-11 items-center justify-center rounded-md border border-hairline-dark bg-surface-card-dark px-6 text-sm font-semibold text-on-dark transition-colors hover:border-muted"
              >
                {t(UI.cta.viewProjects)}
              </a>

              <div className="ml-1 flex items-center gap-2">
                <Social href={`mailto:${PROFILE.email}`} label="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Social>
                <Social href={PROFILE.linkedin} label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H17.6v-5.34c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21H9V9Z" />
                  </svg>
                </Social>
                <Social href={PROFILE.github} label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.74 1.27 3.41.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.8 1.08.8 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
                  </svg>
                </Social>
              </div>
            </div>

            <TerminalCard
              school={EDUCATION.school}
              major={t(EDUCATION.major)}
              gpa={EDUCATION.gpa}
            />
          </div>

          {/* Right: integrated photo cutout */}
          <div className="animate-rise relative flex items-end justify-center lg:justify-end order-first lg:order-last">
            {/* technical blueprint marks */}
            <span className="pointer-events-none absolute left-1 top-8 select-none font-num text-2xl text-muted/40">
              +
            </span>
            <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border border-muted/30" />

            <div className="relative">
              {/* corner bracket accents */}
              <span className="pointer-events-none absolute -top-2 -right-2 z-20 h-6 w-6 border-t-2 border-r-2 border-primary" />
              <span className="pointer-events-none absolute -bottom-2 -left-2 z-20 h-6 w-6 border-b-2 border-l-2 border-primary" />

              {/* photo cutout — sits directly on the canvas, no panel */}
              <div className="relative z-10 h-[280px] w-[200px] sm:h-[440px] sm:w-[300px] lg:h-[540px] lg:w-[360px]">
                <Image
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 360px"
                  className="object-cover object-top"
                />
                {/* bottom fade blends the crop into the canvas */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas-dark via-canvas-dark/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Stat callouts */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hairline-dark pt-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label.en} delay={i * 120}>
              <CountUp
                value={s.value}
                className="font-num text-3xl sm:text-4xl font-bold text-primary leading-none"
              />
              <p className="mt-2 text-sm text-muted-strong">{t(s.label)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
