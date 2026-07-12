import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { SITE } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { usePageTransition } from "@/components/layout/page-transition"
import { MobileNotFound } from "@/components/mobile/mobile-not-found"
import { useIsMobile } from "@/hooks/use-is-mobile"

/**
 * 404 — separate mobile / desktop trees (same pattern as home + work).
 */
export function NotFoundPage() {
  const isMobile = useIsMobile()
  if (isMobile) return <MobileNotFound />
  return <DesktopNotFound />
}

/**
 * Desktop 404 — mega number dead-centered in the viewport;
 * chrome floats top / bottom around it.
 */
function DesktopNotFound() {
  const rootRef = useRef<HTMLElement>(null)
  const { navigateWithTransition } = usePageTransition()

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".nf-rule", { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, 0.05)
      tl.from(".nf-chrome", { y: 14, opacity: 0, duration: 0.55, stagger: 0.08 }, 0.15)
      tl.from(
        ".nf-code",
        { scale: 0.92, opacity: 0, duration: 1.1, ease: "power4.out" },
        0.12,
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden pt-24"
    >
      {/* Top chrome */}
      <div className="shell relative z-10">
        <div className="nf-rule h-px w-full origin-left bg-foreground/25" />
        <div className="nf-chrome flex items-start justify-between gap-8 py-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span className="text-foreground/80">Error</span>
              <span className="h-1 w-1 rotate-45 bg-foreground/30" aria-hidden />
              <span>Page not found</span>
              <span className="h-1 w-1 rotate-45 bg-foreground/30" aria-hidden />
              <span>{SITE.locationCoords}</span>
            </div>
            <p className="mt-2 font-display text-base tracking-tight text-foreground/85">
              This route doesn&apos;t exist.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap justify-end gap-2">
            <Button
              size="sm"
              className="h-9 rounded-full font-display text-[10px] uppercase tracking-[0.18em]"
              onClick={() => navigateWithTransition("/")}
            >
              <ArrowLeft className="h-3 w-3" />
              Home
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 rounded-full border-foreground/20 font-display text-[10px] uppercase tracking-[0.18em]"
            >
              <a
                href="/work"
                onClick={(e) => {
                  e.preventDefault()
                  navigateWithTransition("/work")
                }}
              >
                Work
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="h-9 rounded-full font-display text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              <a href={`mailto:${SITE.email}`}>Contact</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Centered mega 404 — optical center of full viewport */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p
          className="nf-code font-mega select-none text-foreground"
          style={{
            fontSize: "clamp(12rem, 38vw, 28rem)",
            lineHeight: 0.75,
            letterSpacing: "-0.04em",
          }}
          aria-label="404 — page not found"
        >
          <span className="block whitespace-nowrap">404</span>
        </p>
        <p className="sr-only">Page not found. Return home or browse work.</p>
      </div>

      {/* Bottom caption */}
      <div className="nf-chrome shell absolute inset-x-0 bottom-0 z-10 pb-8 md:pb-10">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:text-xs">
          {SITE.name} · Portfolio
        </p>
      </div>
    </section>
  )
}
