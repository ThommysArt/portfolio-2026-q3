import { SITE } from "@/lib/projects"
import { EXPERIENCE } from "@/lib/experience"
import { SectionLabel } from "@/components/shared/section-label"
import { ScrollOpacityText } from "@/components/shared/scroll-opacity-text"
import { Magnetic } from "@/components/shared/magnetic"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Download } from "lucide-react"

const FOCUS = [
  {
    title: "Product UI",
    body: "Interfaces that feel considered — hierarchy, rhythm, and clarity over decoration.",
  },
  {
    title: "Motion systems",
    body: "Scroll, entrance, and micro-interaction design with GSAP, Lenis, and deliberate easing.",
  },
  {
    title: "Full-stack craft",
    body: "From ERP platforms to template systems — frontend ownership with real data models behind it.",
  },
]

const HIGHLIGHTS = [
  {
    label: "Currently",
    value: "Enderix Finance · reframe/ui",
  },
  {
    label: "Based in",
    value: SITE.locationLine,
  },
  {
    label: "Working",
    value: "Remote · Contract · Product",
  },
  {
    label: "Roles shipped",
    value: `${EXPERIENCE.length}+ engagements`,
  },
]

export function AboutCta() {
  return (
    <section
      id="about"
      className="shell flex h-[100svh] min-h-[100svh] w-full flex-col justify-center overflow-y-auto py-24 md:py-28"
    >
      <SectionLabel index="01" className="mb-6 md:mb-8">
        About
      </SectionLabel>

      <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-14">
        {/* Left — narrative */}
        <div className="flex flex-col gap-6 md:col-span-7 lg:col-span-7 md:gap-7">
          <ScrollOpacityText
            as="h2"
            className="font-display text-3xl font-medium tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]"
            minOpacity={0.16}
            falloff={0.48}
          >
            Clean visuals.
            <br />
            Strong systems.
            <br />
            Thoughtful motion.
          </ScrollOpacityText>

          <ScrollOpacityText
            as="div"
            className="max-w-xl space-y-3.5 text-sm leading-relaxed text-muted-foreground md:text-[15px]"
            minOpacity={0.22}
            falloff={0.5}
          >
            <p>{SITE.summary}</p>
            <p>
              Lately that means building{" "}
              <span className="text-foreground/85">Enderix Finance</span> — a
              modern ERP for Cameroonian enterprises — while shipping{" "}
              <span className="text-foreground/85">reframe/ui</span>, a UI kit
              aimed at Awwwards-level sites without the usual compromise on
              production readiness.
            </p>
            <p className="hidden sm:block">
              Before that: UI/UX consulting at Yaaki, a frontend internship at
              Next-It Solutions, and a stream of templates — e-commerce, SaaS
              landings, architecture studios, WebGL — as a playground for
              motion and craft.
            </p>
          </ScrollOpacityText>

          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Button
                asChild
                size="lg"
                className="rounded-full font-display text-xs uppercase tracking-[0.18em]"
              >
                <a
                  href={`mailto:${SITE.email}`}
                  data-cursor="hover"
                  data-cursor-label="Mail"
                >
                  Get in touch
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-foreground/20 font-display text-xs uppercase tracking-[0.18em]"
              >
                <a
                  href={SITE.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="external"
                  data-cursor-label="CV"
                >
                  Resume
                  <Download className="h-3.5 w-3.5" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full font-display text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                <a
                  href={SITE.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="external"
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* Right — meta + focus */}
        <div className="flex flex-col gap-8 md:col-span-5 lg:col-span-5">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-5">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label}>
                <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium tracking-tight text-foreground/90">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-0 border-t border-border">
            {FOCUS.map((item, i) => (
              <div
                key={item.title}
                className="grid grid-cols-[auto_1fr] gap-4 border-b border-border py-4"
              >
                <span className="font-display pt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-sm font-medium tracking-tight md:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
