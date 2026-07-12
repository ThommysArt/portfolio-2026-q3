/**
 * Tech stack icons — monochrome via simpleicons CDN (synergistic B&W row).
 * simpleicons.org / svgl.app patterns; color forced white for dark UI.
 */
export interface Tech {
  name: string
  /** simpleicons slug, or custom icon url */
  icon: string
  href?: string
}

const si = (slug: string, color = "e5e5e5") =>
  `https://cdn.simpleicons.org/${slug}/${color}`

export const TECH_STACK: Tech[] = [
  { name: "React", icon: si("react"), href: "https://react.dev" },
  { name: "Next.js", icon: si("nextdotjs"), href: "https://nextjs.org" },
  { name: "TypeScript", icon: si("typescript"), href: "https://www.typescriptlang.org" },
  { name: "Tailwind CSS", icon: si("tailwindcss"), href: "https://tailwindcss.com" },
  { name: "GSAP", icon: si("greensock"), href: "https://gsap.com" },
  { name: "Three.js", icon: si("threedotjs"), href: "https://threejs.org" },
  { name: "Convex", icon: si("convex"), href: "https://convex.dev" },
  { name: "Supabase", icon: si("supabase"), href: "https://supabase.com" },
  { name: "Vercel", icon: si("vercel"), href: "https://vercel.com" },
  { name: "Figma", icon: si("figma"), href: "https://figma.com" },
  { name: "Expo", icon: si("expo"), href: "https://expo.dev" },
  { name: "Node.js", icon: si("nodedotjs"), href: "https://nodejs.org" },
]
