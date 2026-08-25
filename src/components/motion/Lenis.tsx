"use client";

import { useEffect } from "react";
import LenisCore from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

/**
 * Smooth-scroll driver. Bridges Lenis into GSAP ScrollTrigger so scroll-driven
 * animations and smooth scrolling share one RAF loop. No-op under reduced motion.
 */
export function Lenis() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new LenisCore({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    document.documentElement.classList.add("lenis");

    lenis.on("scroll", ScrollTrigger.update);
    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, [reduce]);

  return null;
}
