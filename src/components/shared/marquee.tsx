import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

type MarqueeProps = {
  items: string[]
  /** Reverse scroll direction */
  reverse?: boolean
  className?: string
  /**
   * How far the strip travels relative to its width while in view.
   * Keep small — 0.08 ≈ subtle parallax, not a full slide.
   */
  travel?: number
}

/**
 * Scroll-linked marquee (no autoplay).
 * Driven by ScrollTrigger scrub — works with Lenis via shared ticker.
 * High-contrast inverted B&W strip.
 */
export function Marquee({
  items,
  reverse = false,
  className,
  travel = 0.08,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const sequence = items.filter(Boolean)
  // Duplicate so the strip always feels dense edge-to-edge
  const strip = Array.from({ length: 6 }, () => sequence).flat()

  useLayoutEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track || sequence.length === 0) return

    const ctx = gsap.context(() => {
      // Cap absolute travel so long strips don't still whip across
      const getShift = () =>
        Math.min(140, Math.max(48, track.scrollWidth * travel))

      gsap.fromTo(
        track,
        { x: () => (reverse ? -getShift() : 0) },
        {
          x: () => (reverse ? 0 : -getShift()),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [reverse, travel, sequence.length])

  if (sequence.length === 0) return null

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative w-full overflow-hidden bg-foreground text-background",
        className,
      )}
      aria-hidden
    >
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform py-5 md:py-6"
      >
        {strip.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center">
            <span className="font-display px-5 text-sm uppercase tracking-[0.32em] text-background md:px-8 md:text-base md:tracking-[0.38em]">
              {item}
            </span>
            <span
              className="mx-0.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-background/45 md:h-2 md:w-2"
              aria-hidden
            />
          </span>
        ))}
      </div>
    </div>
  )
}
