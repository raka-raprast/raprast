"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** vertical travel in px across the viewport pass; negative moves up */
  distance?: number;
}

/** Translates its content on scroll for layered depth. Disabled under reduced motion. */
export function Parallax({ children, className, distance = 80 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
