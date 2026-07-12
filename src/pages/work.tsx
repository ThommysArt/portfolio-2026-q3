import { ProjectsArchive } from "@/components/work/projects-archive"
import { MobileArchive } from "@/components/mobile/mobile-archive"
import { Footer } from "@/components/layout/footer"
import { useIsMobile } from "@/hooks/use-is-mobile"

export function WorkPage() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <MobileArchive />
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <ProjectsArchive />
      <Footer />
    </div>
  )
}
