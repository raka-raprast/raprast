export type WorkKind = "project" | "role";

export interface WorkItem {
  slug: string;
  name: string;
  /** short one-liner shown under the title */
  tagline: string;
  kind: WorkKind;
  /** job title, for roles */
  role?: string;
  /** employer / org name, for roles */
  company?: string;
  category: string;
  /** display period, e.g. "2025" or "2024 — Present" */
  period: string;
  /** sort key: higher = more recent */
  order: number;
  stack: string[];
  /** paragraph(s) for the case-study body */
  summary: string;
  outcomes?: string[];
  link?: string;
  repo?: string;
  /** poster image in /public */
  poster: string;
  /** looping video in /public (optional; falls back to poster) */
  video?: string;
  /** accent used on the case-study page, "r g b" */
  accent: string;
  featured?: boolean;
  /** true if role/period still needs owner confirmation */
  needsReview?: boolean;
}

export const work: WorkItem[] = [
  {
    slug: "talino",
    name: "Talino",
    tagline: "Ship your product. Skip the hiring.",
    kind: "project",
    category: "Desktop app · Dev tool",
    period: "2025",
    order: 100,
    stack: ["Electron", "TypeScript", "CodeMirror 6", "Node.js", "LSP", "omp"],
    summary:
      "A desktop IDE with an AI coding agent built in — editor, terminal, database browser, API client and kanban board in one window — so a solo founder can ship a real product before hiring an engineering team. Chat produces streaming diffs on every file it touches; a CodeMirror 6 editor sits underneath with typescript-language-server, pyright, rust-analyzer and gopls wired in for go-to-definition and find-references. Locked down by default: contextIsolation and a bounded contextBridge keep the renderer off Node, and API keys never live in the repo.",
    outcomes: [
      "Signed Windows x64 and macOS (Apple Silicon) builds",
      "LSP for TypeScript, Python, Rust and Go out of the box",
      "GlitchTip error triage and Flutter run/debug integrated",
    ],
    link: "https://talino.raprast.asia/",
    repo: "https://github.com/raka-raprast/talino",
    poster: "/video/posters/talino.webp",
    video: "/video/talino.mp4",
    accent: "245 206 66",
    featured: true,
  },
  {
    slug: "polyform",
    name: "Polyform UI",
    tagline: "One component core. Thirteen design languages.",
    kind: "project",
    category: "Design system · Dev tool",
    period: "2025",
    order: 99,
    stack: ["React", "Flutter", "TypeScript", "Design Tokens", "CLI"],
    summary:
      "A headless component system: 51 accessible React and Flutter components share one logic core and swap between thirteen visual design languages, styled entirely through --pf-* design tokens. Change the theme package and every interaction stays identical. The flagship material-first language combines four materials with a clear job each — structural neobrutalist borders, frosted glass, vibrant clay for anything interactive, and a restrained neumorphic carve on inputs. Installs shadcn-style through a CLI registry with zero runtime dependencies.",
    outcomes: [
      "51 components, controlled and uncontrolled, a11y wired in",
      "13 swappable design languages from a single token contract",
      "React + Flutter parity via a shared headless core",
    ],
    link: "https://polyform.raprast.asia/en-us",
    repo: "https://github.com/raka-raprast/polyform",
    poster: "/video/posters/polyform.webp",
    video: "/video/polyform.mp4",
    accent: "205 255 80",
    featured: true,
  },
  {
    slug: "punakawan",
    name: "Punakawan",
    tagline: "Talk to your coding agent from your pocket.",
    kind: "project",
    category: "CLI · Dev tool",
    period: "2025",
    order: 98,
    stack: ["Python (stdlib)", "Telegram Bot API", "systemd"],
    summary:
      "A single Python file, standard library only, that turns the omp coding agent into a Telegram bot. It long-polls Telegram, runs one omp session per chat in its own directory, and gets out of the way. Each chat keeps a persistent session across restarts; the running bot is always a byte-compile-validated copy, so a bad pull is rejected and rolled back before it ever reaches production. Process spawning works natively on Linux, macOS and Windows, with a systemd --user service on Linux.",
    outcomes: [
      "Zero dependencies — no build step, no framework to patch",
      "Per-chat persistent sessions, coherent across restarts",
      "Validated-copy deploys with automatic rollback",
    ],
    link: "https://punakawan.raprast.asia/",
    repo: "https://github.com/raka-raprast/punakawan",
    poster: "/video/posters/punakawan.webp",
    video: "/video/punakawan.mp4",
    accent: "96 165 250",
    featured: true,
  },
  {
    slug: "youapp",
    name: "YouApp",
    tagline: "Travel experiences with verified local hosts.",
    kind: "role",
    role: "Senior Software Engineer",
    company: "YouApp",
    category: "Travel-tech · Marketplace",
    period: "2024 — Present",
    order: 90,
    stack: ["Flutter", "TypeScript", "Next.js", "NestJS", "MongoDB", "RabbitMQ"],
    summary:
      "A travel-experiences marketplace connecting travelers with certified local hosts across Asia. I build across the stack — Flutter mobile apps, a Next.js web surface, and NestJS services on a MongoDB and RabbitMQ backbone — covering host verification, activity booking and in-app payments.",
    link: "https://youapp.ai/",
    poster: "/work/youapp.webp",
    accent: "205 255 80",
    featured: true,
  },
  {
    slug: "alpha-red",
    name: "Alpha Red Solutions",
    tagline: "Travel middleware wiring apps into GDS/NDC networks.",
    kind: "role",
    role: "Backend Engineer",
    company: "Alpha Red Solutions",
    category: "Travel-tech · B2B SaaS",
    period: "2026 — Present",
    order: 89,
    stack: ["TypeScript", "NestJS", "ElysiaJS", ".NET", "MySQL", "Redis"],
    summary:
      "Alpha Red builds GrandeConnect, middleware connecting airline, hotel and travel-agency apps to GDS/NDC networks, airline hosts and payment gateways. I work on backend orchestration — NestJS, ElysiaJS and .NET services over MySQL and Redis — powering real-time connectivity across the Grande suite.",
    link: "https://www.alphareds.com/",
    poster: "/work/alpha-red.webp",
    accent: "239 68 68",
  },
  {
    slug: "sera",
    name: "Sera",
    tagline: "On-chain FX settlement for stablecoins.",
    kind: "role",
    role: "iOS Developer",
    company: "Sera",
    category: "Fintech · Crypto-FX",
    period: "2026 — Present",
    order: 93,
    stack: [],
    summary:
      "A non-custodial, on-chain FX settlement protocol that lets remittance and B2B payment platforms convert between hundreds of stablecoins across 120+ currencies without double-routing through USD, with liquidity providers earning the FX spread. CertiK-audited, with sub-300ms routing across tens of thousands of pairs.",
    link: "https://www.sera.cx/",
    poster: "/work/sera.webp",
    accent: "124 92 255",
  },
  {
    slug: "kinsure",
    name: "Kinsure",
    tagline: "Accessible digital insurance for Indonesia.",
    kind: "role",
    role: "Software Engineer",
    company: "Kinsure",
    category: "Insurtech",
    period: "2026 — Present",
    order: 92,
    stack: [],
    summary:
      "An Indonesian insurtech platform making insurance accessible and transparent — gadget protection, personal accident, cyber and student plans — with fast digital claims, 24/7 support and partnerships with major insurers.",
    link: "https://kinsure.ai/",
    poster: "/work/kinsure.webp",
    accent: "45 212 191",
  },
  {
    slug: "qwork",
    name: "Qwork",
    tagline: "Industrial workforce, matched on demand.",
    kind: "role",
    role: "Mobile App Developer",
    company: "Qwork",
    category: "HR-tech · Gig economy",
    period: "2023 — 2024",
    order: 86,
    stack: ["React Native", "TypeScript", "React"],
    summary:
      "Malaysia's industrial workforce platform matching employers in oil & gas, manufacturing and construction with certified gig talent. I built the worker mobile app in React Native — assignments, QR check-in and earnings tracking — alongside a React and TypeScript admin surface.",
    link: "https://qwork.my/",
    poster: "/work/qwork.webp",
    accent: "251 146 60",
  },
  {
    slug: "pikpo",
    name: "Pikpo",
    tagline: "A network for skills and verified profiles.",
    kind: "role",
    role: "Fullstack Engineer",
    company: "Pikpo",
    category: "Professional network",
    period: "2021 — 2024",
    order: 85,
    stack: ["Flutter", "Dart", "Golang", "gRPC", "Python", "FastAPI"],
    summary:
      "A professional-networking platform for skill discovery, verifiable identity and collaboration. I worked full-stack across Flutter clients and Go and Python services (gRPC, FastAPI), building the core product from the ground up in a small distributed team.",
    link: "https://pikpo.framer.website/",
    poster: "/work/pikpo.webp",
    accent: "34 197 94",
  },
];

export const workSorted = [...work].sort((a, b) => b.order - a.order);
export const roles = workSorted.filter((w) => w.kind === "role");
export const projects = workSorted.filter((w) => w.kind === "project");
