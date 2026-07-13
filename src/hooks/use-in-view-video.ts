import { useEffect, type RefObject } from "react"

/**
 * Single shared IntersectionObserver for portfolio videos.
 * One observer for the whole document is cheap; per-video observers are not.
 *
 * Plays muted loop when ~25% visible; pauses + resets when off-screen.
 * Uses preload="none" until near viewport (rootMargin), then "metadata".
 */
let sharedObserver: IntersectionObserver | null = null
const targets = new Map<Element, HTMLVideoElement>()

function getObserver() {
  if (typeof window === "undefined") return null
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = targets.get(entry.target)
        if (!video) continue

        if (entry.isIntersecting) {
          // Warm metadata once near view
          if (video.preload === "none") {
            video.preload = "metadata"
          }
          const play = video.play()
          if (play && typeof play.catch === "function") {
            play.catch(() => {
              /* autoplay blocked — ignore */
            })
          }
        } else {
          if (!video.paused) video.pause()
          // Avoid decoding cost while off-screen; keep currentTime for snappy resume
        }
      }
    },
    {
      // Start a bit before fully on-screen so playback feels immediate
      root: null,
      rootMargin: "12% 0px",
      threshold: [0, 0.2, 0.35],
    },
  )

  return sharedObserver
}

export function observeVideo(video: HTMLVideoElement) {
  const obs = getObserver()
  if (!obs) return () => {}

  // Observe the video element itself
  targets.set(video, video)
  obs.observe(video)

  return () => {
    obs.unobserve(video)
    targets.delete(video)
    if (targets.size === 0 && sharedObserver) {
      sharedObserver.disconnect()
      sharedObserver = null
    }
  }
}

/**
 * Hook: attach shared observer to a video ref.
 * Does not set autoPlay — play/pause is observer-driven.
 */
export function useInViewVideo(
  ref: RefObject<HTMLVideoElement | null>,
  enabled = true,
) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    return observeVideo(el)
  }, [ref, enabled])
}

/**
 * Imperative helper for non-hook call sites (e.g. after mount in effects).
 */
export function bindInViewVideo(video: HTMLVideoElement | null) {
  if (!video) return () => {}
  return observeVideo(video)
}
