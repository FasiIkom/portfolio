# Firaz Al Aqib — Portfolio

Personal portfolio site built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, styled after the Binance design language (deep near-black canvas, single yellow accent, tabular numbers) defined in [DESIGN.md](DESIGN.md).

## Stack

- **Next.js 16** — App Router
- **Tailwind CSS v4** — design tokens live in [src/app/globals.css](src/app/globals.css) (`@theme`)
- **Fonts** — Inter (BinanceNova substitute) + JetBrains Mono (BinancePlex substitute, used for all numbers/dates)
- **Bilingual** — English (default) + Indonesian toggle, via a lightweight React context

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

All copy and project data is in **one file**: [src/content/data.ts](src/content/data.ts). Each text field is `{ en, id }`. Update there — components read from it automatically.

### TODO before publishing

- **GitHub URL** — set the real one in `PROFILE.github` in [src/content/data.ts](src/content/data.ts) (currently a placeholder).
- Update `metadataBase` in [src/app/layout.tsx](src/app/layout.tsx) to your real domain.

## Structure

```
src/
  app/
    layout.tsx        # fonts + LanguageProvider + metadata
    page.tsx          # section composition
    globals.css       # design tokens (@theme)
  components/
    LanguageProvider.tsx  # EN/ID context + t() helper
    TopNav.tsx
    Hero.tsx              # name, tagline, stat callouts, education badge
    Projects.tsx          # "markets table" of projects, expandable rows
    Experience.tsx
    Skills.tsx            # skills + awards
    Contact.tsx
    Footer.tsx            # light footer (Binance signature)
  content/
    data.ts           # ← all content here
```
