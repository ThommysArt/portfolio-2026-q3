import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SITE } from "@/lib/projects"
import { usePageTransition } from "./page-transition"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

/**
 * Character-swap hover from the 2025 portfolio.
 * Parent uses mix-blend-difference + white so links stay readable on any bg.
 */
function AnimatedNavLink({
  to,
  children,
  external,
  hash,
  active,
}: {
  to: string
  children: string
  external?: boolean
  hash?: boolean
  active?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { navigateWithTransition } = usePageTransition()
  const location = useLocation()
  const chars = children.split("")

  useEffect(() => {
    if (!ref.current) return
    const original = ref.current.querySelectorAll(".original .char")
    const duplicate = ref.current.querySelectorAll(".duplicate .char")
    const underline = ref.current.querySelector(".underline")

    gsap.set(original, { yPercent: 0, opacity: 1 })
    gsap.set(duplicate, { yPercent: 100 })
    gsap.set(underline, { scaleX: 0, transformOrigin: "left center" })

    const tl = gsap.timeline({ paused: true })
    tl.to(
      original,
      {
        yPercent: -100,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: { amount: 0.12 },
      },
      0,
    )
    tl.to(
      duplicate,
      {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: { amount: 0.12 },
      },
      0,
    )
    tl.to(underline, { scaleX: 1, duration: 0.35, ease: "power2.out" }, 0)

    const el = ref.current
    const enter = () => tl.play()
    const leave = () => {
      if (!active) tl.reverse()
    }
    el.addEventListener("mouseenter", enter)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
      tl.kill()
    }
  }, [children, active])

  // Keep underline visible when section is active
  useEffect(() => {
    if (!ref.current) return
    const underline = ref.current.querySelector(".underline")
    if (!underline) return
    gsap.to(underline, {
      scaleX: active ? 1 : 0,
      duration: 0.35,
      ease: "power2.out",
      transformOrigin: active ? "left center" : "right center",
    })
  }, [active])

  const className = cn(
    "relative font-display text-[11px] md:text-xs uppercase tracking-[0.22em] text-white",
    active && "opacity-100",
  )

  const content = (
    <span className="relative inline-block overflow-hidden pb-0.5">
      <span className="original inline-flex whitespace-nowrap">
        {chars.map((c, i) => (
          <span key={`o${i}`} className="char inline-block">
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </span>
      <span className="duplicate absolute left-0 top-0 inline-flex whitespace-nowrap">
        {chars.map((c, i) => (
          <span key={`d${i}`} className="char inline-block">
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </span>
      <span className="underline absolute bottom-0 left-0 h-px w-full origin-left bg-current" />
    </span>
  )

  if (external) {
    return (
      <a
        ref={ref}
        href={to}
        target="_blank"
        rel="noreferrer"
        className={className}
        data-cursor="external"
        data-cursor-label="Open"
      >
        {content}
      </a>
    )
  }

  if (hash) {
    return (
      <a
        ref={ref}
        href={to}
        className={className}
        data-cursor="hover"
        onClick={(e) => {
          e.preventDefault()
          const id = to.replace("/#", "").replace("#", "")
          if (location.pathname !== "/") {
            navigateWithTransition("/")
            setTimeout(() => {
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }, 700)
          } else {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
        }}
      >
        {content}
      </a>
    )
  }

  return (
    <a
      ref={ref}
      href={to}
      className={className}
      data-cursor="hover"
      onClick={(e) => {
        e.preventDefault()
        navigateWithTransition(to)
      }}
    >
      {content}
    </a>
  )
}

/** Local wall clock + timezone label (WAT / GMT+1 · Yaoundé). */
function LiveClock() {
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="hidden flex-col items-end sm:flex">
      <span className="font-display text-[11px] tabular-nums tracking-[0.22em] text-white md:text-xs">
        {time}
      </span>
      <span className="font-display text-[8px] uppercase tracking-[0.2em] text-white/55 md:text-[9px]">
        WAT · GMT+1
      </span>
    </div>
  )
}

function formatTime(d: Date) {
  // Always show Yaoundé / West Africa Time regardless of viewer locale
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Africa/Douala",
  })
}

export function Navbar() {
  const location = useLocation()
  const { navigateWithTransition } = usePageTransition()
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<"works" | "about" | null>(null)

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.12 },
    )
  }, [location.pathname])

  // Document scroll progress → nav underline bar
  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
      },
    })

    // Initial
    gsap.set(bar, { scaleX: st.progress, transformOrigin: "left center" })

    return () => st.kill()
  }, [location.pathname])

  // Active section on home
  useEffect(() => {
    if (location.pathname === "/work") {
      setActive("works")
      return
    }
    if (location.pathname !== "/") {
      setActive(null)
      return
    }

    const triggers: ScrollTrigger[] = []

    const mark = (key: "works" | "about") => {
      setActive(key)
    }

    // About block
    const about = document.getElementById("about")
    if (about) {
      triggers.push(
        ScrollTrigger.create({
          trigger: about,
          start: "top 45%",
          endTrigger: "#selected",
          end: "top 45%",
          onEnter: () => mark("about"),
          onEnterBack: () => mark("about"),
        }),
      )
    }

    // Selected work
    const selected = document.getElementById("selected")
    if (selected) {
      triggers.push(
        ScrollTrigger.create({
          trigger: selected,
          start: "top 45%",
          end: "bottom 40%",
          onEnter: () => mark("works"),
          onEnterBack: () => mark("works"),
        }),
      )
    }

    // Experience / stack back to about-ish
    const exp = document.getElementById("experience")
    if (exp) {
      triggers.push(
        ScrollTrigger.create({
          trigger: exp,
          start: "top 45%",
          endTrigger: "#stack",
          end: "bottom bottom",
          onEnter: () => mark("about"),
          onEnterBack: () => mark("about"),
        }),
      )
    }

    // Hero — clear
    triggers.push(
      ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: "top top",
        onUpdate: (self) => {
          if (self.scroll() < window.innerHeight * 0.55) setActive(null)
        },
      }),
    )

    // Simpler hero clear via about start
    if (about) {
      triggers.push(
        ScrollTrigger.create({
          trigger: about,
          start: "top bottom",
          onLeaveBack: () => setActive(null),
        }),
      )
    }

    return () => triggers.forEach((t) => t.kill())
  }, [location.pathname])

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
    >
      <div className="shell grid grid-cols-[1fr_auto] items-center gap-4 py-4 text-white md:grid-cols-3 md:py-5">
        {/* Brand */}
        <a
          href="/"
          data-cursor="hover"
          onClick={(e) => {
            e.preventDefault()
            navigateWithTransition("/")
          }}
          className="font-display text-[11px] uppercase tracking-[0.2em] text-white md:text-xs"
        >
          {SITE.shortName}
        </a>

        {/* Center links — desktop */}
        <nav className="hidden items-center justify-center gap-10 md:flex lg:gap-12">
          <AnimatedNavLink to="/work" active={active === "works"}>
            Works
          </AnimatedNavLink>
          <AnimatedNavLink to="/#about" hash active={active === "about"}>
            About
          </AnimatedNavLink>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center justify-end gap-4 md:gap-5">
          <nav className="flex items-center gap-4 md:hidden">
            <AnimatedNavLink to="/work" active={active === "works"}>
              Works
            </AnimatedNavLink>
          </nav>
          <AnimatedNavLink to={SITE.socials.x} external>
            X
          </AnimatedNavLink>
          <div className="hidden items-center gap-2.5 sm:flex">
            <LiveClock />
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
            </span>
          </div>
        </div>
      </div>
      <div className="shell">
        {/* Track + scroll progress fill (existing nav bar, now live) */}
        <div className="relative h-px w-full bg-white/40">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-white"
          />
        </div>
      </div>
    </header>
  )
}
