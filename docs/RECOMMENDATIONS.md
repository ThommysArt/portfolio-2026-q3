# Portfolio — deferred recommendations

Saved from the 2026-Q3 review. Items below were **not** implemented in the first motion/perf pass (user deferred). Pick up when ready.

## Features & product surface

### Case study routes (highest product value)
- Add `/work/:id` with problem → role → stack → outcomes
- 3–6 stills + one loop; “Live site” + “Next project” using existing curtain transitions
- Even 2–3 deep case studies beat many thin external links for hiring

### Elevate real product work vs templates
- Featured should lead with **Enderix Finance** (stills/metrics even if private) and **reframe/ui**
- Templates as craft demos, not the whole story

### Archive filters
- Category chips + year + “Featured only”
- Layout animation on filter (Motion already in stack)

### Contact that converts
- Short form and/or Cal.com embed (mailto is weak on mobile)
- Explicit availability state (“Open for Q3” / “Booked until…”)

### Light theme toggle
- Tokens already exist in `:root` / `.dark`
- Persist in `localStorage`; pure B&W invert stays on-brand

### Process / services strip
- 3–4 steps (Discover → System → Motion → Ship) or service tiles

### Social proof
- 1–2 short quotes or monochrome logos if available

### Lab / experiments index (`/lab`)
- Title, tech, year, link — frames WebGL/gallery work as intentional R&D

### Command palette (`⌘K`)
- Jump to sections, projects, resume, email, socials from existing data files

## Content & storytelling

| Gap | Suggestion |
|-----|------------|
| Avatar in `SITE` unused | Optional about portrait or footer mark (grayscale) |
| Thin project copy | One outcome line per project (perf, conversion, team size) |
| Marquee says “Three” | Add a real Three/R3F moment or drop the claim |
| Hash nav after transition | `setTimeout(700)` is fragile — resolve after `playReveal()` |
| Work page SEO | Route-level title/description for `/work` (+ case studies) |

## Performance & quality (later)

1. Blur-up / LQIP for remote images; explicit width/height
2. Self-host critical posters or responsive sizes
3. Prefetch `/work` on idle after entry
4. Lighthouse pass on mobile tree
5. Optional analytics (Plausible / Vercel)

## Accessibility

- Full `prefers-reduced-motion` path was **intentionally skipped** for now (motion is core to the experience). Revisit if compliance or client requirements demand it:
  - Skip entry stairs / page curtains
  - Disable Lenis
  - Stacked cards instead of horizontal scroll hijack

## What not to do

- More full-viewport sections without new narrative
- Heavy WebGL on the home shell (keep for `/lab`)
- Autoplay sound, particle spam, multi-color accents
- Double cursor systems (global cursor already owns hover labels)

---

## Implemented in first pass (reference)

1. Asset-aware entry loader (fonts + featured posters)
2. Hero scroll opacity fade
3. Scroll-linked line opacity text (SplitText + ScrollTrigger)
4. Shared IntersectionObserver video play/pause
5. Performant global custom cursor
6. Magnetic CTAs
7. GSAP experience accordion (subtle)
8. Nav bar as document scroll progress + active section
9. Archive lag fixes (media mounts only when open; no autoplay-all)
10. Local time labeled WAT · GMT+1
