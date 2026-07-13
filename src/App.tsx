import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SmoothScroll } from "@/components/layout/smooth-scroll"
import { EntryTransition } from "@/components/layout/entry-transition"
import { PageTransitionProvider } from "@/components/layout/page-transition"
import { Navbar } from "@/components/layout/navbar"
import { CustomCursor } from "@/components/layout/custom-cursor"
import { HomePage } from "@/pages/home"
import { WorkPage } from "@/pages/work"
import { NotFoundPage } from "@/pages/not-found"

export default function App() {
  return (
    <BrowserRouter>
      <TooltipProvider delayDuration={200}>
        <SmoothScroll>
          <PageTransitionProvider>
            <div className="grain dark min-h-screen bg-background text-foreground">
              <EntryTransition durationMs={1600} bars={6} />
              <CustomCursor />
              <Navbar />
              <main className="relative w-full">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </PageTransitionProvider>
        </SmoothScroll>
      </TooltipProvider>
    </BrowserRouter>
  )
}
