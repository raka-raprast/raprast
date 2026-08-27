"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

interface ScrollRevealTextProps {
  /** Small overline above the heading. */
  eyebrow?: string;
  /** The heading text whose words light up as it is scrolled through. */
  text: string;
  /** Extra classes for the heading element. */
  headingClassName?: string;
  /** Supporting content rendered under the heading (e.g. a paragraph). */
  children?: React.ReactNode;
}

const DIM = 0.22;

/**
 * Pins the heading to the viewport while the reader scrolls, lighting its words
 * one after another — a "read-along" reveal driven by GSAP ScrollTrigger (which
 * shares Lenis's scroll), so progress stays monotonic and cumulative. Static
 * and fully lit under reduced motion.
 */
export function ScrollRevealText({ eyebrow, text, headingClassName, children }: ScrollRevealTextProps) {
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = heading.current!.querySelectorAll<HTMLElement>(".reveal-word");
        gsap.set(targets, { opacity: DIM });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current!,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 1.4)}`,
            scrub: 0.4,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });
        targets.forEach((word, i) => {
          tl.to(word, { opacity: 1, ease: "none", duration: 1 }, i * 0.7);
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="container-x flex min-h-svh flex-col justify-center border-t border-line py-28 sm:py-40"
    >
      {eyebrow && <p className="label mb-8">{eyebrow}</p>}
      <h2 ref={heading} className={cn("max-w-[16ch] text-d2", headingClassName)}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="reveal-word">
            {word}{" "}
          </span>
        ))}
      </h2>
      {children && <div className="mt-10">{children}</div>}
    </section>
  );
}
