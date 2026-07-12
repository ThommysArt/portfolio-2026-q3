import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import {
  ArrowUpRight,
  Download,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react"
import { SITE, FEATURED_PROJECTS } from "@/lib/projects"
import { EXPERIENCE } from "@/lib/experience"
import { TECH_STACK } from "@/lib/tech"
import { SectionLabel } from "@/components/shared/section-label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/footer"
import { usePageTransition } from "@/components/layout/page-transition"
import { cn } from "@/lib/utils"

/**
 * Dedicated mobile home — natural document flow, no 100svh locks,
 * no scroll-hijacked horizontal gallery.
 */
export function MobileHome() {
  return (
    <div className="flex w-full flex-col pb-safe">
      <MobileHero />
      <MobileAbout />
      <MobileProjects />
      <MobileExperience />
      <MobileStack />
      <Footer />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Hero — compact, readable, no mega overflow
   ───────────────────────────────────────────── */

function MobileHero() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".m-hero-rule", { scaleX: 0, duration: 0.7, ease: "power3.inOut" }, 0.05)
      tl.from(".m-hero-line", { y: 18, opacity: 0, duration: 0.55, stagger: 0.05 }, 0.12)
      tl.from(".m-hero-mega", { y: 36, opacity: 0, duration: 0.9, ease: "power4.out" }, 0.2)
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-between px-5 pb-8 pt-24"
    >
      <div>
        <div className="m-hero-rule h-px w-full origin-left bg-foreground/25" />

        <div className="m-hero-line mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-foreground/75">{SITE.role}</span>
          <span className="h-1 w-1 rotate-45 bg-foreground/30" aria-hidden />
          <span>{SITE.locationLine}</span>
        </div>

        <ul className="m-hero-line mt-4 space-y-1 font-display text-[11px] uppercase leading-relaxed tracking-[0.14em] text-foreground/65">
          {SITE.specialties.slice(1).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <a
          href={`mailto:${SITE.email}`}
          className="m-hero-line mt-5 inline-block break-all font-display text-[11px] uppercase tracking-[0.12em] text-foreground/85"
        >
          {SITE.email}
        </a>
      </div>

      <div className="mt-10">
        <h1
          className="m-hero-mega font-mega select-none text-foreground"
          style={{
            fontSize: "clamp(5.5rem, 28vw, 8.5rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.02em",
          }}
          aria-label={SITE.name}
        >
          {SITE.displayName}
        </h1>
        <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
          {SITE.tagline}
        </p>
        <p className="mt-6 font-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Scroll
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   About — stacked narrative, no cram
   ───────────────────────────────────────────── */

function MobileAbout() {
  return (
    <section id="about" className="border-t border-border px-5 py-16">
      <SectionLabel index="01" className="mb-5">
        About
      </SectionLabel>

      <h2 className="font-display text-[1.75rem] font-medium leading-[1.1] tracking-tight">
        Clean visuals.
        <br />
        <span className="text-foreground/40">Strong systems.</span>
        <br />
        Thoughtful motion.
      </h2>

      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
        {SITE.summary}
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        Building{" "}
        <span className="text-foreground/85">Enderix Finance</span> and{" "}
        <span className="text-foreground/85">reframe/ui</span> — product systems
        with deliberate motion.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-border pt-5">
        <div>
          <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Currently
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-foreground/90">
            Enderix · reframe/ui
          </dd>
        </div>
        <div>
          <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Based in
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-foreground/90">
            {SITE.locationLine}
          </dd>
        </div>
        <div>
          <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Working
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-foreground/90">
            Remote · Contract
          </dd>
        </div>
        <div>
          <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Open to
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-foreground/90">
            Product UI · Motion
          </dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-col gap-2.5">
        <Button
          asChild
          size="lg"
          className="h-12 w-full rounded-full font-display text-xs uppercase tracking-[0.18em]"
        >
          <a href={`mailto:${SITE.email}`}>
            Get in touch
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-12 w-full rounded-full border-foreground/20 font-display text-xs uppercase tracking-[0.18em]"
        >
          <a href={SITE.resumeUrl} target="_blank" rel="noreferrer">
            Resume
            <Download className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Projects — vertical cards, native scroll only
   ───────────────────────────────────────────── */

function MobileProjects() {
  const { navigateWithTransition } = usePageTransition()

  return (
    <section id="selected" className="border-t border-border py-16">
      <div className="px-5">
        <SectionLabel index="02" className="mb-5">
          Selected work
        </SectionLabel>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display max-w-[14rem] text-2xl font-medium tracking-tight">
            Featured projects.
          </h2>
          <button
            type="button"
            onClick={() => navigateWithTransition("/work")}
            className="shrink-0 font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            All →
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-8 px-5">
        {FEATURED_PROJECTS.map((project, index) => (
          <li key={project.id}>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-muted ring-1 ring-border">
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.images[0]}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    className="img-bw h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    loading="lazy"
                    className="img-bw h-full w-full object-cover"
                  />
                )}
                <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3.5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-display text-lg font-medium tracking-tight">
                      {project.title}
                    </h3>
                    <span className="font-display text-xs tabular-nums text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {project.categories.join(" · ")}
                  </p>
                </div>
                <span className="shrink-0 pt-1 font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 px-5">
        <button
          type="button"
          onClick={() => navigateWithTransition("/work")}
          className="flex h-14 w-full items-center justify-between rounded-sm bg-foreground px-5 text-background"
        >
          <span className="font-display text-sm uppercase tracking-[0.18em]">
            Full archive
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Experience — single-open accordion, auto height
   ───────────────────────────────────────────── */

function MobileExperience() {
  const [openId, setOpenId] = useState<string | null>(EXPERIENCE[0]?.id ?? null)

  return (
    <section id="experience" className="border-t border-border px-5 py-16">
      <SectionLabel index="03" className="mb-5">
        Experience
      </SectionLabel>

      <h2 className="font-display text-2xl font-medium tracking-tight">
        Contract work & shipping systems.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Deep in Enderix Finance for Cameroonian enterprises, building reframe/ui,
        and selective design & frontend contracts.
      </p>

      <div className="mt-8 border-t border-border">
        {EXPERIENCE.map((job) => {
          const isOpen = openId === job.id
          return (
            <div key={job.id} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : job.id)}
                className="flex w-full items-start justify-between gap-3 py-5 text-left"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-base font-medium tracking-tight">
                      {job.company}
                    </span>
                    {job.current && (
                      <Badge
                        variant="outline"
                        className="rounded-full border-foreground/25 px-2 py-0 font-display text-[9px] uppercase tracking-wider"
                      >
                        Now
                      </Badge>
                    )}
                  </div>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {job.role}
                  </span>
                  <span className="mt-1 block font-display text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                <span
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors",
                    isOpen && "border-foreground bg-foreground text-background",
                  )}
                >
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-5"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="mb-2 font-display text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {job.type}
                  </p>
                  <ul className="space-y-2">
                    {job.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-foreground/80"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                  {job.href && (
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-foreground/70"
                    >
                      Visit
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="mt-8 h-12 w-full rounded-full border-foreground/25 font-display text-xs uppercase tracking-[0.18em]"
      >
        <a href={SITE.resumeUrl} download="Keabou-Thomson-Resume.pdf">
          <Download className="h-3.5 w-3.5" />
          Download resume
        </a>
      </Button>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Stack + close CTA
   ───────────────────────────────────────────── */

function MobileStack() {
  return (
    <section id="stack" className="border-t border-border px-5 py-16">
      <SectionLabel index="04" className="mb-5">
        Stack
      </SectionLabel>

      <h2 className="font-display text-2xl font-medium tracking-tight">
        Tools I reach for daily.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Same monochrome set across product, motion, and systems.
      </p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {TECH_STACK.map((tech) => (
          <a
            key={tech.name}
            href={tech.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/40"
            aria-label={tech.name}
          >
            <img
              src={tech.icon}
              alt=""
              width={20}
              height={20}
              className="h-4 w-4 opacity-75"
              loading="lazy"
            />
          </a>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Open to work
        </p>
        <p className="mt-2 font-display text-xl font-medium tracking-tight">
          Building the next interface.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Product UI, motion systems, selective full-stack — remote from{" "}
          {SITE.location}.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-full font-display text-xs uppercase tracking-[0.18em]"
          >
            <a href={`mailto:${SITE.email}`}>
              {SITE.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-full border-foreground/20 font-display text-xs uppercase tracking-[0.18em]"
          >
            <a href={SITE.resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
