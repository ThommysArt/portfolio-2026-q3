import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { FEATURED_PROJECTS } from "@/lib/projects"
import { SectionLabel } from "@/components/shared/section-label"
import { AutoVideo } from "@/components/shared/auto-video"
import { Magnetic } from "@/components/shared/magnetic"
import { usePageTransition } from "@/components/layout/page-transition"

gsap.registerPlugin(ScrollTrigger)

/**
 * Horizontal project gallery driven by vertical scroll.
 *
 * Cards share a fixed media height (equal row) while width follows
 * each asset's aspect via h-full + w-auto — so nothing balloons to
 * full viewport width. Sticky + section height for Lenis-safe spacing.
 *
 * Videos use shared IntersectionObserver (AutoVideo) — only the
 * near-viewport card decodes/plays.
 */
export function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const { navigateWithTransition } = usePageTransition()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    let lastIndex = -1

    const getDistance = () => {
      return Math.max(0, track.scrollWidth - window.innerWidth)
    }

    let lastHeight = ""
    const applySectionHeight = () => {
      const distance = getDistance()
      const next = `${window.innerHeight + distance + 32}px`
      if (next === lastHeight) return
      lastHeight = next
      section.style.height = next
    }

    const ctx = gsap.context(() => {
      applySectionHeight()

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
          onRefresh: applySectionHeight,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`
            }

            const total = FEATURED_PROJECTS.length
            const idx = Math.min(
              total - 1,
              Math.floor(self.progress * total + 0.001),
            )
            if (idx !== lastIndex && indexRef.current) {
              lastIndex = idx
              indexRef.current.textContent = String(idx + 1).padStart(2, "0")
            }
          },
        },
      })

      gsap.fromTo(
        ".projects-chrome",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        },
      )
    }, section)

    const refresh = () => {
      applySectionHeight()
      ScrollTrigger.refresh()
    }

    window.addEventListener("load", refresh)
    window.addEventListener("resize", refresh)

    const media = track.querySelectorAll("img, video")
    media.forEach((el) => {
      el.addEventListener("loadeddata", refresh)
      el.addEventListener("load", refresh)
    })

    const ro = new ResizeObserver(() => {
      applySectionHeight()
      ScrollTrigger.refresh()
    })
    ro.observe(track)

    const raf = requestAnimationFrame(refresh)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("load", refresh)
      window.removeEventListener("resize", refresh)
      media.forEach((el) => {
        el.removeEventListener("loadeddata", refresh)
        el.removeEventListener("load", refresh)
      })
      ro.disconnect()
      ctx.revert()
      section.style.height = ""
    }
  }, [])

  const total = FEATURED_PROJECTS.length

  return (
    <section ref={sectionRef} id="selected" className="relative w-full">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden bg-background">
        <div className="projects-chrome shell shrink-0 pt-24 md:pt-28">
          <SectionLabel index="02" className="mb-5 md:mb-6">
            Selected work
          </SectionLabel>

          <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display max-w-2xl text-2xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              Scroll to explore the work.
            </h2>
            <Magnetic strength={0.2} max={10}>
              <button
                type="button"
                data-cursor="view"
                data-cursor-label="Archive"
                onClick={() => navigateWithTransition("/work")}
                className="group inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
              >
                View archive
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max items-start gap-5 will-change-transform md:gap-7 pl-5 pr-10 md:pl-8 md:pr-16 lg:pl-10 xl:pl-14"
          >
            {FEATURED_PROJECTS.map((project, index) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                data-cursor-label="Open"
                className="project-card group relative flex w-max shrink-0 flex-col"
              >
                <div
                  className="relative w-max overflow-hidden rounded-sm bg-muted ring-1 ring-border
                    h-[240px] sm:h-[280px] md:h-[340px] lg:h-[400px] xl:h-[440px]"
                >
                  {project.video ? (
                    <AutoVideo
                      src={project.video}
                      poster={project.images[0]}
                      className="img-bw block h-full w-auto max-w-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                    />
                  ) : (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="img-bw block h-full w-auto max-w-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background opacity-0 translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-4 md:right-4 md:h-10 md:w-10">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-4 flex max-w-[min(100%,28rem)] items-start justify-between gap-4 md:mt-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
                      <h3 className="font-display text-lg font-medium tracking-tight md:text-2xl">
                        {project.title}
                      </h3>
                      <span className="font-display text-xs text-muted-foreground tabular-nums">
                        {project.year}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {project.categories.join(" · ")}
                    </p>
                  </div>
                  <span className="font-display pt-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </a>
            ))}

            <Magnetic strength={0.18} max={12} className="shrink-0">
              <button
                type="button"
                data-cursor="view"
                data-cursor-label="All"
                onClick={() => navigateWithTransition("/work")}
                className="group relative flex w-max shrink-0 flex-col"
              >
                {/* Same media height as project cards + 16:9 so width matches typical work */}
                <div
                  className="flex aspect-video flex-col items-center justify-center rounded-sm bg-foreground px-8 text-center text-background ring-1 ring-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]
                    h-[240px] w-auto sm:h-[280px] md:h-[340px] lg:h-[400px] xl:h-[440px]"
                >
                  <span className="font-display text-[10px] uppercase tracking-[0.32em] text-background/55 md:text-xs">
                    Archive
                  </span>
                  <span className="mt-4 font-display text-2xl font-medium tracking-tight md:text-3xl lg:text-4xl">
                    All projects
                  </span>
                  <span className="mt-2 max-w-[16rem] text-sm text-background/55">
                    Browse the full body of work
                  </span>
                  <span className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-500 group-hover:rotate-45 md:h-14 md:w-14">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                {/* Caption slot — matches project meta row height */}
                <div className="mt-4 h-[3.25rem] md:mt-5 md:h-[3.5rem]" aria-hidden />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="projects-chrome shell shrink-0 py-5 md:py-6">
          <div className="flex items-center gap-4 md:gap-6">
            <span className="font-display w-14 shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground tabular-nums md:w-16">
              <span ref={indexRef}>01</span>
              {" / "}
              {String(total).padStart(2, "0")}
            </span>
            <div className="relative h-px flex-1 bg-border">
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-foreground"
              />
            </div>
            <span className="hidden font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:inline">
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
