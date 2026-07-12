import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { SITE } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { usePageTransition } from "@/components/layout/page-transition"

/**
 * Mobile 404 — compact document flow. Number is large but not
 * viewport-hijacking; chrome stays readable above the fold.
 */
export function MobileNotFound() {
  const rootRef = useRef<HTMLElement>(null)
  const { navigateWithTransition } = usePageTransition()

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".m-nf-rule", { scaleX: 0, duration: 0.7, ease: "power3.inOut" }, 0.05)
      tl.from(".m-nf-meta", { y: 14, opacity: 0, duration: 0.5, stagger: 0.05 }, 0.12)
      tl.from(".m-nf-code", { y: 28, opacity: 0, duration: 0.9, ease: "power4.out" }, 0.18)
      tl.from(".m-nf-copy", { y: 16, opacity: 0, duration: 0.55 }, 0.4)
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="flex min-h-[100svh] w-full flex-col justify-between px-5 pb-10 pt-24"
    >
      <div>
        <div className="m-nf-rule h-px w-full origin-left bg-foreground/25" />

        <div className="m-nf-meta mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-foreground/80">Error</span>
          <span className="h-1 w-1 rotate-45 bg-foreground/30" aria-hidden />
          <span>Page not found</span>
          <span className="h-1 w-1 rotate-45 bg-foreground/30" aria-hidden />
          <span>{SITE.locationCoords}</span>
        </div>

        <p
          className="m-nf-code font-mega mt-8 select-none text-foreground"
          style={{
            fontSize: "clamp(6.5rem, 28vw, 9rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.03em",
          }}
          aria-label="404 — page not found"
        >
          404
        </p>
      </div>

      <div className="m-nf-copy mt-10">
        <h1 className="font-display text-xl font-medium tracking-tight">
          This route doesn&apos;t exist.
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          The page you&apos;re looking for may have moved, or the link is wrong.
          Head home or browse the archive.
        </p>

        <div className="mt-7 flex flex-col gap-2.5">
          <Button
            size="lg"
            className="h-12 w-full rounded-full font-display text-xs uppercase tracking-[0.18em]"
            onClick={() => navigateWithTransition("/")}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-full border-foreground/20 font-display text-xs uppercase tracking-[0.18em]"
          >
            <a
              href="/work"
              onClick={(e) => {
                e.preventDefault()
                navigateWithTransition("/work")
              }}
            >
              View work
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-12 w-full rounded-full font-display text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            <a href={`mailto:${SITE.email}`}>
              Contact
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        <p className="mt-8 font-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {SITE.name} · Portfolio
        </p>
      </div>
    </section>
  )
}
