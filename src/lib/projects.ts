export interface Project {
  id: string
  title: string
  description: string
  url: string
  images: string[]
  categories: string[]
  video?: string
  year: number
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: "reframe-ui",
    title: "reframe/ui",
    description:
      "UI kit for building Awwwards-level websites without compromise. Production-ready components and templates that bridge experimental design and shipping speed.",
    url: "https://reframe-ui.vercel.app/",
    images: [
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZm9seaYAwbVsar4Dx57yY0ItnduR1MewmFgvHB",
    ],
    categories: ["Personal", "UI/UX"],
    video:
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMlfSwtMafrZT1nWIQ8CGBvy2z3RXAw9D5PdOM",
    year: 2025,
    featured: true,
  },
  {
    id: "teeform",
    title: "Teeform Template",
    description:
      "A platform to customize your own t-shirt design and order it online. Upload shaders and textures to craft unique apparel.",
    url: "https://teeform-template.vercel.app/",
    images: [
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMFzfeO2OMIOVZp60EKP8lG9So7ieam5Aw4urW",
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMPSH2JAb5jQOmzbXBMvVoDKnA1H7NIaZiwGWl",
    ],
    categories: ["E-commerce", "Template"],
    year: 2026,
    featured: true,
  },
  {
    id: "crew-saas",
    title: "Crew SaaS Template",
    description:
      "A 3D design software landing experience made for designers and artists. Craft products that feel unique, beautiful, and inspiring.",
    categories: ["SaaS", "Landing page"],
    video:
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqM7k6BiaocHqk6MWVbOornYEQT0agyRlAD4scp",
    images: [
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqM1pHz1RUYxpGFhMqDvCTZQw0u12URzX8bsmBr",
    ],
    url: "https://crew-saas-template.vercel.app",
    year: 2025,
    featured: true,
  },
  {
    id: "ma-architects",
    title: "MA Architects",
    description:
      "A modern architectural studio template with elegant layouts, immersive visuals, and smooth animations — refined presence for spatial work.",
    categories: ["Landing Page", "Architecture"],
    images: [
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMd9a0D2F2zB5yogLIXD8jUt0xPp3aZd96eWQb",
    ],
    video:
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMH1rZVu3HG0ZpYbguqe9RlOh5ixtkvXAfdWUr",
    url: "https://ma-architects-template.vercel.app/",
    year: 2025,
    featured: true,
  },
  {
    id: "reframe-exp-101",
    title: "reframe/ui exp 101",
    description:
      "A portfolio template experiment — a clean way to showcase work and attract clients.",
    categories: ["Portfolio", "Template"],
    images: [
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMtpStXENvXtOPnKkCIms2hrw5BVNJdUFfM7GL",
    ],
    video:
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMLRP7gUBD4uXq8V2wM5j3TetLY6cmixazdCKp",
    url: "https://reframeui-exp-101.vercel.app/",
    year: 2025,
  },
  {
    id: "canvas-gallery",
    title: "Canvas Gallery Template",
    description: "An interior design gallery of fine art pieces.",
    categories: ["Art Gallery", "Landing Page"],
    images: [
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMtvIguONvXtOPnKkCIms2hrw5BVNJdUFfM7GL",
    ],
    video:
      "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMt9KlGlNvXtOPnKkCIms2hrw5BVNJdUFfM7GL",
    url: "https://canvas-gallery-template.vercel.app/",
    year: 2026,
  },
  {
    id: "rhyme-studio",
    title: "Rhyme Studio",
    description:
      "Digital art studio template with a mesmerizing water ripple (Three.js / R3F) and a tasteful project slider.",
    images: [
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmFhBd1cVOWKZL2Jd6RXfC9jkl0pYVPxyF4Dge",
    ],
    video:
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmFDsvIrVOWKZL2Jd6RXfC9jkl0pYVPxyF4Dge",
    categories: ["Digital Art Studio", "Agency"],
    url: "https://rhyme-studio-template.vercel.app/",
    year: 2025,
  },
  {
    id: "design-gallery",
    title: "Design Gallery Experiment",
    description:
      "Image gallery with pan, lens distortion, and chromatic shift — a WebGL experiment outside of Three.js.",
    url: "https://image-gallery-template-seven.vercel.app/",
    images: [
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmFS8ZSLVOWKZL2Jd6RXfC9jkl0pYVPxyF4Dge",
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmO4HqECQvwJoGfAsp4ah1vULW78mFtQnPKSDq",
    ],
    categories: ["Experiment", "Image Gallery"],
    year: 2025,
  },
  {
    id: "reverse-studio",
    title: "Reverse Studio",
    description:
      "Agency portfolio template built with Next.js, GSAP and Framer Motion.",
    url: "https://reverse-studio-template.vercel.app/",
    images: [
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmBi2Lx8J0UuGnArjeD8TVWYhqElQ9IitKf7Xm",
    ],
    categories: ["Template", "Agency"],
    video:
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmVNjzUplQHKkwi3m8y0MsBDlW4g9eACETIhba",
    year: 2025,
  },
  {
    id: "fiena-robotics",
    title: "Fiena Robotics",
    description: "Template for a robotics company — product story meets motion.",
    url: "https://fiena-robotics-template.vercel.app/",
    images: [
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmNgTl2BUd58qmjpUcCawflPzT314dbg7JGIyZ",
    ],
    categories: ["Template", "Robotics"],
    video:
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZm5pthR0IKILwBPEZAso2Qx3bUVrpnF61j78kt",
    year: 2025,
  },
  {
    id: "reframe-designs",
    title: "Reframe Designs",
    description:
      "Concept for an interior design studio with expressive GSAP + Next.js animations.",
    url: "https://reframe-designs.vercel.app/",
    images: [
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmvhZVYTc4ALxuQgt9YGcPUX0jFeE1nZRWNhfC",
    ],
    categories: ["Web Development", "Interior Design"],
    video:
      "https://hbtxglqkji.ufs.sh/f/rMIXEfoeKMz0ovTHC5IEyPQTucrCqVbL37EZDfh9lz1dX4Mk",
    year: 2025,
  },
  {
    id: "no-jordans",
    title: "No Jordans",
    description:
      "Exclusive sneaker designs that break the mold and set new standards in footwear fashion.",
    url: "https://no-jordans.vercel.app/",
    images: [
      "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmV8kPCUqlQHKkwi3m8y0MsBDlW4g9eACETIhb",
    ],
    categories: ["E-commerce", "Landing Page"],
    video:
      "https://e8efl0wgax1cdgj1.public.blob.vercel-storage.com/no-jordans/no%20jordans%201080p-pGe9RIzBwuyEcYAVKFd6LXwh7Ts4Vu.mp4",
    year: 2024,
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)

