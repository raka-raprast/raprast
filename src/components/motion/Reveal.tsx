"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "span" | "li" | "section";
}

/** Fades + rises into view once when scrolled to. */
export function Reveal({ children, className, index = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const Comp = motion[as] as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      {children}
    </Comp>
  );
}
