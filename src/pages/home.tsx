import { Hero } from "@/components/home/hero"
import { AboutCta } from "@/components/home/about-cta"
import { SelectedProjects } from "@/components/home/selected-projects"
import { ExperienceSection } from "@/components/home/experience"
import { TechStack } from "@/components/home/tech-stack"
import { Marquee } from "@/components/shared/marquee"
import { FEATURED_PROJECTS } from "@/lib/projects"

const MARQUEE_TOP = [
  "Selected work",
  "Frontend craft",
  "Motion design",
  "UI systems",
  "Product interfaces",
  ...FEATURED_PROJECTS.map((p) => p.title),
]

const MARQUEE_BOTTOM = [
  "Scroll to explore",
  "Built with intent",
  "Awwwards-minded",
  "React · GSAP · Three",
  "From concept to ship",
  ...FEATURED_PROJECTS.flatMap((p) => p.categories),
]

/** Home composition — Lenis handles smooth scroll only (no section lock). */
export function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Hero />
      <AboutCta />

      <Marquee items={MARQUEE_TOP} />
      <SelectedProjects />
      <Marquee items={MARQUEE_BOTTOM} reverse />

      <ExperienceSection />
      {/* Stack includes compact footer — one screen together */}
      <TechStack />
    </div>
  )
}
