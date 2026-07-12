import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { FEATURED_PROJECTS } from "@/lib/projects"
import { SectionLabel } from "@/components/shared/section-label"
import { usePageTransition } from "@/components/layout/page-transition"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export function SelectedProjects() {
  const rootRef = useRef<HTMLElement>(null)
  const { navigateWithTransition } = usePageTransition()

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="selected" className="shell w-full py-20 md:py-28">
      <SectionLabel index="01">Selected work</SectionLabel>

      <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display max-w-3xl text-3xl font-medium tracking-tight md:text-5xl lg:text-6xl">
          A few pieces that define the practice.
        </h2>
        <button
          type="button"
          onClick={() => navigateWithTransition("/work")}
          className="group inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          View archive
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Wider cinematic media — 16/9-ish for the source assets */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-5 lg:gap-6 xl:gap-8">
        {FEATURED_PROJECTS.map((project, index) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className={`project-card group relative flex flex-col ${
              index % 2 === 1 ? "md:mt-20 xl:mt-28" : ""
            }`}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-muted ring-1 ring-border">
              {project.video ? (
                <video
                  src={project.video}
                  poster={project.images[0]}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="img-bw h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              ) : (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="img-bw h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background opacity-0 translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-medium tracking-tight md:text-2xl">
                    {project.title}
                  </h3>
                  <span className="font-display text-xs text-muted-foreground tabular-nums">
                    {project.year}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {project.categories.join(" · ")}
                </p>
              </div>
              <span className="font-display pt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-14 flex justify-center md:mt-20">
        <Button
          variant="outline"
          size="lg"
          className="font-display rounded-full border-foreground/20 bg-transparent px-8 text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background"
          onClick={() => navigateWithTransition("/work")}
        >
          All projects
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </section>
  )
}
