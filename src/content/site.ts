export const profile = {
  name: "Raka Ramadhani Aulia Prasetyo",
  shortName: "Raka Prasetyo",
  roles: ["Engineer", "Designer", "Developer"],
  capabilities: ["Product UI", "Mobile apps", "Backend systems", "API design", "Developer tooling", "IoT systems"],
  location: "Balikpapan, Indonesia",
  email: "raprast.raka@gmail.com",
  tagline: "I design and engineer systems end to end — from physical hardware and IoT to scalable software platforms.",
  about: [
    "I am a multidisciplinary engineer with deep expertise across both software and hardware engineering. I enjoy owning the complete surface of a product, from the systems and infrastructure behind it to the interfaces people touch. Throughout my career, I have built scalable solutions across a diverse range of industries, including Social Media, Dating apps, Web3, Fintech, Insuretech, and AI.",
    "Having started my career in electrical and instrumentation work, I bring a pragmatic, systems-oriented approach to product development. I am currently pursuing a Master's degree in Electrical Engineering, which allows me to seamlessly bridge the gap between physical hardware, IoT systems, and polished digital experiences.",
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
