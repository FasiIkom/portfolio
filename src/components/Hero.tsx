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

type TerminalCmd = {
  cmd: string;
  output: string;
  href?: string;
  copy?: boolean;
};

function TerminalCard() {
  const CMDS: TerminalCmd[] = useMemo(() => [
    { cmd: "cat contact.txt",  output: PROFILE.email,                    copy: true },
    { cmd: "cat github.txt",   output: "github.com/FasiIkom",            href: PROFILE.github },
    { cmd: "cat linkedin.txt", output: "linkedin.com/in/firaz-al-aqib",  href: PROFILE.linkedin },
  ], []);

  const [started, setStarted]   = useState(false);
  const [cmdIdx, setCmdIdx]     = useState(0);
  const [chars, setChars]       = useState(0);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [phase, setPhase]       = useState<"typing" | "post-type" | "post-reveal" | "done">("typing");
  const [copied, setCopied]     = useState(false);

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

  function handleCopy() {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-8 max-w-md overflow-hidden rounded-lg border border-hairline-dark bg-[#0d1117]">
      {/* title bar */}
      <div className="flex items-center gap-1.5 border-b border-hairline-dark bg-surface-elevated-dark px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#f6465d]" />
        <span className="h-3 w-3 rounded-full bg-primary" />
        <span className="h-3 w-3 rounded-full bg-trading-up" />
        <span className="ml-3 font-mono text-xs text-muted">firaz@dev: ~</span>
      </div>
      {/* body */}
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
              <div className="flex items-center gap-2" style={{ opacity: isRevealed ? 1 : 0 }}>
                {cmdItem.href ? (
                  <a
                    href={cmdItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info hover:underline"
                  >
                    {cmdItem.output}
                  </a>
                ) : (
                  <span className="text-muted-strong">{cmdItem.output}</span>
                )}
                {cmdItem.copy && (
                  <button
                    onClick={handleCopy}
                    aria-label={copied ? "Copied!" : "Copy email"}
                    title={copied ? "Copied!" : "Copy email"}
                    className="text-muted transition-colors hover:text-on-dark"
                  >
                    {copied ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    )}
                  </button>
                )}
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

function EducationCard({ school, major, period, semester }: { school: string; major: string; period: string; semester: string }) {
  return (
    <div className="mt-6 max-w-md overflow-hidden rounded-lg border border-hairline-dark bg-surface-card-dark">
      {/* top accent line */}
      <div className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />

      <div className="flex items-center gap-4 p-4">
        {/* logo with subtle ring */}
        <div className="shrink-0 rounded-md border border-hairline-dark bg-surface-elevated-dark p-2">
          <Image
            src="/images/ui.png"
            alt="Universitas Indonesia"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>

        {/* text */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-on-dark leading-tight">{school}</p>
          <p className="mt-0.5 text-xs text-muted-strong">{major}</p>
          <p className="mt-1.5 font-num text-xs text-muted">{period}</p>
        </div>

        {/* semester badge */}
        <span className="shrink-0 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 font-num text-xs font-semibold text-primary">
          {semester}
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();

  return (
    <section id="top" className="relative overflow-hidden">
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

            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
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
              <a
                href={PROFILE.cv[lang]}
                download
                className="btn-cv col-span-2 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-primary/50 px-6 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10 sm:col-span-1"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {t(UI.cta.resume)}
              </a>
            </div>

            <EducationCard
              school={EDUCATION.school}
              major={t(EDUCATION.major)}
              period={t(EDUCATION.period)}
              semester={EDUCATION.semester}
            />

            <TerminalCard />
          </div>

          {/* Right: photo */}
          <div className="animate-rise relative flex items-end justify-center lg:justify-end order-first lg:order-last">
            <span className="pointer-events-none absolute left-1 top-8 select-none font-num text-2xl text-muted/40">+</span>
            <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border border-muted/30" />

            <div className="relative">
              <span className="pointer-events-none absolute -top-2 -right-2 z-20 h-6 w-6 border-t-2 border-r-2 border-primary" />
              <span className="pointer-events-none absolute -bottom-2 -left-2 z-20 h-6 w-6 border-b-2 border-l-2 border-primary" />

              <div className="relative z-10 h-[280px] w-[200px] sm:h-[440px] sm:w-[300px] lg:h-[540px] lg:w-[360px]">
                <Image
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 360px"
                  className="object-cover object-top"
                />
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
