"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** A fixed guide path with one locator that advances monotonically with document scroll. */
export function ScrollGuide() {
  const path = useRef<SVGPathElement>(null);
  const locator = useRef<SVGCircleElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    let frame = 0;
    const draw = () => {
      frame = 0;
      const line = path.current;
      const marker = locator.current;
      if (!line || !marker) return;

      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / scrollable;
      const point = line.getPointAtLength(line.getTotalLength() * (0.06 + progress * 0.88));
      marker.setAttribute("cx", String(point.x));
      marker.setAttribute("cy", String(point.y));
    };
    const requestDraw = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("scroll", requestDraw, { passive: true });
    window.addEventListener("resize", requestDraw);
    return () => {
      window.removeEventListener("scroll", requestDraw);
      window.removeEventListener("resize", requestDraw);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div aria-hidden className="scroll-guide pointer-events-none fixed inset-0 z-0 hidden overflow-hidden lg:block">
      <svg className="scroll-guide__svg" viewBox="0 0 720 1200" preserveAspectRatio="none">
        <path
          ref={path}
          d="M 620 -80 C 455 170 592 300 470 520 S 320 850 490 1080 S 600 1250 520 1320"
          className="scroll-guide__line"
        />
        <circle ref={locator} r="4" className="scroll-guide__locator" />
      </svg>
    </div>
  );
}
