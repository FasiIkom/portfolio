"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { PROFILE } from "@/content/data";
import { Reveal } from "./anim";

function EmailModal({ onClose }: { onClose: () => void }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function handleSend() {
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Send email"
    >
      {/* backdrop */}
      <div
        className="animate-backdrop-in absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* card */}
      <div className="animate-modal-in relative z-10 w-full max-w-md rounded-xl border border-hairline-dark bg-surface-card-dark p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold text-on-dark">
            Send me a message
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-strong transition-colors hover:text-on-dark"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email-subject" className="text-xs font-medium text-muted-strong">
              Subject
            </label>
            <input
              id="email-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's this about?"
              className="h-10 rounded-md border border-hairline-dark bg-[#0d1117] px-3 text-sm text-on-dark placeholder:text-muted outline-none transition-colors focus:border-primary/60"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email-body" className="text-xs font-medium text-muted-strong">
              Message
            </label>
            <textarea
              id="email-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell me more..."
              rows={5}
              className="resize-none rounded-md border border-hairline-dark bg-[#0d1117] px-3 py-2.5 text-sm text-on-dark placeholder:text-muted outline-none transition-colors focus:border-primary/60"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-md border border-hairline-dark bg-transparent px-4 text-sm font-medium text-muted-strong transition-colors hover:text-on-dark"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!subject.trim() && !body.trim()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-active disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <EmailModal onClose={() => setOpen(false)} />}

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

              <button
                onClick={() => setOpen(true)}
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-md bg-primary px-8 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-active"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t({ en: "Email me", id: "Email saya" })}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
