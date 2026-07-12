import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TECH_STACK } from "@/lib/tech"
import { SectionLabel } from "@/components/shared/section-label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

gsap.registerPlugin(ScrollTrigger)

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
    <section ref={rootRef} id="stack" className="shell w-full py-16 md:py-24">
      <SectionLabel index="03">Stack</SectionLabel>

      <div className="mb-10 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
          Tools I reach for daily.
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Monochrome for synergy — the same set across product, motion, and systems work.
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
                className="tech-btn group flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card/40 transition-colors hover:border-foreground/40 hover:bg-secondary md:h-16 md:w-16"
                aria-label={tech.name}
              >
                <img
                  src={tech.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100 md:h-6 md:w-6"
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
    </section>
  )
}
