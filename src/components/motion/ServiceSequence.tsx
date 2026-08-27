"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WorkItem } from "@/content/work";

type Service = {
  title: string;
  description: string;
  work: readonly WorkItem[];
};

interface ServiceSequenceProps {
  services: readonly Service[];
}

function ServiceProof({ service }: { service: Service }) {
  return (
    <>
      <p className="max-w-xl text-xl leading-relaxed text-muted sm:text-2xl">{service.description}</p>
      <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-4" aria-label={`${service.title} proof`}>
        {service.work.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/work/${item.slug}`}
              data-cursor="open"
              className="group inline-flex items-center gap-2 font-display text-xl tracking-tight text-fg sm:text-2xl"
            >
              {item.name}
              <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ServiceSequence({ services }: ServiceSequenceProps) {
  const section = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".service-sequence__item");
        gsap.set(items, { autoAlpha: 0, y: 36 });
        gsap.set(items[0], { autoAlpha: 1, y: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section.current!,
            start: "top top",
            end: `+=${items.length * 100}%`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) gsap.set(progress.current, { scaleX: self.progress });
            },
          },
        });

        items.forEach((item, index) => {
          if (index > 0) {
            timeline.to(item, { autoAlpha: 1, duration: 0.35, ease: "power2.out", y: 0 });
          }
          timeline.to(item, { duration: index === 0 ? 0.95 : 0.6 });
          if (index < items.length - 1) {
            timeline.to(item, { autoAlpha: 0, duration: 0.3, ease: "power2.in", y: -36 });
          }
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={section} className="relative hidden min-h-svh border-t border-line md:block">
        <div className="container-x flex min-h-svh flex-col py-12">
          <div>
            <p className="label">Services</p>
            <h2 className="mt-4 text-d3">I help teams build systems like:</h2>
          </div>
          <div className="relative flex flex-1 items-center">
            {services.map((service, index) => (
              <article key={service.title} className="service-sequence__item absolute inset-x-0 max-w-4xl">
                <p className="label mb-7">0{index + 1} / 0{services.length}</p>
                <h2 className="max-w-[14ch] text-d2">{service.title}</h2>
                <div className="mt-10 border-t border-line pt-7">
                  <ServiceProof service={service} />
                </div>
              </article>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <span className="label flex shrink-0 items-center gap-2 text-faint">
              Keep scrolling
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </span>
            <div className="relative h-px flex-1 overflow-hidden bg-line" aria-hidden>
              <div ref={progress} className="absolute inset-0 origin-left scale-x-0 bg-fg" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-28 md:hidden">
        <div className="container-x">
          <p className="label">Services</p>
          <h2 className="mt-4 text-d3">I help teams build systems like:</h2>
          <div className="mt-14 border-t border-line">
            {services.map((service, index) => (
              <article key={service.title} className="border-b border-line py-10">
                <p className="label mb-5">0{index + 1} / 0{services.length}</p>
                <h3 className="max-w-[14ch] text-d2">{service.title}</h3>
                <div className="mt-10 border-t border-line pt-7">
                  <ServiceProof service={service} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
