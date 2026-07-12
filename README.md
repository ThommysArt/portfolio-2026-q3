# Keabou Thomson — Portfolio 2026 Q3

Minimal black & white portfolio with refined typography and motion-first interactions.

## Stack

- **Vite** + React 19 + TypeScript
- **Tailwind CSS v4** + **shadcn/ui**
- **GSAP** (entry stairs, page transitions, scroll reveals)
- **Lenis** smooth scroll
- **Motion** (archive hover cursor / expand)
- Fonts: **Instrument Sans** (display) · **Manrope** (body)

## Structure

| Route   | Content |
|---------|---------|
| `/`     | Entry loader → Hero, About, Selected work, Experience, Tech stack |
| `/work` | Full project archive (desktop: list + cursor preview · mobile: cards) |
| `*`     | 404 |

**Mobile** uses a dedicated UI tree (`src/components/mobile/`) — natural document flow, no `100svh` section locks, no scroll-hijacked horizontal gallery. Desktop keeps the sticky gallery + marquees.

**Social** — `public/og.png` (1200×630) wired as Open Graph / Twitter card.

## Develop

```bash
pnpm install
pnpm dev
```

```bash
pnpm build
pnpm preview
```

## Content

- Projects: `src/lib/projects.ts` (`featured: true` = home selection)
- Experience: `src/lib/experience.ts`
- Tech icons: `src/lib/tech.ts` (simpleicons CDN, monochrome)

## Design notes

- Dark-first pure B&W system (`oklch` tokens in `src/index.css`)
- Entry staircase + route curtain transitions
- Archive row invert hover preserved from 2025 portfolio
