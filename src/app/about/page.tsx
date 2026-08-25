import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { Parallax } from "@/components/motion/Parallax";
import { profile, education } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: profile.tagline,
};

const disciplines = [
  { k: "Frontend", v: "Flutter · React · Next.js · React Native" },
  { k: "Backend", v: "NestJS · Go · Python · ElysiaJS · .NET" },
  { k: "Data & infra", v: "PostgreSQL · MongoDB · MySQL · Redis · RabbitMQ · gRPC" },
  { k: "Craft", v: "Design systems · UI/UX · developer tooling" },
];

export default function AboutPage() {
  return (
    <div className="pt-[calc(var(--nav-h)+3rem)]">
      <section className="container-x">
        <p className="label mb-6">( About )</p>
        <h1 className="max-w-[16ch] text-d2">
          <MaskText>Engineer with a</MaskText>
          <MaskText delay={0.06} className="text-muted">hardware past.</MaskText>
        </h1>
      </section>

      <section className="container-x mt-20 grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-20">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          {profile.about.map((p, i) => (
            <Reveal key={i} index={i}>
              <p>{p}</p>
            </Reveal>
          ))}
          <Reveal index={2}>
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-fg transition-colors hover:border-fg"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </Reveal>
        </div>

        <Reveal index={1}>
          <Parallax distance={40}>
            <div className="grade-hover relative aspect-[4/5] overflow-hidden rounded-xl border border-line">
              <Image src="/real_avatar.png" alt={profile.name} fill className="grade object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
          </Parallax>
        </Reveal>
      </section>

      <section className="container-x py-24 sm:py-32">
        <p className="label mb-10">What I work with</p>
        <dl className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {disciplines.map((d, i) => (
            <Reveal key={d.k} index={i} className="bg-bg p-6 sm:p-8">
              <dt className="label">{d.k}</dt>
              <dd className="mt-3 text-lg text-fg">{d.v}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="container-x pb-24 sm:pb-32">
        <p className="label mb-10">Education</p>
        <ul className="border-t border-line">
          {education.map((e, i) => (
            <Reveal as="li" key={e.school} index={i} className="border-b border-line">
              <a href={e.link} target="_blank" rel="noreferrer" data-cursor="visit" className="group flex items-center gap-5 py-6">
                <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-surface p-2">
                  <Image src={e.logo} alt={e.school} width={44} height={44} className="h-full w-full object-contain grayscale transition-all duration-500 group-hover:grayscale-0" />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xl transition-transform duration-500 ease-expo group-hover:translate-x-1">{e.school}</span>
                  <span className="block text-muted">{e.degree}</span>
                </span>
                <span className="label hidden sm:block">{e.period}</span>
                <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
              </a>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
