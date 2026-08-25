"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";

interface MaskTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

/** Clip-mask reveal: content rises out from a hidden overflow box when scrolled into view. */
export function MaskText({ children, className, delay = 0, as = "div" }: MaskTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const Comp = motion[as];
  return (
    <span ref={ref} className="block overflow-hidden">
      <Comp
        className={cn("will-change-transform", className)}
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </Comp>
    </span>
  );
}
