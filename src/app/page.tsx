import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/ui/Hero";
import { PinnedGallery } from "@/components/motion/PinnedGallery";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Parallax } from "@/components/motion/Parallax";
import { roles, projects } from "@/content/work";

export default function HomePage() {
  return (
    <>
      <Hero />


      {/* everything I've built — scrubbed band */}
      <section>
        <div className="container-x mb-8 flex items-end justify-between">
          <p className="label">Built for</p>
          <p className="label hidden sm:block">Scroll →</p>
        </div>
        <PinnedGallery items={roles} />
      </section>

      {/* selected personal work — text-led so experience remains the gallery */}
      <section className="container-x border-t border-line py-28 sm:py-40">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-d3">Selected projects</h2>
          <p className="label">{String(projects.length).padStart(2, "0")} personal builds</p>
        </div>
        <ul className="border-t border-line">
          {projects.map((project, i) => (
            <li key={project.slug} className="border-b border-line">
              <Parallax distance={i % 2 === 0 ? 14 : -14}>
                <Reveal index={i}>
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

      {/* cta */}
      <section className="electric-cta mt-12 py-28 sm:py-40">
        <div className="container-x">
          <MaskText as="h2" className="text-d2">Let&apos;s work</MaskText>
          <MaskText as="h2" delay={0.06} className="text-d2 text-muted">together.</MaskText>
          <Reveal index={1}>
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
