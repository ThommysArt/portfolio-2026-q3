import { useEffect, useState } from "react"

function getIsMobile(breakpoint: number) {
  if (typeof window === "undefined") return false
  return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
}

/**
 * Sync matchMedia — initial value is correct on first paint (no desktop flash).
 * Default breakpoint 768 matches Tailwind `md`.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => getIsMobile(breakpoint))

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [breakpoint])

  return isMobile
}
