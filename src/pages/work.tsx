import { ProjectsArchive } from "@/components/work/projects-archive"
import { Footer } from "@/components/layout/footer"

export function WorkPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <ProjectsArchive />
      <Footer />
    </div>
  )
}
