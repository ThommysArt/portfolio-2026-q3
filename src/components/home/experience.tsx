import { useLayoutEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Download, Plus, Minus } from "lucide-react"
import { EXPERIENCE } from "@/lib/experience"
import { SITE } from "@/lib/projects"
import { SectionLabel } from "@/components/shared/section-label"
import { ScrollOpacityText } from "@/components/shared/scroll-opacity-text"
import { Magnetic } from "@/components/shared/magnetic"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function ExperienceSection() {
  const rootRef = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>(EXPERIENCE[0]?.id ?? null)
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-row",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            once: true,
          },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // Initial open panel height (no animation on first paint)
  useLayoutEffect(() => {
    EXPERIENCE.forEach((job) => {
      const panel = panelRefs.current[job.id]
      if (!panel) return
      if (job.id === openId) {
        gsap.set(panel, { height: "auto", opacity: 1 })
      } else {
        gsap.set(panel, { height: 0, opacity: 0 })
      }
    })
    // openId intentionally only for initial snapshot
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = useCallback((id: string) => {
    const next = openId === id ? null : id
    const duration = 0.42
    const ease = "power3.inOut"

    EXPERIENCE.forEach((job) => {
      const panel = panelRefs.current[job.id]
      const content = contentRefs.current[job.id]
      if (!panel || !content) return

      const shouldOpen = job.id === next
      const isCurrentlyOpen = job.id === openId

      if (shouldOpen && !isCurrentlyOpen) {
        // Measure natural height
        gsap.set(panel, { height: "auto", opacity: 1 })
        const target = panel.offsetHeight
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0.4 },
          {
            height: target,
            opacity: 1,
            duration,
            ease,
            onComplete: () => {
              gsap.set(panel, { height: "auto" })
            },
          },
        )
        gsap.fromTo(
          content.children,
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.out",
            delay: 0.08,
          },
        )
      } else if (!shouldOpen && isCurrentlyOpen) {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: duration * 0.85,
          ease,
        })
      }
    })

    setOpenId(next)
  }, [openId])

  return (
    <section
      ref={rootRef}
      id="experience"
      className="shell flex h-[100svh] min-h-[100svh] w-full flex-col justify-center overflow-y-auto py-24 md:py-28"
    >
      <SectionLabel index="03" className="mb-6 md:mb-8">
        Experience
      </SectionLabel>

      <div className="mb-8 grid gap-5 md:mb-10 md:grid-cols-12 md:gap-10 md:items-end">
        <ScrollOpacityText
          as="h2"
          className="font-display text-3xl font-medium tracking-tight md:col-span-6 md:text-5xl lg:text-6xl"
          minOpacity={0.16}
          falloff={0.45}
        >
          Contract work, product craft, and shipping systems.
        </ScrollOpacityText>
        <div className="flex flex-col gap-4 md:col-span-6 md:items-end md:text-right">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base md:max-w-md">
            Currently deep in{" "}
            <span className="text-foreground">Enderix Finance</span> — a modern ERP for
            Cameroonian enterprises — for about eight months. Alongside that I build
            reframe/ui and take selective design & frontend contracts.
          </p>
          <Magnetic strength={0.22}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-fit rounded-full border-foreground/25 font-display text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background"
            >
              <a
                href={SITE.resumeUrl}
                download="Keabou-Thomson-Resume.pdf"
                data-cursor="external"
                data-cursor-label="CV"
              >
                <Download className="h-3.5 w-3.5" />
                Download resume
              </a>
            </Button>
          </Magnetic>
        </div>
      </div>

      <div className="min-h-0 border-t border-border">
        {EXPERIENCE.map((job) => {
          const isOpen = openId === job.id
          return (
            <div key={job.id} className="exp-row border-b border-border">
              <button
                type="button"
                onClick={() => toggle(job.id)}
                data-cursor="hover"
                className="group flex w-full items-start justify-between gap-4 py-6 text-left md:items-center md:py-7"
              >
                <div className="grid flex-1 gap-2 md:grid-cols-12 md:items-center md:gap-4">
                  <div className="md:col-span-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-lg font-medium tracking-tight md:text-xl">
                        {job.company}
                      </span>
                      {job.current && (
                        <Badge
                          variant="outline"
                          className="rounded-full border-foreground/25 px-2 py-0 font-display text-[10px] uppercase tracking-wider"
                        >
                          Now
                        </Badge>
                      )}
                    </div>
                    <span className="mt-1 block text-sm text-muted-foreground md:hidden">
                      {job.role}
                    </span>
                  </div>
                  <span className="hidden font-display text-sm text-muted-foreground md:col-span-3 md:block">
                    {job.role}
                  </span>
                  <span className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground md:col-span-3">
                    {job.period}
                  </span>
                  <span className="hidden text-xs text-muted-foreground md:col-span-1 md:block">
                    {job.type.split("·")[0].trim()}
                  </span>
                </div>
                <span
                  className={cn(
                    "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors",
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
                ref={(el) => {
                  panelRefs.current[job.id] = el
                }}
                className="overflow-hidden"
                style={{ height: isOpen ? "auto" : 0 }}
              >
                <div
                  ref={(el) => {
                    contentRefs.current[job.id] = el
                  }}
                  className="max-w-3xl space-y-3 pb-8"
                >
                  <p className="font-display text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {job.type}
                  </p>
                  <ul className="space-y-2.5">
                    {job.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-foreground/80 md:text-[15px]"
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
                      data-cursor="external"
                      className="inline-flex items-center gap-1.5 pt-2 font-display text-xs uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-foreground"
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
    </section>
  )
}
