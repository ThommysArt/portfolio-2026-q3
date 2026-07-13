import {
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

type MagneticProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  /** 0–1 how strongly the element follows the pointer. Default 0.28 */
  strength?: number
  /** Max pixel travel. Default 14 */
  max?: number
  /** Disable on coarse pointers automatically */
  disabled?: boolean
}

/**
 * Subtle magnetic pull — Webflow-like, transform-only, quickTo lerp.
 * Wraps CTAs; child should be the interactive element (or use class on wrapper).
 */
export function Magnetic({
  children,
  strength = 0.28,
  max = 14,
  disabled = false,
  className,
  onMouseMove,
  onMouseLeave,
  ...rest
}: MagneticProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)
  const enabled =
    !disabled &&
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches

  const ensureQuickTo = () => {
    const el = rootRef.current
    if (!el || xTo.current) return
    xTo.current = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" })
    yTo.current = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" })
  }

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e)
    if (!enabled) return
    ensureQuickTo()
    const el = rootRef.current
    if (!el || !xTo.current || !yTo.current) return

    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    xTo.current(clamp(dx, -max, max))
    yTo.current(clamp(dy, -max, max))
  }

  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e)
    if (!enabled) return
    ensureQuickTo()
    xTo.current?.(0)
    yTo.current?.(0)
  }

  return (
    <div
      ref={rootRef}
      className={cn("inline-flex will-change-transform", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </div>
  )
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
