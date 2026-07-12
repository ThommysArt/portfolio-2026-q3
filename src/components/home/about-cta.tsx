import { SITE } from "@/lib/projects"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export function AboutCta() {
  return (
    <section id="about" className="shell w-full py-20 md:py-28">
      <SectionLabel index="04">About</SectionLabel>

      <Reveal>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Clean visuals.
              <br />
              <span className="text-foreground/40">Strong systems.</span>
              <br />
              Thoughtful motion.
            </h2>
          </div>
          <div className="flex flex-col justify-between gap-8 md:col-span-5">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {SITE.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full font-display text-xs uppercase tracking-[0.18em]"
              >
                <a href={`mailto:${SITE.email}`}>
                  Get in touch
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-foreground/20 font-display text-xs uppercase tracking-[0.18em]"
              >
                <a href={SITE.socials.x} target="_blank" rel="noreferrer">
                  Follow on X
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
