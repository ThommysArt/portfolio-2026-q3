import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { TECH_STACK } from "@/lib/tech"
import { SITE } from "@/lib/projects"
import { SectionLabel } from "@/components/shared/section-label"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

gsap.registerPlugin(ScrollTrigger)

/**
 * Stack + compact footer share one viewport (~100svh) and one snap point.
 */
export function TechStack() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-btn",
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            once: true,
          },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="stack"
      className="flex h-[100svh] min-h-[100svh] w-full flex-col"
    >
      <div className="shell flex min-h-0 flex-1 flex-col justify-center py-10 md:py-12">
        <SectionLabel index="04" className="mb-5 md:mb-6">
          Stack
        </SectionLabel>

        <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl lg:text-[2.75rem]">
            Tools I reach for daily.
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Monochrome for synergy — the same set across product, motion, and systems
            work.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4">
          {TECH_STACK.map((tech) => (
            <Tooltip key={tech.name}>
              <TooltipTrigger asChild>
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noreferrer"
                  className="tech-btn group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/40 transition-colors hover:border-foreground/40 hover:bg-secondary md:h-14 md:w-14"
                  aria-label={tech.name}
                >
                  <img
                    src={tech.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100"
                    loading="lazy"
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="font-display text-[10px] uppercase tracking-[0.2em]"
              >
                {tech.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Closing band — fills the unit without bloating the footer */}
        <div className="mt-10 flex flex-col gap-6 border-t border-border pt-8 md:mt-12 md:flex-row md:items-end md:justify-between md:pt-10">
          <div className="max-w-md">
            <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Open to work
            </p>
            <p className="mt-2 font-display text-xl font-medium tracking-tight md:text-2xl">
              Building the next interface.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Available for product UI, motion systems, and selective full-stack
              contracts — remote from {SITE.location}.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full font-display text-xs uppercase tracking-[0.18em]"
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
              className="rounded-full border-foreground/20 font-display text-xs uppercase tracking-[0.18em]"
            >
              <a href={SITE.resumeUrl} target="_blank" rel="noreferrer">
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer compact />
    </section>
  )
}
