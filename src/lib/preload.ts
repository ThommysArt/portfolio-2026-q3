/** Critical media for the home entry loader (posters / stills only — not video). */
export function getCriticalImageUrls(urls: string[]): string[] {
  return [...new Set(urls.filter(Boolean))]
}

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = "async"
    const done = () => resolve()
    img.onload = done
    img.onerror = done
    img.src = src
    // Cached images may already be complete
    if (img.complete) done()
  })
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export type PreloadProgress = {
  /** 0–1 overall */
  progress: number
  done: boolean
}

/**
 * Preload fonts + images with progress callbacks.
 * Never blocks forever — hard timeout wins.
 */
export async function preloadCritical(options: {
  images: string[]
  minMs?: number
  maxMs?: number
  onProgress?: (p: PreloadProgress) => void
}): Promise<void> {
  const { images, minMs = 900, maxMs = 4200, onProgress } = options
  const unique = getCriticalImageUrls(images)
  const started = performance.now()

  let fontsWeight = 0
  let imagesLoaded = 0
  const imageTotal = Math.max(unique.length, 1)

  const report = (done = false) => {
    // Fonts ~18%, images ~82%
    const p = Math.min(1, fontsWeight * 0.18 + (imagesLoaded / imageTotal) * 0.82)
    onProgress?.({ progress: done ? 1 : p, done })
  }

  report()

  const fontsPromise = (document.fonts?.ready ?? Promise.resolve()).then(() => {
    fontsWeight = 1
    report()
  })

  const imagesPromise = Promise.all(
    unique.map((src) =>
      loadImage(src).then(() => {
        imagesLoaded += 1
        report()
      }),
    ),
  ).then(() => {
    // if no images, still mark full image weight
    if (unique.length === 0) {
      imagesLoaded = 1
      report()
    }
  })

  const work = Promise.all([fontsPromise, imagesPromise])
  const timed = Promise.race([work, sleep(maxMs)])

  await timed

  // Honor minimum display so the intro never flashes
  const elapsed = performance.now() - started
  if (elapsed < minMs) await sleep(minMs - elapsed)

  onProgress?.({ progress: 1, done: true })
}
