import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Download, Plus, Minus } from "lucide-react"
import { EXPERIENCE } from "@/lib/experience"
import { SITE } from "@/lib/projects"
import { SectionLabel } from "@/components/shared/section-label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function ExperienceSection() {
  const rootRef = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>(EXPERIENCE[0]?.id ?? null)

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
        <h2 className="font-display text-3xl font-medium tracking-tight md:col-span-6 md:text-5xl lg:text-6xl">
          Contract work, product craft, and shipping systems.
        </h2>
        <div className="flex flex-col gap-4 md:col-span-6 md:items-end md:text-right">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base md:max-w-md">
            Currently deep in{" "}
            <span className="text-foreground">Enderix Finance</span> — a modern ERP for
            Cameroonian enterprises — for about eight months. Alongside that I build
            reframe/ui and take selective design & frontend contracts.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-fit rounded-full border-foreground/25 font-display text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background"
          >
            <a href={SITE.resumeUrl} download="Keabou-Thomson-Resume.pdf">
              <Download className="h-3.5 w-3.5" />
              Download resume
            </a>
          </Button>
        </div>
      </div>

      <div className="min-h-0 border-t border-border">
        {EXPERIENCE.map((job) => {
          const isOpen = openId === job.id
          return (
            <div key={job.id} className="exp-row border-b border-border">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : job.id)}
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
                className={cn(
                  "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isOpen ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="max-w-3xl space-y-3">
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
                        className="inline-flex items-center gap-1.5 pt-2 font-display text-xs uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-foreground"
                      >
                        Visit
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
