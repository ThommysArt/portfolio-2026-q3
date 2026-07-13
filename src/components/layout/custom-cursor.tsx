import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Performant dual-layer cursor (dot + ring), Webflow-style:
 * - Single rAF loop, transform3d only (no left/top layout)
 * - Lerp ring slower than dot
 * - Event delegation for hover targets (no per-element listeners)
 * - Hidden on coarse pointers / touch
 *
 * Mark targets with:
 *   data-cursor="hover" | data-cursor="view" | data-cursor="external"
 * Optional label: data-cursor-label="Explore"
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // User wants animations always — still skip custom cursor on touch hardware
    if (!fine) return

    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!root || !dot || !ring || !label) return

    root.style.display = "block"
    document.documentElement.classList.add("has-custom-cursor")

    // Positions (raw pointer vs lerped)
    const mouse = { x: -100, y: -100 }
    const dotPos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }

    let hovering = false
    let visible = false
    let labelText = ""
    let raf = 0

    // Faster lerp = snappier. Ring trails slightly.
    // With reduced motion still show cursor but snap (user wants motion — only used as fallback)
    const DOT_LERP = reduce ? 1 : 0.55
    const RING_LERP = reduce ? 1 : 0.18

    const setHover = (on: boolean, text = "") => {
      if (hovering === on && labelText === text) return
      hovering = on
      labelText = text
      root.dataset.state = on ? "hover" : "default"
      if (text) {
        label.textContent = text
        root.dataset.label = "1"
      } else {
        label.textContent = ""
        root.dataset.label = "0"
      }
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visible) {
        visible = true
        root.dataset.visible = "1"
        // Snap on first show to avoid flying in from -100
        dotPos.x = ringPos.x = mouse.x
        dotPos.y = ringPos.y = mouse.y
      }
    }

    const onLeaveWindow = () => {
      visible = false
      root.dataset.visible = "0"
      setHover(false)
    }

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor], [data-magnetic]'

    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest?.(interactiveSelector)
      if (!t || t.getAttribute("aria-disabled") === "true") {
        setHover(false)
        return
      }
      const explicit = t.getAttribute("data-cursor")
      const customLabel = t.getAttribute("data-cursor-label")
      if (explicit === "none") {
        setHover(false)
        return
      }
      const text =
        customLabel ||
        (explicit === "view"
          ? "View"
          : explicit === "external"
            ? "Open"
            : "")
      setHover(true, text)
    }

    const tick = () => {
      // Lerp toward mouse
      dotPos.x += (mouse.x - dotPos.x) * DOT_LERP
      dotPos.y += (mouse.y - dotPos.y) * DOT_LERP
      ringPos.x += (mouse.x - ringPos.x) * RING_LERP
      ringPos.y += (mouse.y - ringPos.y) * RING_LERP

      // translate3d only — compositor-friendly
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate3d(-50%, -50%, 0)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate3d(-50%, -50%, 0)`

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeaveWindow)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-[1100] hidden",
        "[&[data-visible='0']]:opacity-0 [&[data-visible='1']]:opacity-100",
        "transition-opacity duration-200",
      )}
      aria-hidden
    >
      {/* Ring */}
      <div
        ref={ringRef}
        className={cn(
          "cursor-ring absolute top-0 left-0 will-change-transform",
          "h-10 w-10 rounded-full border border-foreground/80",
          "transition-[width,height,background-color,border-color,mix-blend-mode] duration-300 ease-out",
          "mix-blend-difference",
        )}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className={cn(
          "cursor-dot absolute top-0 left-0 will-change-transform",
          "flex h-1.5 w-1.5 items-center justify-center rounded-full bg-foreground",
          "transition-[width,height,background-color,opacity] duration-300 ease-out",
          "mix-blend-difference",
        )}
      >
        <span
          ref={labelRef}
          className={cn(
            "cursor-label pointer-events-none font-display text-[9px] uppercase tracking-[0.18em] text-background opacity-0 transition-opacity duration-200",
          )}
        />
      </div>

      <style>{`
        .has-custom-cursor,
        .has-custom-cursor * {
          cursor: none !important;
        }
        /* Generic interactive — grow ring only */
        [data-state="hover"] .cursor-ring {
          width: 3.25rem;
          height: 3.25rem;
          border-color: rgba(255, 255, 255, 0.95);
        }
        [data-state="hover"] .cursor-dot {
          width: 6px;
          height: 6px;
        }
        /* Labeled interactive — solid disc + text (Webflow-style) */
        [data-label="1"][data-state="hover"] .cursor-ring {
          width: 4.5rem;
          height: 4.5rem;
          border-color: transparent;
          opacity: 0;
        }
        [data-label="1"][data-state="hover"] .cursor-dot {
          width: 4.5rem;
          height: 4.5rem;
          background: #f5f5f5;
        }
        [data-label="1"][data-state="hover"] .cursor-label {
          opacity: 1;
          color: #0a0a0a;
        }
      `}</style>
    </div>
  )
}
