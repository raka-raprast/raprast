export const profile = {
  name: "Raka Ramadhani Aulia Prasetyo",
  shortName: "Raka Prasetyo",
  roles: ["Engineer", "Designer", "Developer"],
  capabilities: ["Product UI", "Mobile apps", "Backend systems", "API design", "Developer tooling", "IoT systems"],
  location: "Balikpapan, Indonesia",
  email: "raprast.raka@gmail.com",
  tagline: "I design and build software end to end — from Flutter apps to backend systems and the developer tools in between.",
  about: [
    "I'm a full-stack engineer who likes owning the whole surface of a product: the interface people touch, the services behind it, and the tooling that makes shipping faster. Lately that's meant travel-tech and fintech platforms by day, and a run of developer tools of my own — an AI-native IDE, a headless design system, and a Telegram bridge for coding agents.",
    "My background is unusual: I started in electrical and instrumentation work before moving into software, and I'm finishing a master's in electrical engineering. That mix shows up in how I build — pragmatic, systems-minded, and comfortable going from hardware and IoT up to polished product UI.",
  ],
  socials: {
    github: "https://github.com/raka-raprast",
    linkedin: "https://www.linkedin.com/in/raka-prasetyo",
    instagram: "https://www.instagram.com/raprast",
  },
  cv: "/Raka Ramadhani Aulia Prasetyo_Curriculum Vitae.pdf",
};

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  logo: string;
  link: string;
}

export const education: EducationItem[] = [
  {
    school: "Jakarta Global University",
    degree: "Master of Electrical Engineering",
    period: "2026 — Present",
    logo: "/jgu-logo.png",
    link: "https://www.jgu.ac.id/",
  },
  {
    school: "Balikpapan University",
    degree: "Bachelor of Electrical Engineering",
    period: "2021 — 2025",
    logo: "/uniba_logo.png",
    link: "https://uniba-bpn.ac.id/",
  },
  {
    school: "State Polytechnic of Balikpapan",
    degree: "Diploma of Electrical Engineering",
    period: "2017 — 2020",
    logo: "/poltekba_logo.png",
    link: "https://poltekba.ac.id/",
  },
];
