import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ExperienceList } from "@/components/ui/ExperienceList";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { roles, projects } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Companies Raka has engineered for, and the tools he builds on the side.",
};

export default function WorkPage() {
  return (
    <div className="pt-[calc(var(--nav-h)+3rem)]">
      <section className="container-x">
        <p className="label mb-6">( Selected work )</p>
        <h1 className="text-d2">
          <MaskText>Experience</MaskText>
          <MaskText delay={0.06} className="text-muted">first.</MaskText>
        </h1>
      </section>

      <section className="container-x mt-20">
        <ExperienceList items={roles} />
      </section>

      <section className="container-x py-24 sm:py-32">
        <p className="label mb-10">Side projects</p>
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} index={i}>
              <Link href={`/work/${p.slug}`} data-cursor="open" className="group block">
                <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg border border-line">
                  <Image src={p.poster} alt={p.name} fill sizes="33vw" className="grade object-cover transition-transform duration-700 ease-expo group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl">{p.name}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-fg" />
                </div>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
