import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SITE } from "@/lib/projects"

gsap.registerPlugin(ScrollTrigger)

/**
 * Rosa-inspired hero with a tall experimental display wordmark.
 * Entrance timeline + scroll-linked opacity fade as you leave the section.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current || !fadeRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".hero-rule", { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, 0.1)
      tl.from(".hero-meta-col", { y: 28, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.2)
      tl.from(
        ".hero-mega",
        { yPercent: 40, opacity: 0, duration: 1.2, ease: "power4.out" },
        0.25,
      )

      // Opacity only as hero scrolls away — calm, not overdone
      gsap.to(fadeRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.45,
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative flex h-[100svh] min-h-[100svh] flex-col overflow-hidden pt-20 md:pt-24"
    >
      <div ref={fadeRef} className="flex min-h-0 flex-1 flex-col will-change-[opacity]">
        {/* Upper field — meta lives here; name owns the bottom half+ */}
        <div className="flex min-h-0 flex-[0.42] flex-col justify-end">
          <div className="shell">
            <div className="hero-rule h-px w-full origin-left bg-foreground/25" />
          </div>

          <div className="shell py-5 md:py-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              <div className="hero-meta-col">
                <ul className="font-display text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground md:text-xs">
                  {SITE.specialties.map((line) => (
                    <li key={line} className="text-foreground/70">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hero-meta-col hidden sm:block">
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Mail
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  data-cursor="hover"
                  data-cursor-label="Mail"
                  className="mt-1.5 block break-all font-display text-[11px] uppercase tracking-[0.12em] text-foreground/85 transition-opacity hover:opacity-60 md:text-xs"
                >
                  {SITE.email}
                </a>
              </div>

              <div className="hero-meta-col hidden lg:block lg:text-right">
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {SITE.locationCoords}
                </p>
                <p className="mt-1.5 font-display text-[11px] uppercase tracking-[0.12em] text-foreground/85 md:text-xs">
                  {SITE.location}
                </p>
                <p className="mt-0.5 font-display text-[11px] uppercase tracking-[0.12em] text-muted-foreground md:text-xs">
                  Remote
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mega name — more than half the page tall; leave breathing room at bottom */}
        <div className="relative flex min-h-0 flex-[0.58] items-end overflow-hidden pb-8 md:pb-12 lg:pb-14">
          <div className="shell w-full">
            <h1
              className="hero-mega font-mega select-none text-foreground"
              style={{
                fontSize: "clamp(7rem, 52svh, 56svh)",
                marginBottom: "-0.04em",
              }}
              aria-label={SITE.name}
            >
              <span className="block whitespace-nowrap">{SITE.displayName}</span>
            </h1>
            <p className="sr-only">
              {SITE.name} — {SITE.role}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
