import Image from "next/image";

/**
 * Project thumbnail. Renders the image if `src` is provided, otherwise a
 * designed monogram placeholder so the layout never looks broken/empty.
 */
export function ProjectThumb({
  symbol,
  src,
  accent = "#fcd535",
  className = "",
}: {
  symbol: string;
  src?: string;
  accent?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={`${symbol} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-surface-elevated-dark ${className}`}
    >
      {/* tinted wash + dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18] transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute inset-0 bg-dot-grid opacity-60" />
      <span
        className="relative font-num text-5xl font-bold tracking-tight transition-transform duration-500 group-hover:scale-110"
        style={{ color: accent }}
      >
        {symbol}
      </span>
      <span className="absolute bottom-3 right-3 rounded-sm border border-hairline-dark bg-canvas-dark/70 px-2 py-0.5 font-num text-[10px] uppercase tracking-wide text-muted">
        preview
      </span>
    </div>
  );
}

/**
 * Square profile photo with monogram fallback + yellow accent frame.
 */
export function ProfilePhoto({
  src,
  name,
  className = "",
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className={`relative ${className}`}>
      {/* yellow accent corner */}
      <div className="absolute -right-3 -top-3 h-16 w-16 rounded-tr-xl border-r-2 border-t-2 border-primary" />
      <div className="absolute -bottom-3 -left-3 h-16 w-16 rounded-bl-xl border-b-2 border-l-2 border-primary/40" />

      <div className="relative aspect-square overflow-hidden rounded-xl border border-hairline-dark bg-surface-card-dark">
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 1024px) 80vw, 420px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute inset-0 bg-grid-lines opacity-70" />
            <span className="relative text-7xl font-bold tracking-tight text-primary">
              {initials}
            </span>
            <span className="absolute bottom-4 left-0 right-0 text-center font-num text-[11px] uppercase tracking-widest text-muted">
              add photo
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
