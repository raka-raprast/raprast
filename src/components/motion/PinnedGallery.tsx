"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WorkItem } from "@/content/work";

interface PinnedGalleryProps {
  items: WorkItem[];
}

/**
 * Section that pins while the inner track scrubs horizontally with scroll —
 * branded color slabs that reveal the work surface on hover. Falls back to a
 * normal horizontal scroll strip on touch / reduced motion.
 */
export function PinnedGallery({ items }: PinnedGalleryProps) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current!,
            start: "top 18%",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        el.querySelectorAll<HTMLElement>(".gallery-item").forEach((card, index) => {
          const lift = index % 2 === 0 ? -18 : 18;
          gsap.fromTo(
            card,
            { y: lift, rotate: lift / 18 },
            {
              y: -lift,
              rotate: -lift / 18,
              ease: "none",
              scrollTrigger: {
                trigger: section.current!,
                start: "top 18%",
                end: () => `+=${distance()}`,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden py-6">
      <div
        ref={track}
        className="flex w-max gap-4 px-6 max-md:w-full max-md:overflow-x-auto max-md:px-6 sm:gap-6 lg:px-16"
      >
        {items.map((item, i) => (
          <figure
            key={item.slug}
            className="gallery-item grade-hover relative shrink-0 will-change-transform"
            style={{ "--work-accent": item.accent } as CSSProperties}
          >
            <div className="relative h-[62vh] w-[78vw] overflow-hidden rounded-lg border border-line sm:w-[46vw] lg:w-[32vw]">
              <Image
                src={item.poster}
                alt={item.company ?? item.name}
                fill
                sizes="(max-width: 768px) 78vw, 32vw"
                className="grade object-cover"
              />
              <div aria-hidden className="gallery-overlay absolute inset-0 z-10 grid place-items-center px-6">
                <span className="gallery-wordmark text-center">{item.company ?? item.name}</span>
              </div>
            </div>
            <figcaption className="mt-3 flex items-center justify-between">
              <span className="font-display text-lg">{item.company ?? item.name}</span>
              <span className="label">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