export const SITE = {
  name: "Keabou Thomson",
  /** Compact wordmark for nav */
  shortName: "Keabou Thomson",
  /**
   * Giant display word (Rosa-style). Full legal name is too long edge-to-edge;
   * last name reads as a brand mark. Swap for Graphyne locally if you own a license.
   */
  displayName: "Thom",
  role: "Software Engineer",
  specialties: [
    "Software Engineer",
    "Focused on",
    "Frontend / UI",
    "Motion Design",
    "Full-stack systems",
  ],
  location: "Yaoundé, Cameroon",
  locationCoords: "3°52′N 11°31′E",
  locationLine: "Yaoundé · Remote",
  email: "thomsonnguems@gmail.com",
  site: "https://thommysart.me",
  resumeUrl: "/resume.pdf",
  socials: {
    x: "https://x.com/thommysart",
    instagram: "https://instagram.com/thommysart21",
    github: "https://github.com/thommysart",
  },
  ogImage:
    "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmW5omT7HgxDRICQGvpalitK8YqhmsSrWn3PUj",
  avatar:
    "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmW5omT7HgxDRICQGvpalitK8YqhmsSrWn3PUj",
  tagline: "I design and build feature-rich interfaces with thoughtful motion.",
  summary:
    "Creative engineer blending clean visuals with strong technical craft. I shape smooth interfaces, responsive systems, and deliberate user journeys — from ERP platforms to Awwwards-minded product UI.",
}
