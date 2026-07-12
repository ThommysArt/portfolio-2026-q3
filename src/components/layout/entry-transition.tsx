import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { SITE } from "@/lib/projects"
import { cn } from "@/lib/utils"

const ENTRY_KEY = "portfolio-entry-seen"

interface EntryTransitionProps {
  durationMs?: number
  bars?: number
  onComplete?: () => void
}

export function EntryTransition({
  durationMs = 1800,
  bars = 6,
  onComplete,
}: EntryTransitionProps) {
  const [done, setDone] = useState(() => {
    try {
      return sessionStorage.getItem(ENTRY_KEY) === "1"
    } catch {
      return false
    }
  })
  const rootRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const stairsRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    if (done || !rootRef.current) return

    let completed = false
    const ctx = gsap.context(() => {
      gsap.set(stairsRefs.current, { yPercent: 0, opacity: 1 })
      if (fillRef.current) gsap.set(fillRef.current, { scaleX: 0, transformOrigin: "left center" })

      const counter = { value: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          completed = true
          try {
            sessionStorage.setItem(ENTRY_KEY, "1")
          } catch {
            /* ignore */
          }
          setDone(true)
          onComplete?.()
        },
      })

      tl.to(
        counter,
        {
          value: 100,
          duration: durationMs / 1000,
          ease: "none",
          onUpdate: () => {
            if (percentRef.current) {
              percentRef.current.textContent = `${Math.round(counter.value)}`
            }
          },
        },
        0,
      )

      tl.to(
        fillRef.current,
        {
          scaleX: 1,
          duration: durationMs / 1000,
          ease: "none",
        },
        0,
      )

      // Title letter reveal
      tl.from(
        ".entry-char",
        {
          yPercent: 110,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.025,
        },
        0.15,
      )

      tl.to(
        centerRef.current,
        {
          autoAlpha: 0,
          y: -12,
          duration: 0.35,
          ease: "power2.in",
        },
        durationMs / 1000,
      )

      // Stairs rise up (Olivier Larose style curtain)
      tl.to(
        stairsRefs.current,
        {
          yPercent: -101,
          duration: 0.85,
          ease: "power4.inOut",
          stagger: { each: 0.07, from: "start" },
        },
        durationMs / 1000 + 0.05,
      )
    }, rootRef)

    return () => {
      // Only tear down mid-flight (StrictMode remount). If already done, leave state.
      if (!completed) ctx.revert()
    }
  }, [bars, durationMs, onComplete, done])

  if (done) return null

  const nameChars = SITE.name.split("")

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] pointer-events-none"
      aria-hidden
    >
      {/* Center content */}
      <div className="fixed inset-0 z-[1001] flex items-center justify-center">
        <div ref={centerRef} className="flex flex-col items-center gap-8 px-6">
          <p className="font-display text-[10px] md:text-xs uppercase tracking-[0.35em] text-foreground/50">
            Portfolio · 2026
          </p>

          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight overflow-hidden">
            <span className="inline-flex">
              {nameChars.map((char, i) => (
                <span
                  key={i}
                  className="entry-char inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : undefined }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          <div className="flex w-[min(70vw,16rem)] flex-col gap-3">
            <div className="relative h-px w-full overflow-hidden bg-foreground/15">
              <div
                ref={fillRef}
                className="absolute inset-y-0 left-0 w-full origin-left bg-foreground"
              />
            </div>
            <div className="flex justify-between font-display text-[10px] uppercase tracking-[0.25em] text-foreground/45">
              <span>Loading</span>
              <span>
                <span ref={percentRef}>0</span>%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical stair panels */}
      <div className="fixed inset-0 z-[1000] flex" role="presentation">
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              stairsRefs.current[i] = el
            }}
            className={cn("h-full bg-background border-r border-foreground/[0.04] last:border-r-0")}
            style={{ width: `${100 / bars}%` }}
          />
        ))}
      </div>
    </div>
  )
}
