export interface Experience {
  id: string
  role: string
  company: string
  type: string
  period: string
  current?: boolean
  bullets: string[]
  href?: string
}

export const EXPERIENCE: Experience[] = [
  {
    id: "enderix",
    role: "Software Engineer",
    company: "Enderix Finance",
    type: "Freelance · Contract",
    period: "Oct 2025 — Present",
    current: true,
    href: undefined,
    bullets: [
      "Architected and developed Enderix Finance, a modern ERP platform for Cameroonian enterprises, using Next.js, Tailwind CSS, and Convex — deployed on Vercel.",
      "Led a cross-functional team of 2 engineers and 2 consultants to ship a full-stack SaaS stack with Clerk auth, real-time data, and a shadcn/ui component system.",
      "Owned frontend architecture and backend data modeling end-to-end as a freelance contract for enterprise clients in the Cameroonian market.",
    ],
  },
  {
    id: "reframe",
    role: "Founder",
    company: "reframe/ui",
    type: "Personal product",
    period: "Aug 2025 — Present",
    current: true,
    href: "https://ui.thommysart.me",
    bullets: [
      "Building the most advanced UI kit for designers and frontend developers who want Awwwards-level websites without compromise.",
      "High-impact, production-ready components and templates that bridge experimental design and real-world shipping speed.",
    ],
  },
  {
    id: "yaaki",
    role: "UI/UX Consultant",
    company: "Yaaki",
    type: "Freelance",
    period: "Jan 2026 — Feb 2026",
    bullets: [
      "Audited e-commerce and discovery platforms to propose high-fidelity interactions and motion design systems.",
      "Ran frontend regression testing for UI consistency and functional integrity across product surfaces.",
      "Partnered with design and engineering to identify and fix issues from either side.",
    ],
  },
  {
    id: "next-it",
    role: "Frontend Intern",
    company: "Next-It Solutions",
    type: "Internship",
    period: "Dec 2024 — Feb 2025",
    bullets: [
      "Built marketplace interfaces and dashboards with React, Tailwind CSS, and Redux — improving usability and performance.",
      "Optimized API data fetching to cut load times and reduce server strain.",
      "Contributed to influencer and promotion features that improved engagement and revenue potential.",
    ],
  },
]
