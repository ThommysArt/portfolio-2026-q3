import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react"
import { PROJECTS, type Project } from "@/lib/projects"
import { SectionLabel } from "@/components/shared/section-label"
import { AutoVideo } from "@/components/shared/auto-video"
import { Button } from "@/components/ui/button"
import { usePageTransition } from "@/components/layout/page-transition"
import { cn } from "@/lib/utils"

/**
 * Mobile work archive — card list, no hover cursor / invert scrub.
 * Tap to expand media + description; natural vertical scroll.
 */
export function MobileArchive() {
  const { navigateWithTransition } = usePageTransition()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="w-full px-5 pb-16 pt-24">
      <button
        type="button"
        onClick={() => navigateWithTransition("/")}
        className="mb-8 inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back home
      </button>

      <SectionLabel index="∞" className="mb-4">
        Archive
      </SectionLabel>
      <h1 className="font-display text-3xl font-medium tracking-tight">
        All projects
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {PROJECTS.length} works — templates, experiments, and product surfaces.
        Tap a card to expand.
      </p>

      <ul className="mt-10 flex flex-col gap-3">
        {PROJECTS.map((project, index) => (
          <MobileProjectCard
            key={project.id}
            project={project}
            index={index}
            open={openId === project.id}
            onToggle={() =>
              setOpenId(openId === project.id ? null : project.id)
            }
          />
        ))}
      </ul>
    </div>
  )
}

function MobileProjectCard({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project
  index: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <li className="overflow-hidden rounded-sm border border-border bg-card/30">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-3.5 text-left"
        aria-expanded={open}
      >
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-muted ring-1 ring-border">
          <img
            src={project.images[0]}
            alt=""
            loading="lazy"
            className="img-bw h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate font-display text-[15px] font-medium tracking-tight">
              {project.title}
            </span>
            <span className="shrink-0 font-display text-xs tabular-nums text-muted-foreground">
              {project.year}
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {project.categories.join(" · ")}
          </p>
        </div>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-300",
            open && "rotate-180 border-foreground bg-foreground text-background",
          )}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-3.5 pb-4 pt-3">
              <p className="text-sm leading-relaxed text-foreground/80">
                {project.description}
              </p>

              <div className="mt-3 overflow-hidden rounded-sm bg-muted ring-1 ring-border">
                {project.video ? (
                  <AutoVideo
                    src={project.video}
                    poster={project.images[0]}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(PROJECTS.length).padStart(2, "0")}
                </span>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full font-display text-[10px] uppercase tracking-[0.16em]"
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    Explore
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
