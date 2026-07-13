import { useLayoutEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger, SplitText)

type ScrollOpacityTextProps = {
  children: ReactNode
  className?: string
  /**
   * Opacity at the farthest useful distance from viewport center.
   * Closer to center → approaches 1.
   */
  minOpacity?: number
  /**
   * How much of the viewport height maps full fade (0.5 = half-height).
   * Smaller = steeper falloff around center.
   */
  falloff?: number
  as?: "p" | "h2" | "h3" | "div"
}

/**
 * Awwwards-style line opacity: each line brightens as it approaches
 * the vertical center of the viewport and dims as it leaves.
 *
 * GSAP SplitText (lines) + one ScrollTrigger on the block.
 * Direct style writes on scroll — no per-line tweens.
 */
export function ScrollOpacityText({
  children,
  className,
  minOpacity = 0.18,
  falloff = 0.42,
  as: Tag = "div",
}: ScrollOpacityTextProps) {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    let split: SplitText | null = null
    let st: ScrollTrigger | null = null
    let lines: HTMLElement[] = []
    let resizeTimer = 0

    const update = () => {
      if (!lines.length) return
      const vh = window.innerHeight
      const center = vh * 0.5
      const range = Math.max(vh * falloff, 1)

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const rect = line.getBoundingClientRect()
        if (rect.bottom < -40 || rect.top > vh + 40) {
          line.style.opacity = String(minOpacity)
          continue
        }
        const mid = rect.top + rect.height * 0.5
        const t = Math.abs(mid - center) / range
        // Smoothstep falloff
        const k = t >= 1 ? 0 : 1 - t * t * (3 - 2 * t)
        line.style.opacity = String(minOpacity + (1 - minOpacity) * k)
      }
    }

    const setup = () => {
      st?.kill()
      split?.revert()

      split = SplitText.create(root, {
        type: "lines",
        linesClass: "sop-line",
        autoSplit: true,
        onSplit: (self) => {
          lines = self.lines as HTMLElement[]
          gsap.set(lines, { opacity: minOpacity })
          // Rebind ST after auto re-split (fonts/resize)
          st?.kill()
          st = ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            onUpdate: update,
            onRefresh: update,
          })
          update()
        },
      })

      lines = (split.lines as HTMLElement[]) || []
      if (lines.length && !st) {
        st = ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onUpdate: update,
          onRefresh: update,
        })
        update()
      }
    }

    const raf = requestAnimationFrame(setup)

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        setup()
        ScrollTrigger.refresh()
      }, 120)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      st?.kill()
      split?.revert()
    }
  }, [minOpacity, falloff, children])

  return (
    <Tag ref={rootRef as never} className={cn("sop-text", className)}>
      {children}
    </Tag>
  )
}
