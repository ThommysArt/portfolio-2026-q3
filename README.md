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
| `/`     | Entry loader → Hero, Selected work (4), Experience, Tech stack, About |
| `/work` | Full project archive (list + expand + cursor preview) |

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
