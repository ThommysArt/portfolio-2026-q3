import { Hero } from "@/components/home/hero"
import { SelectedProjects } from "@/components/home/selected-projects"
import { ExperienceSection } from "@/components/home/experience"
import { TechStack } from "@/components/home/tech-stack"
import { AboutCta } from "@/components/home/about-cta"
import { Footer } from "@/components/layout/footer"

export function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Hero />
      <SelectedProjects />
      <ExperienceSection />
      <TechStack />
      <AboutCta />
      <Footer />
    </div>
  )
}
