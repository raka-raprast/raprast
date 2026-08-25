"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Fixed vertical hairline that traces overall scroll progress — a quiet
 * "you are here" line down the left edge. Hidden on small screens and under
 * reduced motion.
 */
export function ScrollLine() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const markerY = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);
  const pct = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}`);

  if (!mounted || reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed left-6 top-0 z-40 hidden h-screen w-px lg:block">
      <div className="absolute inset-0 bg-line" />
      <motion.div className="absolute inset-x-0 top-0 origin-top bg-fg" style={{ height: "100%", scaleY }} />
      <motion.div className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-fg" style={{ top: markerY }} />
      <motion.span
        className="absolute left-3 font-mono text-[10px] tracking-widest text-faint"
        style={{ top: markerY }}
      >
        {pct}
      </motion.span>
    </div>
  );
}
