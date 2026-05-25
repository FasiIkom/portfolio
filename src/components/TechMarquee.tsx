"use client";

import { SKILLS } from "@/content/data";
import { TechIcon } from "@/content/techIcons";

// Flatten all tech into one list for the ticker.
const TECH = SKILLS.flatMap((g) => g.items);

export default function TechMarquee() {
  const row = [...TECH, ...TECH];
  return (
    <div className="border-y border-hairline-dark bg-surface-card-dark/40 py-4">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-3 whitespace-nowrap">
          {row.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="inline-flex items-center gap-2 rounded-md border border-hairline-dark px-3 py-1.5 text-sm text-muted-strong"
            >
              <TechIcon name={tech} size={16} />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
