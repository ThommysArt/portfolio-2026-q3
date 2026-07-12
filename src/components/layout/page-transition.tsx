import { useLayoutEffect, useRef, useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import gsap from "gsap"
import { createContext, useContext, type ReactNode } from "react"

interface TransitionContextValue {
  navigateWithTransition: (to: string) => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

export function usePageTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider")
  return ctx
}

const BARS = 5

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  const pendingPath = useRef<string | null>(null)
  const isFirst = useRef(true)

  const playCover = useCallback(() => {
    return new Promise<void>((resolve) => {
      const bars = barsRef.current.filter(Boolean)
      gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: "all" })
      gsap.set(bars, { yPercent: 100 })

      gsap.to(bars, {
        yPercent: 0,
        duration: 0.55,
        ease: "power4.inOut",
        stagger: { each: 0.06, from: "end" },
        onComplete: () => resolve(),
      })
    })
  }, [])

  const playReveal = useCallback(() => {
    return new Promise<void>((resolve) => {
      const bars = barsRef.current.filter(Boolean)
      gsap.to(bars, {
        yPercent: -100,
        duration: 0.65,
        ease: "power4.inOut",
        stagger: { each: 0.06, from: "start" },
        onComplete: () => {
          gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" })
          resolve()
        },
      })
    })
  }, [])

  const navigateWithTransition = useCallback(
    async (to: string) => {
      if (to === location.pathname || isTransitioning) return
      setIsTransitioning(true)
      pendingPath.current = to
      await playCover()
      navigate(to)
      // reveal happens after location change effect
    },
    [location.pathname, isTransitioning, navigate, playCover],
  )

  useLayoutEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" })
      gsap.set(barsRef.current, { yPercent: -100 })
      return
    }

    if (!pendingPath.current) return

    const run = async () => {
      // small delay so new page paints under the cover
      await new Promise((r) => requestAnimationFrame(() => r(null)))
      window.scrollTo(0, 0)
      await playReveal()
      pendingPath.current = null
      setIsTransitioning(false)
    }
    void run()
  }, [location.pathname, playReveal])

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[900] flex pointer-events-none opacity-0"
        aria-hidden
      >
        {Array.from({ length: BARS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              barsRef.current[i] = el
            }}
            className="h-full bg-foreground"
            style={{ width: `${100 / BARS}%` }}
          />
        ))}
      </div>
    </TransitionContext.Provider>
  )
}
