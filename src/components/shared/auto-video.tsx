import { useRef, type VideoHTMLAttributes } from "react"
import { useInViewVideo } from "@/hooks/use-in-view-video"
import { cn } from "@/lib/utils"

type AutoVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "controls"
> & {
  /** When false, never plays (e.g. collapsed archive row). Default true. */
  active?: boolean
}

/**
 * Muted loop video that only plays while in (or near) the viewport.
 * Shared IntersectionObserver — safe across many cards.
 */
export function AutoVideo({
  active = true,
  className,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "none",
  ...rest
}: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  useInViewVideo(ref, active)

  return (
    <video
      ref={ref}
      className={cn(className)}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      // Never use autoPlay attribute — observer owns playback
      {...rest}
    />
  )
}
