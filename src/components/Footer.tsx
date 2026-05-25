"use client";

import { useLang } from "./LanguageProvider";
import { PROFILE } from "@/content/data";

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H17.6v-5.34c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21H9V9Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.74 1.27 3.41.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.8 1.08.8 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const socials = [
    { href: `mailto:${PROFILE.email}`, label: "Email", icon: <MailIcon /> },
    { href: PROFILE.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
    { href: PROFILE.github, label: "GitHub", icon: <GitHubIcon /> },
  ];

  return (
    <footer className="mt-auto border-t border-hairline-dark bg-canvas-dark text-body">
      <div className="container-x py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-bold tracking-tight text-primary">
              FIRAZ<span className="text-on-dark">.my.id</span>
            </p>
            <p className="mt-2 text-sm text-muted-strong">
              {t(PROFILE.role)} · {t(PROFILE.location)}
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-3 inline-block font-num text-sm text-body underline-offset-4 transition-colors hover:text-primary"
            >
              {PROFILE.email}
            </a>
          </div>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-hairline-dark bg-surface-card-dark text-muted-strong transition-colors hover:border-primary/60 hover:text-on-dark"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-hairline-dark pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {PROFILE.name}. {t({ en: "All rights reserved.", id: "Hak cipta dilindungi." })}</p>
        </div>
      </div>
    </footer>
  );
}
