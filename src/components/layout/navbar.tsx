import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import gsap from "gsap"
import { SITE } from "@/lib/projects"
import { usePageTransition } from "./page-transition"

/**
 * Character-swap hover from the 2025 portfolio.
 * Parent uses mix-blend-difference + white so links stay readable on any bg.
 */
function AnimatedNavLink({
  to,
  children,
  external,
  hash,
}: {
  to: string
  children: string
  external?: boolean
  hash?: boolean
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
    const leave = () => tl.reverse()
    el.addEventListener("mouseenter", enter)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
      tl.kill()
    }
  }, [children])

  const className =
    "relative font-display text-[11px] md:text-xs uppercase tracking-[0.22em] text-white"

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
      <a ref={ref} href={to} target="_blank" rel="noreferrer" className={className}>
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
      onClick={(e) => {
        e.preventDefault()
        navigateWithTransition(to)
      }}
    >
      {content}
    </a>
  )
}

function LiveClock() {
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className="font-display text-[11px] tabular-nums tracking-[0.22em] text-white md:text-xs">
      {time}
    </span>
  )
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

export function Navbar() {
  const location = useLocation()
  const { navigateWithTransition } = usePageTransition()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.12 },
    )
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
          <AnimatedNavLink to="/work">Works</AnimatedNavLink>
          <AnimatedNavLink to="/#about" hash>
            About
          </AnimatedNavLink>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center justify-end gap-4 md:gap-5">
          <nav className="flex items-center gap-4 md:hidden">
            <AnimatedNavLink to="/work">Works</AnimatedNavLink>
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
        <div className="h-px w-full bg-white/40" />
      </div>
    </header>
  )
}
