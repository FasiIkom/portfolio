"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/content/data";

const links = [
  { href: "#projects", key: "projects" as const },
  { href: "#experience", key: "experience" as const },
  { href: "#skills", key: "skills" as const },
  { href: "#contact", key: "contact" as const },
];

export default function TopNav() {
  const { lang, toggle, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-16 border-b transition-colors ${
        scrolled
          ? "border-hairline-dark bg-canvas-dark/90 backdrop-blur-md"
          : "border-transparent bg-canvas-dark"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4">
        {/* Wordmark */}
        <a
          href="#top"
          className="font-semibold tracking-tight text-lg text-primary shrink-0"
        >
          FIRAZ<span className="text-on-dark">.my.id</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.key}>
                <a
                  href={l.href}
                  className={`relative text-sm font-medium transition-colors hover:text-on-dark ${
                    isActive ? "text-on-dark" : "text-muted-strong"
                  }`}
                >
                  {t(UI.nav[l.key])}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle language"
            className="flex items-center gap-1 rounded-md border border-hairline-dark px-2.5 py-1.5 text-xs font-semibold text-muted-strong transition-colors hover:text-on-dark hover:border-muted"
          >
            <span className={lang === "en" ? "text-primary" : ""}>EN</span>
            <span className="text-hairline-dark">/</span>
            <span className={lang === "id" ? "text-primary" : ""}>ID</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-active"
          >
            {t(UI.cta.contact)}
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline-dark text-on-dark"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-hairline-dark bg-canvas-dark">
          <ul className="container-x flex flex-col py-2">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.key}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-3 text-sm font-medium border-b border-hairline-dark last:border-0 transition-colors ${
                      isActive ? "text-primary" : "text-body"
                    }`}
                  >
                    {t(UI.nav[l.key])}
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </a>
                </li>
              );
            })}
            <li className="pt-3 pb-1">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-on-primary"
              >
                {t(UI.cta.contact)}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
