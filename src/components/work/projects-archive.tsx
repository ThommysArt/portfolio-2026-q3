import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import gsap from "gsap"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { PROJECTS, type Project } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { AutoVideo } from "@/components/shared/auto-video"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { SectionLabel } from "@/components/shared/section-label"
import { usePageTransition } from "@/components/layout/page-transition"

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as const },
  },
}

function ProjectRow({
  project,
  index,
  hoveredProject,
  setHoveredProject,
  openedProject,
  setOpenedProject,
}: {
  project: Project
  index: number
  hoveredProject: number | null
  setHoveredProject: (i: number | null) => void
  openedProject: number | null
  setOpenedProject: (i: number | null) => void
}) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const expandRef = useRef<HTMLDivElement | null>(null)
  const categories = project.categories.join(", ")
  const isHovered = hoveredProject === index
  const isOpen = openedProject === index

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredProject(index)
    const bounds = e.currentTarget.getBoundingClientRect()
    const fromTop = e.clientY < bounds.top + bounds.height / 2

    if (outerRef.current && innerRef.current) {
      outerRef.current.style.top = fromTop ? "-100%" : "100%"
      innerRef.current.style.top = fromTop ? "100%" : "-100%"
      requestAnimationFrame(() => {
        if (!outerRef.current || !innerRef.current) return
        const t = "top 320ms cubic-bezier(0.33,1,0.68,1)"
        outerRef.current.style.transition = t
        innerRef.current.style.transition = t
        outerRef.current.style.top = "0%"
        innerRef.current.style.top = "0%"
      })
    }
  }

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredProject(null)
    const bounds = e.currentTarget.getBoundingClientRect()
    const toTop = e.clientY < bounds.top + bounds.height / 2

    if (outerRef.current && innerRef.current) {
      const t = "top 320ms cubic-bezier(0.33,1,0.68,1)"
      outerRef.current.style.transition = t
      innerRef.current.style.transition = t
      outerRef.current.style.top = toTop ? "-100%" : "100%"
      innerRef.current.style.top = toTop ? "100%" : "-100%"
    }
  }

  // After open: soft scroll into view once layout settles (avoids jump mid-animation)
  useEffect(() => {
    if (!isOpen || !expandRef.current) return
    const id = window.setTimeout(() => {
      expandRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, 420)
    return () => window.clearTimeout(id)
  }, [isOpen])

  return (
    <div className="border-t border-foreground/70">
      <motion.div
        className="relative grid w-full cursor-pointer grid-cols-2 gap-3 overflow-hidden py-4 md:grid-cols-3 md:gap-4 md:py-5"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() =>
          openedProject === index ? setOpenedProject(null) : setOpenedProject(index)
        }
        data-cursor="view"
        data-cursor-label={isOpen ? "Close" : "View"}
        animate={{ paddingLeft: isHovered ? 12 : 0, paddingRight: isHovered ? 12 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <span className="font-display text-base md:text-xl tracking-tight">
          {project.title}
        </span>
        <span className="hidden font-display text-base text-foreground/80 md:block md:text-xl">
          {categories}
        </span>
        <span className="font-display text-right text-base tabular-nums md:text-left md:text-xl">
          {project.year}
        </span>

        <div
          ref={outerRef}
          className="pointer-events-none absolute inset-0 overflow-hidden will-change-[top]"
          style={{ top: "100%" }}
        >
          <div
            ref={innerRef}
            className="absolute left-0 top-[-100%] h-full w-full will-change-[top]"
          >
            <div className="grid h-full w-full grid-cols-2 gap-3 bg-foreground p-3 text-background md:grid-cols-3 md:gap-4 md:p-4">
              <span className="font-display text-base md:text-xl">{project.title}</span>
              <span className="hidden font-display text-base md:block md:text-xl">
                {categories}
              </span>
              <span className="font-display text-right text-base tabular-nums md:text-left md:text-xl">
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={expandRef}
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex w-full flex-col gap-5 py-8 md:gap-6 md:py-10">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
                className="max-w-3xl font-sans text-base leading-relaxed text-foreground/85 md:text-xl lg:text-2xl"
              >
                {project.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground font-display text-xs uppercase tracking-[0.18em]"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="external"
                    data-cursor-label="Open"
                  >
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </motion.div>
              {/*
                Media mounts only while open — main lag fix.
                Video uses AutoVideo (shared observer, no autoplay-all).
              */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
              >
                {project.video ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    <AutoVideo
                      src={project.video}
                      poster={project.images[0]}
                      className="aspect-[16/9] w-full rounded-sm object-cover ring-4 ring-muted/40"
                    />
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/9] w-full rounded-sm object-cover ring-4 ring-muted/40"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {project.images.slice(0, 2).map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${project.title} ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/9] w-full rounded-sm object-cover ring-4 ring-muted/40"
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ProjectsArchive() {
  const isMobile = useIsMobile()
  const { navigateWithTransition } = usePageTransition()
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [openedProject, setOpenedProject] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const modalContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const modalEl = modalContainerRef.current
    if (!modalEl || !containerRef.current) return

    // Image preview only — global CustomCursor owns the “View” label
    const xMoveContainer = gsap.quickTo(modalEl, "left", { duration: 0.65, ease: "power3" })
    const yMoveContainer = gsap.quickTo(modalEl, "top", { duration: 0.65, ease: "power3" })

    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      xMoveContainer(e.clientX - rect.left)
      yMoveContainer(e.clientY - rect.top)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const sliderTop = `${(hoveredProject ?? 0) * -100}%`

  return (
    <div className="shell w-full pb-20 pt-28 md:pt-36">
      <button
        type="button"
        data-cursor="hover"
        onClick={() => navigateWithTransition("/")}
        className="group mb-10 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground md:mb-12"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back home
      </button>

      <SectionLabel index="∞">Archive</SectionLabel>
      <h1 className="font-display mb-4 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl lg:text-7xl">
        All projects
      </h1>
      <p className="mb-14 max-w-lg text-sm text-muted-foreground md:mb-20 md:text-base">
        The full list — experiments, templates, and client-facing work. Click a row to expand.
      </p>

      <div ref={containerRef} className="relative flex flex-col">
        <div className="mb-2 grid grid-cols-2 gap-3 py-3 md:grid-cols-3 md:gap-4">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Project
          </span>
          <span className="hidden font-display text-xs uppercase tracking-[0.2em] text-muted-foreground md:block">
            Category
          </span>
          <span className="text-right font-display text-xs uppercase tracking-[0.2em] text-muted-foreground md:text-left">
            Year
          </span>
        </div>

        {PROJECTS.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            hoveredProject={hoveredProject}
            setHoveredProject={setHoveredProject}
            openedProject={openedProject}
            setOpenedProject={setOpenedProject}
          />
        ))}

        {/*
          Floating preview uses images only (never video) — keeps hover buttery.
          decoding=async + only first image per project.
        */}
        {!isMobile && (
          <>
            <motion.div
              ref={modalContainerRef}
              variants={scaleAnimation}
              initial="initial"
              animate={hoveredProject !== null ? "enter" : "closed"}
              className="pointer-events-none absolute z-10 flex h-[240px] w-[320px] items-center justify-center overflow-hidden rounded-sm border border-border bg-background shadow-2xl lg:h-[280px] lg:w-[380px]"
            >
              <div
                className="absolute h-full w-full transition-[top] duration-500"
                style={{
                  top: sliderTop,
                  transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
                }}
              >
                {PROJECTS.map((project, idx) => (
                  <div
                    key={`modal_${idx}`}
                    className="flex h-full w-full items-center justify-center bg-background p-3"
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      loading={idx < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-auto max-h-full w-full rounded-sm object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            </>
        )}
      </div>
    </div>
  )
}
