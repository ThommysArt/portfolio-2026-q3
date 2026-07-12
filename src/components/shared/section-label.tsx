import { cn } from "@/lib/utils"

export function SectionLabel({
  children,
  className,
  index,
}: {
  children: React.ReactNode
  className?: string
  index?: string
}) {
  return (
    <div className={cn("flex items-center gap-3 mb-8 md:mb-12", className)}>
      {index && (
        <span className="font-display text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase">
          {index}
        </span>
      )}
      <span className="font-display text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase">
        {children}
      </span>
      <span className="h-px flex-1 max-w-[4rem] bg-border" />
    </div>
  )
}
