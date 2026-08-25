import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/ui/Hero";
import { ServiceSequence } from "@/components/motion/ServiceSequence";
import { PinnedGallery } from "@/components/motion/PinnedGallery";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Parallax } from "@/components/motion/Parallax";
import { projects, roles, work } from "@/content/work";

const getWork = (slug: string) => {
  const item = work.find((candidate) => candidate.slug === slug);
  if (!item) throw new Error(`Missing work item: ${slug}`);
  return item;
};

const services = [
  {
    title: "Product applications",
    description: "Mobile and web products that turn complex workflows into clear, useful experiences.",
    work: [getWork("youapp"), getWork("qwork")],
  },
  {
    title: "Platform & API systems",
    description: "Backend services, data flows, and integrations that keep a product reliable as it grows.",
    work: [getWork("alpha-red"), getWork("pikpo")],
  },
  {
    title: "Developer tools",
    description: "Tools and systems that help builders move from an idea to a working product faster.",
    work: [getWork("talino"), getWork("polyform")],
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container-x border-t border-line py-28 sm:py-40">
        <Reveal>
          <p className="label mb-8">Experience</p>
          <h2 className="max-w-[11ch] text-d2">
            Five years connecting products, platforms, and the people who use them.
          </h2>
        </Reveal>
        <Reveal index={1}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            I work across the product surface: mobile apps and interfaces people touch, plus the services,
            APIs, and tools that make them work.
          </p>
        </Reveal>
      </section>

      <ServiceSequence services={services} />

      <section className="border-t border-line pt-28 sm:pt-40">
        <div className="container-x mb-8 flex items-end justify-between">
          <div>
            <p className="label mb-4">Experience in practice</p>
            <h2 className="text-d3">Built with teams across products.</h2>
          </div>
          <p className="label hidden sm:block">Scroll →</p>
        </div>
        <PinnedGallery items={roles} />
      </section>

      <section className="container-x border-t border-line py-28 sm:py-40">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="label mb-4">Independent work</p>
            <h2 className="text-d3">Selected builds</h2>
          </div>
          <p className="label hidden sm:block">{String(projects.length).padStart(2, "0")} projects</p>
        </div>
        <ul className="border-t border-line">
          {projects.map((project, index) => (
            <li key={project.slug} className="border-b border-line">
              <Parallax distance={index % 2 === 0 ? 14 : -14}>
                <Reveal index={index}>
                  <Link
                    href={`/work/${project.slug}`}
                    data-cursor="open"
                    className="group flex items-center justify-between gap-6 py-6 sm:py-8"
                  >
                    <span>
                      <span className="block font-display text-3xl tracking-tight transition-transform duration-500 ease-expo group-hover:translate-x-2 sm:text-5xl">
                        {project.name}
                      </span>
                      <span className="mt-2 block max-w-xl text-sm text-muted sm:text-base">{project.tagline}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-6">
                      <span className="label hidden md:block">{project.category}</span>
                      <ArrowUpRight className="h-6 w-6 text-muted transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
                    </span>
                  </Link>
                </Reveal>
              </Parallax>
            </li>
          ))}
        </ul>
      </section>

      <section className="electric-cta mt-12 py-28 sm:py-40">
        <div className="container-x">
          <MaskText as="h2" className="max-w-[13ch] text-d2">
            Need a system built end to end?
          </MaskText>
          <Reveal index={1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bg/70">
              Bring me the product, platform, developer tool, or connected system that needs to work beyond the screen.
            </p>
            <MagneticButton className="mt-12">
              <Link
                href="/contact"
                data-cursor="say hi"
                className="group inline-flex items-center gap-3 rounded-full bg-bg px-8 py-4 text-lg text-fg transition-colors hover:bg-surface"
              >
                Get in touch
                <ArrowRight className="h-5 w-5 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
