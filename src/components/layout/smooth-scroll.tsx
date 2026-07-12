import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "lenis/dist/lenis.css"

gsap.registerPlugin(ScrollTrigger)

/**
 * Lenis only on desktop pointer devices.
 * Mobile uses native scroll — avoids fighting touch, sticky galleries,
 * and address-bar viewport jumps.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    const narrow =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches

    if (coarse || narrow) {
      // Keep ScrollTrigger in sync with native scroll
      const onScroll = () => ScrollTrigger.update()
      window.addEventListener("scroll", onScroll, { passive: true })
      return () => window.removeEventListener("scroll", onScroll)
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    })

    lenis.on("scroll", ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
