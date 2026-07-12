import { cn } from "@/lib/utils"

/**
 * Full-width rule between major page sections.
 * Thin, editorial — matches the B&W system and hero rule language.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("shell w-full", className)}
      role="separator"
      aria-hidden
    >
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="h-1 w-1 shrink-0 rotate-45 bg-foreground/35" />
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  )
}
